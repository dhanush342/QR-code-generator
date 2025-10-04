import { QRCodeType } from '../../types';
import { Globe, Type, Wifi, User, MessageSquare, Mail, Phone, Share2, MapPin, Calendar, Percent, Sparkles } from 'lucide-react';

interface QRTypeSelectorProps {
  selectedType: QRCodeType;
  onTypeChange: (type: QRCodeType) => void;
}



const qrTypes = [
  { id: 'url', label: 'Website URL', icon: Globe, color: 'from-blue-500 to-cyan-500', description: 'Link to websites', popular: true },
  { id: 'text', label: 'Plain Text', icon: Type, color: 'from-green-500 to-emerald-500', description: 'Simple text message', popular: true },
  { id: 'wifi', label: 'WiFi Network', icon: Wifi, color: 'from-purple-500 to-violet-500', description: 'Auto-connect to WiFi', popular: true },
  { id: 'vcard', label: 'Contact Card', icon: User, color: 'from-orange-500 to-red-500', description: 'Digital business card', popular: true },
  { id: 'email', label: 'Email', icon: Mail, color: 'from-indigo-500 to-blue-500', description: 'Send email message', popular: true },
  { id: 'phone', label: 'Phone Call', icon: Phone, color: 'from-pink-500 to-rose-500', description: 'Direct phone dialing' },
  { id: 'sms', label: 'SMS Message', icon: MessageSquare, color: 'from-teal-500 to-cyan-500', description: 'Send text message' },
  { id: 'social', label: 'Social Media', icon: Share2, color: 'from-violet-500 to-purple-500', description: 'Social profiles' },
  { id: 'location', label: 'Location', icon: MapPin, color: 'from-yellow-500 to-orange-500', description: 'GPS coordinates' },
  { id: 'event', label: 'Calendar Event', icon: Calendar, color: 'from-cyan-500 to-blue-500', description: 'Add to calendar' },
  { id: 'coupon', label: 'Coupon/Promo', icon: Percent, color: 'from-rose-500 to-pink-500', description: 'Discount codes' },
];



export function QRTypeSelector({ selectedType, onTypeChange }: QRTypeSelectorProps) {
  const popularTypes = qrTypes.filter(type => type.popular);
  const otherTypes = qrTypes.filter(type => !type.popular);

  return (
    <div className="bg-gray-900/50 backdrop-blur-sm border border-gray-700/50 rounded-xl p-6">
      <h3 className="text-lg font-semibold text-white mb-4">Choose QR Code Type</h3>

      {/* Popular Types */}
      <div className="mb-6">
        <h4 className="text-sm font-medium text-gray-300 mb-3 flex items-center gap-2">🔥 Popular Types</h4>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3">
          {popularTypes.map((type) => {
            const Icon = type.icon;
            const isSelected = selectedType === type.id;
            return (
              <button
                key={type.id}
                onClick={() => onTypeChange(type.id as QRCodeType)}
                className={`group relative p-4 rounded-lg border text-left transition-all duration-200 hover:scale-[1.02] ${
                  isSelected
                    ? 'border-cyan-500/70 bg-cyan-500/10 shadow-lg shadow-cyan-500/20'
                    : 'border-gray-600/50 bg-gray-800/30 hover:border-gray-500/70 hover:bg-gray-700/50'
                }`}
              >
                <div className="flex items-center gap-3">
                  <div className={`p-2 rounded-lg bg-gradient-to-r ${type.color} transition-transform group-hover:scale-110`}>
                    <Icon className="w-5 h-5 text-white" />
                  </div>
                  <div className="flex-1">
                    <h5 className={`font-medium transition-colors ${
                      isSelected ? 'text-cyan-300' : 'text-white group-hover:text-cyan-300'
                    }`}>
                      {type.label}
                    </h5>
                    <p className="text-xs text-gray-400 mt-1 line-clamp-2">
                      {type.description}
                    </p>
                  </div>
                </div>
              </button>
            );
          })}
        </div>
      </div>

      {/* Other Types */}
      <div>
        <h4 className="text-sm font-medium text-gray-300 mb-3">📋 More Options</h4>
        <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
          {otherTypes.map((type) => {
            const Icon = type.icon;
            const isSelected = selectedType === type.id;
            return (
              <button
                key={type.id}
                onClick={() => onTypeChange(type.id as QRCodeType)}
                className={`group relative p-4 rounded-lg border text-left transition-all duration-200 hover:scale-[1.02] ${
                  isSelected
                    ? 'border-cyan-500/70 bg-cyan-500/10 shadow-lg shadow-cyan-500/20'
                    : 'border-gray-600/50 bg-gray-800/30 hover:border-gray-500/70 hover:bg-gray-700/50'
                }`}
              >
                <div className="flex items-center gap-3">
                  <div className={`p-2 rounded-lg bg-gradient-to-r ${type.color} transition-transform group-hover:scale-110`}>
                    <Icon className="w-5 h-5 text-white" />
                  </div>
                  <div className="flex-1">
                    <h5 className={`font-medium transition-colors ${
                      isSelected ? 'text-cyan-300' : 'text-white group-hover:text-cyan-300'
                    }`}>
                      {type.label}
                    </h5>
                    <p className="text-xs text-gray-400 mt-1 line-clamp-2">
                      {type.description}
                    </p>
                  </div>
                </div>
              </button>
            );
          })}
        </div>
      </div>

      <div className="mt-6 p-4 bg-gradient-to-r from-cyan-500/10 to-blue-500/10 border border-cyan-500/20 rounded-lg">
        <div className="flex items-center gap-2 text-cyan-400 text-sm">
          <Sparkles className="w-4 h-4" />
          <span className="font-medium">Pro Tip:</span>
        </div>
        <p className="text-gray-300 text-sm mt-1">
          URL and WiFi QR codes have the highest scan success rates. Contact cards are great for networking events.
        </p>
      </div>
    </div>
  );
}