export interface QRCodeData {
  id: string;
  type: QRCodeType;
  content: string;
  title: string;
  description?: string;
  customization: QRCustomization;
  createdAt: Date;
  lastScanned?: Date;
  scanCount?: number;
  imageUrl?: string;
  isFavorite?: boolean;
  tags?: string[];
  expiryDate?: Date;
  isPublic?: boolean;
  encrypted?: boolean;
  hasPassword?: boolean;
  biometricLock?: boolean;
  isDynamic?: boolean;
  usageLimit?: number;
  currentUsage?: number;
  geoFencing?: boolean;
  geoRadius?: number;
  securityLevel?: string;
  digitalSignature?: string;
  blockchainHash?: string;
  status?: string;
  scanHistory?: ScanRecord[];
}

export interface ScanRecord {
  id: string;
  timestamp: Date;
  location?: GeolocationCoordinates;
  deviceType: string;
  userAgent: string;
  ipAddress: string;
  suspicious: boolean;
  fraudScore: number;
}

export interface QRCustomization {
  size: number;
  errorCorrection: 'L' | 'M' | 'Q' | 'H';
  foregroundColor: string;
  backgroundColor: string;
  logoUrl?: string;
  logoSize: number;
  cornerRadius: number;
  dotStyle: 'square' | 'rounded' | 'circular';
  eyeStyle: 'square' | 'rounded' | 'circular';
  gradientEnabled: boolean;
  gradientColors: [string, string];
  gradientDirection?: 'horizontal' | 'vertical' | 'diagonal' | 'to right' | string;
  frameEnabled?: boolean;
  frameColor?: string;
  frameWidth?: number;
  shape?: string;
  pattern?: string;
  logoImage?: string;
  logoMargin?: number;
  quietZone?: number;
  backgroundImage?: string;
}

export type QRCodeType = 
  | 'url' 
  | 'text' 
  | 'wifi' 
  | 'vcard' 
  | 'sms' 
  | 'email' 
  | 'phone'
  | 'social'
  | 'location'
  | 'event'
  | 'coupon';

export interface QRTemplate {
  id: string;
  name: string;
  description: string;
  type: QRCodeType;
  customization: QRCustomization;
  isBuiltIn: boolean;
  preview: string;
}

export interface QRStats {
  totalGenerated: number;
  totalScans: number;
  mostUsedType: QRCodeType;
  recentActivity: Array<{ date: string; action: string; }>;
}

export interface SocialPlatform {
  platform: 'facebook' | 'twitter' | 'instagram' | 'linkedin' | 'youtube' | 'tiktok' | 'whatsapp' | 'telegram';
  username: string;
  url: string;
}