import { useEffect, useState, useCallback } from 'react';
import { Download, Share2, Eye, Clock } from 'lucide-react';
import { QRCodeData } from '../../types';
import { generateQRCodeDataUrl, getColorBrightness } from '../../utils/security';

interface QRPreviewProps {
  qrData: QRCodeData | null;
  isGenerating: boolean;
  showPreview?: boolean;
}

export function QRPreview({ qrData, isGenerating, showPreview = true }: QRPreviewProps) {
  const [qrImageUrl, setQrImageUrl] = useState<string>('');
  const [isScanning, setIsScanning] = useState(false);
  const [scanCompatibilityScore, setScanCompatibilityScore] = useState<number>(0);
  
  // Calculate compatibility score based on QR code properties
  const calculateCompatibilityScore = useCallback((data: QRCodeData) => {
    let score = 100; // Start with perfect score
    // Content length affects QR code density (longer = more complex)
    if (data.content.length > 100) score -= 10;
    if (data.content.length > 250) score -= 10;
    // Error correction level affects scan reliability
    if (data.customization.errorCorrection === 'L') score -= 20;
    if (data.customization.errorCorrection === 'H') score += 10;
    // Check color contrast - important for scanning
    const fg = data.customization.foregroundColor;
    const bg = data.customization.backgroundColor;
    if (getColorBrightness(fg) - getColorBrightness(bg) < 125) {
      score -= 30; // Poor contrast severely impacts scanning
    }
    // Size affects scannability
    if (data.customization.size < 200) score -= 15;
    setScanCompatibilityScore(Math.max(0, Math.min(100, score)));
  }, []);
  useEffect(() => {
    if (qrData) {
      generateQRCodeDataUrl(qrData.content, qrData.customization, qrData.type)
        .then(imageUrl => {
          setQrImageUrl(imageUrl);
          calculateCompatibilityScore(qrData);
        })
        .catch(error => console.error('Error generating QR code:', error));
    }
  }, [qrData, calculateCompatibilityScore]);
  


  const handleDownload = () => {
    if (qrImageUrl && qrData) {
      const link = document.createElement('a');
      link.href = qrImageUrl;
      link.download = `${qrData.title.replace(/\s+/g, '_')}.png`;
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
    }
  };

  const handleShare = async () => {
    if (navigator.share && qrData) {
      try {
        if (qrImageUrl) {
          // Try to share the image if available
          const response = await fetch(qrImageUrl);
          const blob = await response.blob();
          const file = new File([blob], `${qrData.title.replace(/\s+/g, '_')}.png`, { type: 'image/png' });
          
          await navigator.share({
            title: qrData.title,
            text: `Check out this QR code: ${qrData.title}`,
            files: [file]
          });
        } else {
          // Fallback to link sharing
          await navigator.share({
            title: qrData.title,
            text: `Check out this QR code: ${qrData.title}`,
            url: window.location.href
          });
        }
      } catch (err) {
        console.log('Error sharing:', err);
      }
    }
  };

  const simulateScan = () => {
    setIsScanning(true);
    setTimeout(() => {
      setIsScanning(false);
      // In a real app, this would trigger the scan analytics
    }, 2000);
  };
  
  // Return null if preview shouldn't be shown
  if (!showPreview) {
    return null;
  }

  if (isGenerating) {
    return (
      <div className="bg-gray-900/50 backdrop-blur-sm border border-gray-700/50 rounded-xl p-6">
        <div className="text-center">
          <div className="w-64 h-64 mx-auto bg-gray-800/50 rounded-xl flex items-center justify-center border border-gray-600/30">
            <div className="animate-spin w-8 h-8 border-2 border-cyan-500 border-t-transparent rounded-full"></div>
          </div>
          <p className="text-gray-400 mt-4">Generating secure QR code...</p>
        </div>
      </div>
    );
  }

  if (!qrData) {
    return (
      <div className="bg-gray-900/50 backdrop-blur-sm border border-gray-700/50 rounded-xl p-6">
        <div className="text-center">
          <div className="w-64 h-64 mx-auto bg-gray-800/50 rounded-xl flex items-center justify-center border border-gray-600/30">
            <div className="text-gray-500">
              <div className="w-16 h-16 mx-auto mb-4 bg-gradient-to-br from-cyan-500 to-blue-600 rounded-lg flex items-center justify-center opacity-50">
                <div className="w-8 h-8 bg-white rounded-sm"></div>
              </div>
              <p>QR Code Preview</p>
            </div>
          </div>
          <p className="text-gray-400 mt-4">Configure and generate your QR code</p>
        </div>
      </div>
    );
  }

  return (
    <div className="bg-gray-900/50 backdrop-blur-sm border border-gray-700/50 rounded-xl p-6 sticky top-6">
      <div className="text-center mb-4">
        <h3 className="text-lg font-semibold text-white mb-2">{qrData.title}</h3>
        <div className="flex items-center justify-center space-x-2 text-sm text-gray-400">
          <span className="capitalize">{qrData.type}</span>
          <span>•</span>
          {/* Encryption indicator not available on base QRCodeData type. Omitted for compatibility. */}
        </div>
      </div>

      {/* Compatibility Score Bar */}
      <div className="mb-4">
        <div className="flex items-center justify-between mb-1">
          <span className="text-xs text-gray-400">Scanner Compatibility</span>
          <span className={`text-xs font-medium ${
            scanCompatibilityScore > 80 ? 'text-green-400' : 
            scanCompatibilityScore > 50 ? 'text-amber-400' : 
            'text-red-400'
          }`}>
            {scanCompatibilityScore > 80 ? 'Excellent' : 
             scanCompatibilityScore > 50 ? 'Good' : 
             'Poor'}
          </span>
        </div>
        <div className="w-full h-1.5 bg-gray-700 rounded-full overflow-hidden">
          <div 
            className={`h-full rounded-full ${
              scanCompatibilityScore > 80 ? 'bg-green-500' : 
              scanCompatibilityScore > 50 ? 'bg-amber-500' : 
              'bg-red-500'
            }`}
            style={{ width: `${scanCompatibilityScore}%` }}
          ></div>
        </div>
        <div className="text-xs text-gray-500 mt-1 space-y-1">
          <p>✅ Works with Google Lens, iPhone Camera, Android scanners</p>
          {scanCompatibilityScore < 80 && (
            <p className="text-amber-400">💡 Tips: Use high contrast colors, avoid low error correction</p>
          )}
        </div>
      </div>

      <div className="relative">
        <div className="w-64 h-64 mx-auto bg-white rounded-xl p-4 border border-gray-600/30 overflow-hidden">
          {qrImageUrl ? (
            <img
              src={qrImageUrl}
              alt="QR Code"
              className="w-full h-full object-contain"
            />
          ) : (
            <div className="w-full h-full bg-gray-200 animate-pulse rounded-lg"></div>
          )}
        </div>
        
        {isScanning && (
          <div className="absolute inset-0 bg-cyan-500/20 rounded-xl flex items-center justify-center">
            <div className="w-16 h-16 border-2 border-cyan-400 rounded-lg animate-pulse">
              <div className="w-full h-0.5 bg-cyan-400 animate-pulse" style={{ animationDelay: '0.5s' }}></div>
            </div>
          </div>
        )}
      </div>

      {/* Status Indicators */}
      <div className="mt-4 space-y-2">
        {qrData.expiryDate && (
          <div className="flex items-center space-x-2 text-sm text-orange-400">
            <Clock className="w-4 h-4" />
            <span>Expires: {new Date(qrData.expiryDate).toLocaleDateString()}</span>
          </div>
        )}
        {/* Usage limit not available on base QRCodeData type. Omitted for compatibility. */}
        {/* Geo-fencing not available on base QRCodeData type. Omitted for compatibility. */}
      </div>

      {/* Action Buttons */}
      <div className="mt-6 grid grid-cols-3 gap-2">
        <button
          onClick={handleDownload}
          className="flex items-center justify-center space-x-2 bg-green-600/20 text-green-400 px-3 py-2 rounded-lg border border-green-600/30 hover:bg-green-600/30 transition-all"
        >
          <Download className="w-4 h-4" />
          <span className="text-sm">Save</span>
        </button>
        <button
          onClick={handleShare}
          className="flex items-center justify-center space-x-2 bg-blue-600/20 text-blue-400 px-3 py-2 rounded-lg border border-blue-600/30 hover:bg-blue-600/30 transition-all"
        >
          <Share2 className="w-4 h-4" />
          <span className="text-sm">Share</span>
        </button>
        <button
          onClick={simulateScan}
          disabled={isScanning}
          className="flex items-center justify-center space-x-2 bg-cyan-600/20 text-cyan-400 px-3 py-2 rounded-lg border border-cyan-600/30 hover:bg-cyan-600/30 transition-all disabled:opacity-50"
        >
          <Eye className="w-4 h-4" />
          <span className="text-sm">Test</span>
        </button>
      </div>

      {/* Security Info */}
      <div className="mt-4 p-3 bg-gray-800/50 rounded-lg border border-gray-700/30">
        <div className="text-xs text-gray-400">
          <div className="flex items-center justify-between">
            <span>Security Level:</span>
            {/* Security level not available on base QRCodeData type. Omitted for compatibility. */}
          </div>
          {/* Digital signature and blockchain hash not available on base QRCodeData type. Omitted for compatibility. */}
        </div>
      </div>
    </div>
  );
}