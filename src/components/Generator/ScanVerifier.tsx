import { useState } from 'react';
import jsQR from 'jsqr';
import { AlertTriangle, Upload, Check, X } from 'lucide-react';

export function ScanVerifier() {
  const [result, setResult] = useState<string | null>(null);
  const [isScanning, setIsScanning] = useState(false);
  const [scanStatus, setScanStatus] = useState<'success' | 'error' | null>(null);
  
  const handleFile = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;
    
    setIsScanning(true);
    setScanStatus(null);
    setResult(null);
    
    try {
      const img = new Image();
      img.src = URL.createObjectURL(file);
      
      await new Promise((resolve) => {
        img.onload = resolve;
      });
      
      const canvas = document.createElement('canvas');
      canvas.width = img.width;
      canvas.height = img.height;
      const ctx = canvas.getContext('2d');
      if (!ctx) {
        throw new Error('Could not get canvas context');
      }
      
      ctx.drawImage(img, 0, 0);
      const imageData = ctx.getImageData(0, 0, canvas.width, canvas.height);
      const code = jsQR(imageData.data, canvas.width, canvas.height);
      
      if (code) {
        setResult(code.data);
        setScanStatus('success');
      } else {
        setResult('No QR code found in image. Try a clearer photo with good lighting.');
        setScanStatus('error');
      }
    } catch (error) {
      console.error('Error scanning QR code:', error);
      setResult('Error scanning QR code. Please try again with a different image.');
      setScanStatus('error');
    } finally {
      setIsScanning(false);
    }
  };

  return (
    <div className="bg-gray-900/50 backdrop-blur-sm border border-gray-700/50 rounded-xl p-6">
      <h3 className="text-lg font-semibold text-white mb-4 flex items-center">
        <AlertTriangle className="w-5 h-5 text-amber-400 mr-2" />
        Verify QR Code Scanability
      </h3>
      
      <p className="text-gray-400 mb-4 text-sm">
        Upload a photo of your QR code to check if it's scannable by devices. 
        This helps ensure your QR works with Google Lens, iPhone Camera, and other scanners.
      </p>
      
      <div className="mt-4">
        <label 
          className="flex flex-col items-center justify-center w-full h-32 bg-gray-800/50 border-2 border-dashed border-gray-600 rounded-lg cursor-pointer hover:bg-gray-800/70 transition-all"
        >
          <input 
            type="file" 
            accept="image/*" 
            onChange={handleFile} 
            className="hidden" 
            disabled={isScanning}
          />
          <div className="flex flex-col items-center justify-center">
            <Upload className="w-8 h-8 text-gray-400 mb-2" />
            <p className="text-sm text-gray-400">
              {isScanning ? 'Scanning...' : 'Click to upload a QR code photo'}
            </p>
          </div>
        </label>
      </div>
      
      {result && (
        <div className={`mt-4 p-3 rounded-lg ${
          scanStatus === 'success' 
            ? 'bg-green-900/20 border border-green-800/30' 
            : 'bg-red-900/20 border border-red-800/30'
        }`}>
          <div className="flex items-start">
            {scanStatus === 'success' ? (
              <Check className="w-5 h-5 text-green-400 mr-2 mt-0.5 flex-shrink-0" />
            ) : (
              <X className="w-5 h-5 text-red-400 mr-2 mt-0.5 flex-shrink-0" />
            )}
            <div>
              <p className={`text-sm font-medium ${
                scanStatus === 'success' ? 'text-green-400' : 'text-red-400'
              }`}>
                {scanStatus === 'success' ? 'QR Code Scanned Successfully!' : 'Scan Failed'}
              </p>
              <p className="text-gray-300 text-sm mt-1">{result}</p>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}