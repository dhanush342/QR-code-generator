// Define QRCodeType if not already imported
type QRCodeType = string; // Replace 'string' with a union of valid QR code type strings if available

// Define QRType interface to describe the shape of each QR type
interface QRType {
  id: string;
  label: string;
  description: string;
  icon: React.ComponentType<{ className?: string }>;
  color: string;
  popular: boolean;
}

interface QRTypeSelectorProps {
  selectedType: QRCodeType;
  onTypeChange: (type: QRCodeType) => void;
}

// Example icons for demonstration purposes
const DummyIcon: React.FC<{ className?: string }> = ({ className }) => (
  <span className={className}>🔲</span>
);
const Sparkles: React.FC<{ className?: string }> = ({ className }) => (
  <span className={className}>✨</span>
);

// Define the available QR types
const qrTypes: QRType[] = [
  {
    id: "url",
    label: "URL",
    description: "Link to a website or online resource.",
    icon: DummyIcon,
    color: "from-cyan-500 to-blue-500",
    popular: true,
  },
  {
    id: "wifi",
    label: "WiFi",
    description: "Share WiFi credentials for easy connection.",
    icon: DummyIcon,
    color: "from-green-400 to-blue-500",
    popular: true,
  },
  {
    id: "contact",
    label: "Contact Card",
    description: "Share your contact information (vCard).",
    icon: DummyIcon,
    color: "from-yellow-400 to-orange-500",
    popular: true,
  },
  {
    id: "email",
    label: "Email",
    description: "Send an email with a single scan.",
    icon: DummyIcon,
    color: "from-pink-500 to-red-500",
    popular: false,
  },
  {
    id: "sms",
    label: "SMS",
    description: "Send a text message with a single scan.",
    icon: DummyIcon,
    color: "from-purple-500 to-indigo-500",
    popular: false,
  },
  {
    id: "text",
    label: "Text",
    description: "Display a block of text.",
    icon: DummyIcon,
    color: "from-gray-500 to-gray-700",
    popular: false,
  },
];

export function QRTypeSelector({ selectedType, onTypeChange }: QRTypeSelectorProps) {
  const popularTypes = qrTypes.filter((type: QRType) => type.popular);
  const otherTypes = qrTypes.filter((type: QRType) => !type.popular);

  return (
    <div className="bg-gray-900/50 backdrop-blur-sm border border-gray-700/50 rounded-xl p-6">
      <h3 className="text-lg font-semibold text-white mb-4">Choose QR Code Type</h3>

      {/* Popular Types */}
      <div className="mb-6">
        <h4 className="text-sm font-medium text-gray-300 mb-3 flex items-center gap-2">🔥 Popular Types</h4>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3">
          {popularTypes.map((type: QRType) => {
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