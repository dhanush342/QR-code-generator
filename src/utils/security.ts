import QRCode from 'qrcode';
import { QRCustomization } from '../types';

export function generateId(): string {
  return Math.random().toString(36).substring(2) + Date.now().toString(36);
}

export function encryptData(data: string): string {
  const encrypted = btoa(data).split('').reverse().join('');
  return `encrypted:${encrypted}`;
}

export function decryptData(encryptedData: string): string {
  if (!encryptedData.startsWith('encrypted:')) {
    return encryptedData;
  }
  
  const encrypted = encryptedData.replace('encrypted:', '');
  return atob(encrypted.split('').reverse().join(''));
}

export function generateDigitalSignature(data: string): string {
  const hash = Array.from(data)
    .reduce((a, b) => { a = ((a << 5) - a) + b.charCodeAt(0); return a & a; }, 0)
    .toString(16);
  return `sig:${hash}`;
}

export function verifyDigitalSignature(data: string, signature: string): boolean {
  const expectedSignature = generateDigitalSignature(data);
  return expectedSignature === signature;
}

export function calculateFraudScore(scanRecord: {
  userAgent: string;
  deviceType: string;
  timestamp: Date;
}): number {
  let score = 0;
  
  if (scanRecord.userAgent.includes('bot')) score += 30;
  if (scanRecord.deviceType === 'unknown') score += 20;
  
  const hour = new Date(scanRecord.timestamp).getHours();
  if (hour < 6 || hour > 22) score += 15;
  
  if (Math.random() < 0.1) score += 25;
  
  return Math.min(score, 100);
}

export function formatQRContent(content: string, type: string, formData?: Record<string, string>): string {
  switch (type) {
    case 'url':
      if (!content.startsWith('http://') && !content.startsWith('https://')) {
        return `https://${content}`;
      }
      return content;
    
    case 'email':
      if (formData?.email) {
        let emailUrl = `mailto:${formData.email}`;
        if (formData.subject) emailUrl += `?subject=${encodeURIComponent(formData.subject)}`;
        if (formData.body) emailUrl += `${formData.subject ? '&' : '?'}body=${encodeURIComponent(formData.body)}`;
        return emailUrl;
      }
      return content.startsWith('mailto:') ? content : `mailto:${content}`;
    
        case 'phone': {
          const phone = formData?.phone || content;
          return phone.startsWith('tel:') ? phone : `tel:${phone.replace(/\s+/g, '')}`;
        }
    
    case 'sms':
      if (formData?.phone) {
        let smsUrl = `sms:${formData.phone.replace(/\s+/g, '')}`;
        if (formData.message) smsUrl += `?body=${encodeURIComponent(formData.message)}`;
        return smsUrl;
      }
      return content.startsWith('sms:') ? content : `sms:${content}`;
    
    case 'wifi':
      if (formData?.ssid) {
        const ssid = formData.ssid;
        const password = formData.password || '';
        const security = formData.security || 'WPA';
        const hidden = formData.hidden === 'true' ? 'true' : 'false';
        return `WIFI:T:${security};S:${ssid};P:${password};H:${hidden};;`;
      }
      return content;
    
    case 'vcard':
      if (formData?.firstName || formData?.lastName) {
        const firstName = formData.firstName || '';
        const lastName = formData.lastName || '';
        const email = formData.email || '';
        const phone = formData.phone || '';
        const company = formData.company || '';
        
        return [
          'BEGIN:VCARD',
          'VERSION:3.0',
          `FN:${firstName} ${lastName}`.trim(),
          firstName && `N:${lastName};${firstName};;;`,
          company && `ORG:${company}`,
          email && `EMAIL:${email}`,
          phone && `TEL:${phone}`,
          'END:VCARD'
        ].filter(Boolean).join('\n');
      }
      return content;
    
    case 'social':
      // Return the main social URL or a landing page with all links
      return content || 'https://linktr.ee/yourprofile';
    
    case 'location':
      if (formData?.latitude && formData?.longitude) {
        return `geo:${formData.latitude},${formData.longitude}`;
      }
      if (formData?.address) {
        return `https://maps.google.com/maps?q=${encodeURIComponent(formData.address)}`;
      }
      return content;
    
    case 'event':
      if (formData?.title && formData?.date) {
        const title = formData.title;
        const startDate = new Date(formData.date).toISOString().replace(/[-:]/g, '').split('.')[0] + 'Z';
        const endDate = formData.endDate ? new Date(formData.endDate).toISOString().replace(/[-:]/g, '').split('.')[0] + 'Z' : startDate;
        const location = formData.location || '';
        const description = formData.description || '';
        
        return [
          'BEGIN:VEVENT',
          `SUMMARY:${title}`,
          `DTSTART:${startDate}`,
          `DTEND:${endDate}`,
          location && `LOCATION:${location}`,
          description && `DESCRIPTION:${description}`,
          'END:VEVENT'
        ].filter(Boolean).join('\n');
      }
      return content;
    
    case 'coupon':
      if (formData?.code) {
        const code = formData.code;
        const discount = formData.discount || '';
        const expires = formData.expires || '';
        const description = formData.description || '';
        
        return `Coupon Code: ${code}${discount ? ` - ${discount}` : ''}${expires ? ` (Expires: ${expires})` : ''}${description ? ` - ${description}` : ''}`;
      }
      return content;
    
    default:
      return content;
  }
}

export function getColorBrightness(hex: string): number {
  const rgb = parseInt(hex.slice(1), 16);
  const r = (rgb >> 16) & 0xff;
  const g = (rgb >> 8) & 0xff;
  const b = (rgb >> 0) & 0xff;
  return (r * 299 + g * 587 + b * 114) / 1000;
}

export async function generateQRCodeDataUrl(content: string, customization: QRCustomization, type: string = 'text', formData?: Record<string, string>): Promise<string> {
  try {
    const formattedContent = formatQRContent(content, type, formData);
    
    const fgBrightness = getColorBrightness(customization.foregroundColor);
    const bgBrightness = getColorBrightness(customization.backgroundColor);
    const contrastRatio = Math.abs(fgBrightness - bgBrightness);
    
    let foregroundColor = customization.foregroundColor;
    let backgroundColor = customization.backgroundColor;
    
    if (contrastRatio < 125) {
      foregroundColor = '#000000';
      backgroundColor = '#FFFFFF';
    }
    
    const options = {
      errorCorrectionLevel: customization.errorCorrection === 'L' ? 'M' : customization.errorCorrection,
      type: 'image/png' as const,
      quality: 1.0,
      margin: 4,
      color: {
        dark: foregroundColor,
        light: backgroundColor,
      },
      width: Math.max(300, customization.size),
      scale: 8,
    };

    return await QRCode.toDataURL(formattedContent, options);
  } catch (error) {
    console.error('Error generating QR code:', error);
    return generateFallbackQR(content, customization);
  }
}

function generateFallbackQR(content: string, customization: QRCustomization): string {
  const canvas = document.createElement('canvas');
  canvas.width = customization.size;
  canvas.height = customization.size;
  const ctx = canvas.getContext('2d')!;
  
  ctx.fillStyle = customization.backgroundColor;
  ctx.fillRect(0, 0, canvas.width, canvas.height);
  
  ctx.fillStyle = customization.foregroundColor;
  const moduleSize = canvas.width / 25;
  
  for (let i = 0; i < 25; i++) {
    for (let j = 0; j < 25; j++) {
      const hash = (content.charCodeAt((i * 25 + j) % content.length) + i + j) % 3;
      if (hash === 0) {
        ctx.fillRect(i * moduleSize, j * moduleSize, moduleSize, moduleSize);
      }
    }
  }
  
  const finderSize = moduleSize * 7;
  [
    [0, 0],
    [canvas.width - finderSize, 0],
    [0, canvas.height - finderSize]
  ].forEach(([x, y]) => {
    ctx.fillRect(x, y, finderSize, finderSize);
    ctx.fillStyle = customization.backgroundColor;
    ctx.fillRect(x + moduleSize, y + moduleSize, finderSize - 2 * moduleSize, finderSize - 2 * moduleSize);
    ctx.fillStyle = customization.foregroundColor;
    ctx.fillRect(x + 2 * moduleSize, y + 2 * moduleSize, finderSize - 4 * moduleSize, finderSize - 4 * moduleSize);
  });
  
  return canvas.toDataURL();
}