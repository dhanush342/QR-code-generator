import * as React from 'react';
import { QRCodeType } from '../../types';

interface ContentFormProps {
  type: QRCodeType;
  formData: {
    // For 'url' and default
    title?: string;
    content?: string;
    // For 'wifi'
    ssid?: string;
    wifiPassword?: string;
    encryption?: string;
    // For 'vcard'
    firstName?: string;
    lastName?: string;
    email?: string;
    phone?: string;
    // For 'payment'
    paymentType?: string;
    paymentAddress?: string;
    amount?: string;
  };
  onChange: (data: Record<string, unknown>) => void;
}

export function ContentForm({ type, formData, onChange }: ContentFormProps) {
  const updateField = React.useCallback(
    (field: string, value: string) => {
      onChange({ ...formData, [field]: value });
    },
    [formData, onChange]
  );

  const renderFields = () => {
    switch (type) {
      case 'url':
        return (
          <>
            <input
              type="text"
              placeholder="QR Code Title"
              value={formData.title}
              onChange={(e) => updateField('title', e.target.value)}
              className="w-full bg-gray-800/50 border border-gray-600/50 rounded-lg px-4 py-3 text-white placeholder-gray-400 focus:border-cyan-500/50 focus:ring-1 focus:ring-cyan-500/20 transition-all"
            />
            <input
              type="url"
              placeholder="https://example.com"
              value={formData.content}
              onChange={(e) => updateField('content', e.target.value)}
              className="w-full bg-gray-800/50 border border-gray-600/50 rounded-lg px-4 py-3 text-white placeholder-gray-400 focus:border-cyan-500/50 focus:ring-1 focus:ring-cyan-500/20 transition-all"
              required
            />
          </>
        );
      case 'wifi':
        return (
          <>
            <input
              type="text"
              placeholder="Network Name (SSID)"
              value={formData.ssid || ''}
              onChange={(e) => updateField('ssid', e.target.value)}
              className="w-full bg-gray-800/50 border border-gray-600/50 rounded-lg px-4 py-3 text-white placeholder-gray-400 focus:border-cyan-500/50 focus:ring-1 focus:ring-cyan-500/20 transition-all"
            />
            <input
              type="password"
              placeholder="Password"
              value={formData.wifiPassword || ''}
              onChange={(e) => updateField('wifiPassword', e.target.value)}
              className="w-full bg-gray-800/50 border border-gray-600/50 rounded-lg px-4 py-3 text-white placeholder-gray-400 focus:border-cyan-500/50 focus:ring-1 focus:ring-cyan-500/20 transition-all"
            />
            <select
              value={formData.encryption || 'WPA'}
              onChange={(e) => updateField('encryption', e.target.value)}
              className="w-full bg-gray-800/50 border border-gray-600/50 rounded-lg px-4 py-3 text-white focus:border-cyan-500/50 focus:ring-1 focus:ring-cyan-500/20 transition-all"
            >
              <option value="WPA">WPA/WPA2</option>
              <option value="WEP">WEP</option>
              <option value="nopass">Open Network</option>
            </select>
          </>
        );
      case 'vcard':
        return (
          <>
            <div className="grid grid-cols-2 gap-4">
              <input
                type="text"
                placeholder="First Name"
                value={formData.firstName || ''}
                onChange={(e) => updateField('firstName', e.target.value)}
                className="bg-gray-800/50 border border-gray-600/50 rounded-lg px-4 py-3 text-white placeholder-gray-400 focus:border-cyan-500/50 focus:ring-1 focus:ring-cyan-500/20 transition-all"
              />
              <input
                type="text"
                placeholder="Last Name"
                value={formData.lastName || ''}
                onChange={(e) => updateField('lastName', e.target.value)}
                className="bg-gray-800/50 border border-gray-600/50 rounded-lg px-4 py-3 text-white placeholder-gray-400 focus:border-cyan-500/50 focus:ring-1 focus:ring-cyan-500/20 transition-all"
              />
            </div>
            <input
              type="email"
              placeholder="Email"
              value={formData.email || ''}
              onChange={(e) => updateField('email', e.target.value)}
              className="w-full bg-gray-800/50 border border-gray-600/50 rounded-lg px-4 py-3 text-white placeholder-gray-400 focus:border-cyan-500/50 focus:ring-1 focus:ring-cyan-500/20 transition-all"
            />
            <input
              type="tel"
              placeholder="Phone Number"
              value={formData.phone || ''}
              onChange={(e) => updateField('phone', e.target.value)}
              className="w-full bg-gray-800/50 border border-gray-600/50 rounded-lg px-4 py-3 text-white placeholder-gray-400 focus:border-cyan-500/50 focus:ring-1 focus:ring-cyan-500/20 transition-all"
            />
          </>
        );
      case 'payment':
        return (
          <>
            <select
              value={formData.paymentType || 'bitcoin'}
              onChange={(e) => updateField('paymentType', e.target.value)}
              className="w-full bg-gray-800/50 border border-gray-600/50 rounded-lg px-4 py-3 text-white focus:border-cyan-500/50 focus:ring-1 focus:ring-cyan-500/20 transition-all"
            >
              <option value="bitcoin">Bitcoin</option>
              <option value="ethereum">Ethereum</option>
              <option value="paypal">PayPal</option>
              <option value="venmo">Venmo</option>
            </select>
            <input
              type="text"
              placeholder="Wallet Address / Account"
              value={formData.paymentAddress || ''}
              onChange={(e) => updateField('paymentAddress', e.target.value)}
              className="w-full bg-gray-800/50 border border-gray-600/50 rounded-lg px-4 py-3 text-white placeholder-gray-400 focus:border-cyan-500/50 focus:ring-1 focus:ring-cyan-500/20 transition-all"
            />
            <input
              type="number"
              step="0.01"
              placeholder="Amount (optional)"
              value={formData.amount || ''}
              onChange={(e) => updateField('amount', e.target.value)}
              className="w-full bg-gray-800/50 border border-gray-600/50 rounded-lg px-4 py-3 text-white placeholder-gray-400 focus:border-cyan-500/50 focus:ring-1 focus:ring-cyan-500/20 transition-all"
            />
          </>
        );
      default:
        return (
          <>
            <input
              type="text"
              placeholder="QR Code Title"
              value={formData.title}
              onChange={(e) => updateField('title', e.target.value)}
              className="w-full bg-gray-800/50 border border-gray-600/50 rounded-lg px-4 py-3 text-white placeholder-gray-400 focus:border-cyan-500/50 focus:ring-1 focus:ring-cyan-500/20 transition-all"
            />
            <textarea
              placeholder="Enter your content here..."
              value={formData.content}
              onChange={(e) => updateField('content', e.target.value)}
              className="w-full bg-gray-800/50 border border-gray-600/50 rounded-lg px-4 py-3 text-white placeholder-gray-400 focus:border-cyan-500/50 focus:ring-1 focus:ring-cyan-500/20 transition-all h-32 resize-none"
              required
            />
          </>
        );
    }
  };

  // Generate content string based on type
  React.useEffect(() => {
    let content = '';
    switch (type) {
      case 'wifi':
        if (formData.ssid) {
          content = `WIFI:T:${formData.encryption || 'WPA'};S:${formData.ssid};P:${formData.wifiPassword || ''};H:false;;`;
        }
        break;
      case 'vcard':
        if (formData.firstName || formData.lastName) {
          content = `BEGIN:VCARD\nVERSION:3.0\nFN:${formData.firstName || ''} ${formData.lastName || ''}\nEMAIL:${formData.email || ''}\nTEL:${formData.phone || ''}\nEND:VCARD`;
        }
        break;
      case 'payment':
        if (formData.paymentAddress) {
          content = `${formData.paymentType}:${formData.paymentAddress}${formData.amount ? `?amount=${formData.amount}` : ''}`;
        }
        break;
    }
    if (content && content !== formData.content) {
      updateField('content', content);
    }
  }, [type, formData.ssid, formData.wifiPassword, formData.encryption, formData.firstName, formData.lastName, formData.email, formData.phone, formData.paymentType, formData.paymentAddress, formData.amount, formData.content, updateField]);

  return (
    <div className="bg-gray-900/50 backdrop-blur-sm border border-gray-700/50 rounded-xl p-6">
      <h3 className="text-lg font-semibold text-white mb-4">Content</h3>
      <div className="space-y-4">
        {renderFields()}
      </div>
    </div>
  );
}