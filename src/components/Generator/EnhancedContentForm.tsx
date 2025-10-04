import React, { useState } from 'react';
import { QRCodeType } from '../../types';
import { Eye, EyeOff, Copy, Check, Globe } from 'lucide-react';

interface ContentFormProps {
  type: QRCodeType;
  formData: Record<string, string>;
  onChange: (data: Record<string, unknown>) => void;
}

const socialPlatforms = [
  { id: 'facebook', name: 'Facebook', baseUrl: 'https://facebook.com/', placeholder: 'username' },
  { id: 'instagram', name: 'Instagram', baseUrl: 'https://instagram.com/', placeholder: 'username' },
  { id: 'twitter', name: 'Twitter/X', baseUrl: 'https://twitter.com/', placeholder: 'username' },
  { id: 'linkedin', name: 'LinkedIn', baseUrl: 'https://linkedin.com/in/', placeholder: 'username' },
  { id: 'youtube', name: 'YouTube', baseUrl: 'https://youtube.com/@', placeholder: 'channel' },
  { id: 'tiktok', name: 'TikTok', baseUrl: 'https://tiktok.com/@', placeholder: 'username' },
  { id: 'whatsapp', name: 'WhatsApp', baseUrl: 'https://wa.me/', placeholder: '1234567890' },
  { id: 'telegram', name: 'Telegram', baseUrl: 'https://t.me/', placeholder: 'username' },
];

export function ContentForm({ type, formData, onChange }: ContentFormProps) {
  const [showPassword, setShowPassword] = useState(false);
  const [copied, setCopied] = useState(false);

  const updateField = React.useCallback(
    (field: string, value: string) => {
      const newData = { ...formData, [field]: value };
      
      // Auto-generate content based on type
      if (type === 'social' && field.includes('_username')) {
        const platform = field.replace('_username', '');
        const platformData = socialPlatforms.find(p => p.id === platform);
        if (platformData && value) {
          newData.content = `${platformData.baseUrl}${value}`;
        }
      }
      
      onChange(newData);
    },
    [formData, onChange, type]
  );

  const copyToClipboard = async (text: string) => {
    try {
      await navigator.clipboard.writeText(text);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch (err) {
      console.error('Failed to copy:', err);
    }
  };

  const renderFormFields = () => {
    switch (type) {
      case 'url':
        return (
          <>
            <div>
              <label className="block text-sm font-medium text-gray-300 mb-2">Website URL *</label>
              <div className="relative">
                <Globe className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" />
                <input
                  type="url"
                  placeholder="https://example.com"
                  value={formData.content || ''}
                  onChange={(e) => updateField('content', e.target.value)}
                  className="w-full bg-gray-800/50 border border-gray-600/50 rounded-lg pl-10 pr-4 py-3 text-white placeholder-gray-400 focus:border-cyan-500/50 focus:ring-1 focus:ring-cyan-500/20 transition-all"
                  required
                />
              </div>
              <p className="text-xs text-gray-400 mt-1">Enter the complete URL including https://</p>
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-300 mb-2">Title (Optional)</label>
              <input
                type="text"
                placeholder="My Website"
                value={formData.title || ''}
                onChange={(e) => updateField('title', e.target.value)}
                className="w-full bg-gray-800/50 border border-gray-600/50 rounded-lg px-4 py-3 text-white placeholder-gray-400 focus:border-cyan-500/50 focus:ring-1 focus:ring-cyan-500/20 transition-all"
              />
            </div>
          </>
        );

      case 'text':
        return (
          <div>
            <label className="block text-sm font-medium text-gray-300 mb-2">Text Content *</label>
            <textarea
              placeholder="Enter your text message..."
              value={formData.content || ''}
              onChange={(e) => updateField('content', e.target.value)}
              className="w-full bg-gray-800/50 border border-gray-600/50 rounded-lg px-4 py-3 text-white placeholder-gray-400 focus:border-cyan-500/50 focus:ring-1 focus:ring-cyan-500/20 transition-all resize-vertical"
              rows={4}
              maxLength={1000}
              required
            />
            <p className="text-xs text-gray-400 mt-1">{(formData.content || '').length}/1000 characters</p>
          </div>
        );

      case 'wifi':
        return (
          <>
            <div>
              <label className="block text-sm font-medium text-gray-300 mb-2">Network Name (SSID) *</label>
              <input
                type="text"
                placeholder="My WiFi Network"
                value={formData.ssid || ''}
                onChange={(e) => updateField('ssid', e.target.value)}
                className="w-full bg-gray-800/50 border border-gray-600/50 rounded-lg px-4 py-3 text-white placeholder-gray-400 focus:border-cyan-500/50 focus:ring-1 focus:ring-cyan-500/20 transition-all"
                required
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-300 mb-2">Password</label>
              <div className="relative">
                <input
                  type={showPassword ? 'text' : 'password'}
                  placeholder="WiFi password"
                  value={formData.password || ''}
                  onChange={(e) => updateField('password', e.target.value)}
                  className="w-full bg-gray-800/50 border border-gray-600/50 rounded-lg px-4 pr-10 py-3 text-white placeholder-gray-400 focus:border-cyan-500/50 focus:ring-1 focus:ring-cyan-500/20 transition-all"
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-white"
                >
                  {showPassword ? <EyeOff className="w-5 h-5" /> : <Eye className="w-5 h-5" />}
                </button>
              </div>
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-300 mb-2">Security Type</label>
              <select
                value={formData.security || 'WPA'}
                onChange={(e) => updateField('security', e.target.value)}
                className="w-full bg-gray-800/50 border border-gray-600/50 rounded-lg px-4 py-3 text-white focus:border-cyan-500/50 focus:ring-1 focus:ring-cyan-500/20 transition-all"
              >
                <option value="WPA">WPA/WPA2</option>
                <option value="WEP">WEP</option>
                <option value="nopass">Open Network</option>
              </select>
            </div>
          </>
        );

      case 'vcard':
        return (
          <>
            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-300 mb-2">First Name *</label>
                <input
                  type="text"
                  placeholder="John"
                  value={formData.firstName || ''}
                  onChange={(e) => updateField('firstName', e.target.value)}
                  className="w-full bg-gray-800/50 border border-gray-600/50 rounded-lg px-4 py-3 text-white placeholder-gray-400 focus:border-cyan-500/50 focus:ring-1 focus:ring-cyan-500/20 transition-all"
                  required
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-300 mb-2">Last Name *</label>
                <input
                  type="text"
                  placeholder="Doe"
                  value={formData.lastName || ''}
                  onChange={(e) => updateField('lastName', e.target.value)}
                  className="w-full bg-gray-800/50 border border-gray-600/50 rounded-lg px-4 py-3 text-white placeholder-gray-400 focus:border-cyan-500/50 focus:ring-1 focus:ring-cyan-500/20 transition-all"
                  required
                />
              </div>
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-300 mb-2">Email</label>
              <input
                type="email"
                placeholder="john.doe@example.com"
                value={formData.email || ''}
                onChange={(e) => updateField('email', e.target.value)}
                className="w-full bg-gray-800/50 border border-gray-600/50 rounded-lg px-4 py-3 text-white placeholder-gray-400 focus:border-cyan-500/50 focus:ring-1 focus:ring-cyan-500/20 transition-all"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-300 mb-2">Phone</label>
              <input
                type="tel"
                placeholder="+1 (555) 123-4567"
                value={formData.phone || ''}
                onChange={(e) => updateField('phone', e.target.value)}
                className="w-full bg-gray-800/50 border border-gray-600/50 rounded-lg px-4 py-3 text-white placeholder-gray-400 focus:border-cyan-500/50 focus:ring-1 focus:ring-cyan-500/20 transition-all"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-300 mb-2">Company</label>
              <input
                type="text"
                placeholder="Acme Corporation"
                value={formData.company || ''}
                onChange={(e) => updateField('company', e.target.value)}
                className="w-full bg-gray-800/50 border border-gray-600/50 rounded-lg px-4 py-3 text-white placeholder-gray-400 focus:border-cyan-500/50 focus:ring-1 focus:ring-cyan-500/20 transition-all"
              />
            </div>
          </>
        );

      case 'social':
        return (
          <div className="space-y-4">
            <p className="text-sm text-gray-300 mb-4">Add your social media profiles:</p>
            {socialPlatforms.map((platform) => (
              <div key={platform.id}>
                <label className="block text-sm font-medium text-gray-300 mb-2">{platform.name}</label>
                <div className="flex items-center gap-2">
                  <span className="text-sm text-gray-400 flex-shrink-0">{platform.baseUrl}</span>
                  <input
                    type="text"
                    placeholder={platform.placeholder}
                    value={formData[`${platform.id}_username`] || ''}
                    onChange={(e) => updateField(`${platform.id}_username`, e.target.value)}
                    className="flex-1 bg-gray-800/50 border border-gray-600/50 rounded-lg px-3 py-2 text-white placeholder-gray-400 focus:border-cyan-500/50 focus:ring-1 focus:ring-cyan-500/20 transition-all"
                  />
                </div>
              </div>
            ))}
          </div>
        );

      case 'email':
        return (
          <>
            <div>
              <label className="block text-sm font-medium text-gray-300 mb-2">Email Address *</label>
              <input
                type="email"
                placeholder="recipient@example.com"
                value={formData.email || ''}
                onChange={(e) => updateField('email', e.target.value)}
                className="w-full bg-gray-800/50 border border-gray-600/50 rounded-lg px-4 py-3 text-white placeholder-gray-400 focus:border-cyan-500/50 focus:ring-1 focus:ring-cyan-500/20 transition-all"
                required
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-300 mb-2">Subject</label>
              <input
                type="text"
                placeholder="Email subject"
                value={formData.subject || ''}
                onChange={(e) => updateField('subject', e.target.value)}
                className="w-full bg-gray-800/50 border border-gray-600/50 rounded-lg px-4 py-3 text-white placeholder-gray-400 focus:border-cyan-500/50 focus:ring-1 focus:ring-cyan-500/20 transition-all"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-300 mb-2">Message Body</label>
              <textarea
                placeholder="Email message..."
                value={formData.body || ''}
                onChange={(e) => updateField('body', e.target.value)}
                className="w-full bg-gray-800/50 border border-gray-600/50 rounded-lg px-4 py-3 text-white placeholder-gray-400 focus:border-cyan-500/50 focus:ring-1 focus:ring-cyan-500/20 transition-all resize-vertical"
                rows={3}
              />
            </div>
          </>
        );

      case 'phone':
        return (
          <div>
            <label className="block text-sm font-medium text-gray-300 mb-2">Phone Number *</label>
            <input
              type="tel"
              placeholder="+1 (555) 123-4567"
              value={formData.phone || ''}
              onChange={(e) => updateField('phone', e.target.value)}
              className="w-full bg-gray-800/50 border border-gray-600/50 rounded-lg px-4 py-3 text-white placeholder-gray-400 focus:border-cyan-500/50 focus:ring-1 focus:ring-cyan-500/20 transition-all"
              required
            />
            <p className="text-xs text-gray-400 mt-1">Include country code for international numbers</p>
          </div>
        );

      case 'sms':
        return (
          <>
            <div>
              <label className="block text-sm font-medium text-gray-300 mb-2">Phone Number *</label>
              <input
                type="tel"
                placeholder="+1 (555) 123-4567"
                value={formData.phone || ''}
                onChange={(e) => updateField('phone', e.target.value)}
                className="w-full bg-gray-800/50 border border-gray-600/50 rounded-lg px-4 py-3 text-white placeholder-gray-400 focus:border-cyan-500/50 focus:ring-1 focus:ring-cyan-500/20 transition-all"
                required
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-300 mb-2">Message</label>
              <textarea
                placeholder="Your SMS message..."
                value={formData.message || ''}
                onChange={(e) => updateField('message', e.target.value)}
                className="w-full bg-gray-800/50 border border-gray-600/50 rounded-lg px-4 py-3 text-white placeholder-gray-400 focus:border-cyan-500/50 focus:ring-1 focus:ring-cyan-500/20 transition-all resize-vertical"
                rows={3}
                maxLength={160}
              />
              <p className="text-xs text-gray-400 mt-1">{(formData.message || '').length}/160 characters</p>
            </div>
          </>
        );

      default:
        return (
          <div>
            <label className="block text-sm font-medium text-gray-300 mb-2">Content *</label>
            <textarea
              placeholder="Enter content for this QR code type..."
              value={formData.content || ''}
              onChange={(e) => updateField('content', e.target.value)}
              className="w-full bg-gray-800/50 border border-gray-600/50 rounded-lg px-4 py-3 text-white placeholder-gray-400 focus:border-cyan-500/50 focus:ring-1 focus:ring-cyan-500/20 transition-all resize-vertical"
              rows={4}
              required
            />
          </div>
        );
    }
  };

  return (
    <div className="bg-gray-900/50 backdrop-blur-sm border border-gray-700/50 rounded-xl p-6">
      <h3 className="text-lg font-semibold text-white mb-4">Enter Content</h3>
      <div className="space-y-4">
        {renderFormFields()}
      </div>

      {/* Content Preview */}
      {formData.content && (
        <div className="mt-6 p-4 bg-gray-800/30 border border-gray-600/30 rounded-lg">
          <div className="flex items-center justify-between mb-2">
            <span className="text-sm font-medium text-gray-300">Generated Content:</span>
            <button
              onClick={() => copyToClipboard(formData.content)}
              className="flex items-center gap-2 text-xs text-gray-400 hover:text-cyan-400 transition-colors"
            >
              {copied ? <Check className="w-4 h-4" /> : <Copy className="w-4 h-4" />}
              {copied ? 'Copied!' : 'Copy'}
            </button>
          </div>
          <p className="text-sm text-gray-300 font-mono bg-gray-900/50 p-2 rounded border break-all">
            {formData.content}
          </p>
        </div>
      )}

      {/* Type-specific tips */}
      <div className="mt-4 p-3 bg-gradient-to-r from-cyan-500/10 to-blue-500/10 border border-cyan-500/20 rounded-lg">
        <p className="text-xs text-cyan-300">
          {type === 'url' && '💡 Make sure your URL is accessible and starts with https://'}
          {type === 'wifi' && '💡 Users will be able to connect automatically by scanning this QR code'}
          {type === 'vcard' && '💡 This will create a digital business card that can be saved to contacts'}
          {type === 'email' && '💡 Scanning will open the default email app with pre-filled content'}
          {type === 'phone' && '💡 Scanning will prompt to call this number'}
          {type === 'sms' && '💡 Scanning will open SMS app with pre-filled message'}
          {type === 'text' && '💡 Plain text QR codes are great for messages, instructions, or simple data'}
          {type === 'social' && '💡 Add multiple social profiles - the QR will show a link list'}
        </p>
      </div>
    </div>
  );
}