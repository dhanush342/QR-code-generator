import { QRCodeData } from '../types';
import { useLocalStorage } from './useLocalStorage';
import { generateId, encryptData, generateDigitalSignature, generateQRCodeDataUrl } from '../utils/security';

type QRAnalytics = {
  totalScans: number;
  uniqueUsers: number;
  topLocations: Array<{ latitude: number; longitude: number; count: number }>;
  deviceBreakdown: Record<string, number>;
  fraudAttempts: number;
  averageEngagement: number;
  scanTrends: Array<Record<string, unknown>>;
};

export function useQRCodes() {
  const [qrCodes, setQRCodes] = useLocalStorage<QRCodeData[]>('qr-codes', []);
  const [analytics, setAnalytics] = useLocalStorage<QRAnalytics>('qr-analytics', {
    totalScans: 0,
    uniqueUsers: 0,
    topLocations: [],
    deviceBreakdown: {},
    fraudAttempts: 0,
    averageEngagement: 0,
    scanTrends: []
  });

  const createQRCode = async (data: Partial<QRCodeData>): Promise<QRCodeData> => {
    const newQRCode: QRCodeData = {
      id: generateId(),
      type: data.type || 'text',
      content: data.content || '',
      title: data.title || 'Untitled QR Code',
      encrypted: data.encrypted || false,
      hasPassword: data.hasPassword || false,
      biometricLock: data.biometricLock || false,
      isDynamic: data.isDynamic || false,
      expiryDate: data.expiryDate,
      usageLimit: data.usageLimit,
      currentUsage: 0,
      geoFencing: data.geoFencing,
      geoRadius: data.geoRadius,
      customization: data.customization || {
        size: 300, // Increased default size for better scanning
        errorCorrection: 'H', // Use high error correction for better reliability
        foregroundColor: '#000000',
        backgroundColor: '#FFFFFF',
        shape: 'square',
        pattern: 'standard',
        gradientEnabled: false,
        gradientColors: ['#00D9FF', '#FF6B6B'],
        logoSize: 40,
        cornerRadius: 8,
        dotStyle: 'square',
        eyeStyle: 'square',
        logoImage: '',
        logoMargin: 4,
        quietZone: 4,
        backgroundImage: ''
      },
      securityLevel: data.securityLevel || 'basic',
      digitalSignature: data.securityLevel !== 'basic' ? generateDigitalSignature(data.content || '') : undefined,
      blockchainHash: data.securityLevel === 'military' ? generateId() : undefined,
      createdAt: new Date(),
      status: 'active',
      scanHistory: []
    };

    if (newQRCode.encrypted && newQRCode.content) {
      newQRCode.content = encryptData(newQRCode.content);
    }

    // Generate the QR code image URL
    try {
      newQRCode.imageUrl = await generateQRCodeDataUrl(
        newQRCode.content,
        newQRCode.customization ?? {
          size: 300,
          errorCorrection: 'H',
          foregroundColor: '#000000',
          backgroundColor: '#FFFFFF',
          shape: 'square',
          pattern: 'standard',
          gradientEnabled: false,
          gradientColors: ['#00D9FF', '#FF6B6B'],
          gradientDirection: 'to right', // Added property
          logoSize: 40,
          cornerRadius: 8,
          dotStyle: 'square',
          eyeStyle: 'square',
          logoImage: '',
          logoMargin: 4,
          quietZone: 4,
          backgroundImage: '',
          frameEnabled: false, // Added property
          frameColor: '#FFFFFF', // Added property
          frameWidth: 0 // Added property
        },
        newQRCode.type
      );
    } catch (error) {
      console.error('Error generating QR code image:', error);
    }

    setQRCodes([...qrCodes, newQRCode]);
    return newQRCode;
  };

  const updateQRCode = (id: string, updates: Partial<QRCodeData>) => {
    const updatedQRCodes = qrCodes.map(qr =>
      qr.id === id ? { ...qr, ...updates } : qr
    );
    setQRCodes(updatedQRCodes);
  };

  const deleteQRCode = (id: string) => {
    const filteredQRCodes = qrCodes.filter(qr => qr.id !== id);
    setQRCodes(filteredQRCodes);
  };

  const revokeQRCode = (id: string) => {
    updateQRCode(id, { status: 'revoked' });
  };

  const simulateScan = (id: string) => {
    const qrCode = qrCodes.find(qr => qr.id === id);
    if (!qrCode) return;

    const scanRecord = {
      id: generateId(),
      timestamp: new Date(),
      location: { latitude: 37.7749, longitude: -122.4194 } as GeolocationCoordinates,
      deviceType: 'mobile',
      userAgent: navigator.userAgent,
      ipAddress: '192.168.1.1',
      suspicious: Math.random() < 0.05,
      fraudScore: Math.random() * 100
    };

    updateQRCode(id, {
      currentUsage: (qrCode.currentUsage ?? 0) + 1,
      lastScanned: new Date(),
      scanHistory: [...(qrCode.scanHistory ?? []), scanRecord]
    });

    setAnalytics({
      ...analytics,
      totalScans: analytics.totalScans + 1,
      fraudAttempts: scanRecord.suspicious ? analytics.fraudAttempts + 1 : analytics.fraudAttempts
    });
  };

  return {
    qrCodes,
    analytics,
    createQRCode,
    updateQRCode,
    deleteQRCode,
    revokeQRCode,
    simulateScan
  };
}