import { Shield, Lock, Fingerprint, RefreshCw, MapPin, Clock, Hash } from 'lucide-react';

interface SecurityFormData {
  password?: string;
  expiryDate?: string;
  usageLimit?: number | string;
  geoRadius?: number | string;
}

interface SecurityOptionsType {
  securityLevel?: 'basic' | 'enhanced' | 'military';
  encrypted?: boolean;
  hasPassword?: boolean;
  biometricLock?: boolean;
  isDynamic?: boolean;
  geoFencing?: boolean;
}

interface SecurityOptionsProps {
  options: SecurityOptionsType;
  onChange: (options: SecurityOptionsType) => void;
  formData: SecurityFormData;
  onFormDataChange: (data: SecurityFormData) => void;
}

export function SecurityOptions({ options, onChange, formData, onFormDataChange }: SecurityOptionsProps) {
  const updateOption = <K extends keyof SecurityOptionsType>(key: K, value: SecurityOptionsType[K]) => {
    onChange({ ...options, [key]: value });
  };

  const updateFormField = (key: string, value: string) => {
    onFormDataChange({ ...formData, [key]: value });
  };

  return (
    <div className="bg-gray-900/50 backdrop-blur-sm border border-gray-700/50 rounded-xl p-6">
      <div className="flex items-center space-x-2 mb-4">
        <Shield className="w-5 h-5 text-cyan-400" />
        <h3 className="text-lg font-semibold text-white">Security & Advanced Features</h3>
      </div>

      <div className="space-y-6">
        {/* Security Level */}
        <div>
          <label className="text-sm font-medium text-gray-300 mb-2 block">Security Level</label>
          <div className="grid grid-cols-3 gap-2">
            {['basic', 'enhanced', 'military'].map((level) => (
              <button
                key={level}
                onClick={() => updateOption('securityLevel', level as 'basic' | 'enhanced' | 'military')}
                className={`p-3 rounded-lg border text-sm font-medium transition-all ${
                  options.securityLevel === level
                    ? 'border-cyan-500/50 bg-cyan-500/10 text-cyan-400'
                    : 'border-gray-600/50 bg-gray-800/30 text-gray-300 hover:border-gray-500/50'
                }`}
              >
                {level.charAt(0).toUpperCase() + level.slice(1)}
              </button>
            ))}
          </div>
        </div>

        {/* Security Features */}
        <div className="grid grid-cols-2 gap-4">
          <label className="flex items-center space-x-3 cursor-pointer">
            <input
              type="checkbox"
              checked={options.encrypted}
              onChange={(e) => updateOption('encrypted', e.target.checked)}
              className="w-4 h-4 text-cyan-500 bg-gray-800 border-gray-600 rounded focus:ring-cyan-500/20"
            />
            <div className="flex items-center space-x-2">
              <Lock className="w-4 h-4 text-gray-400" />
              <span className="text-sm text-gray-300">Encrypt Data</span>
            </div>
          </label>

          <label className="flex items-center space-x-3 cursor-pointer">
            <input
              type="checkbox"
              checked={options.hasPassword}
              onChange={(e) => updateOption('hasPassword', e.target.checked)}
              className="w-4 h-4 text-cyan-500 bg-gray-800 border-gray-600 rounded focus:ring-cyan-500/20"
            />
            <div className="flex items-center space-x-2">
              <Hash className="w-4 h-4 text-gray-400" />
              <span className="text-sm text-gray-300">Password Protection</span>
            </div>
          </label>

          <label className="flex items-center space-x-3 cursor-pointer">
            <input
              type="checkbox"
              checked={options.biometricLock}
              onChange={(e) => updateOption('biometricLock', e.target.checked)}
              className="w-4 h-4 text-cyan-500 bg-gray-800 border-gray-600 rounded focus:ring-cyan-500/20"
            />
            <div className="flex items-center space-x-2">
              <Fingerprint className="w-4 h-4 text-gray-400" />
              <span className="text-sm text-gray-300">Biometric Lock</span>
            </div>
          </label>

          <label className="flex items-center space-x-3 cursor-pointer">
            <input
              type="checkbox"
              checked={options.isDynamic}
              onChange={(e) => updateOption('isDynamic', e.target.checked)}
              className="w-4 h-4 text-cyan-500 bg-gray-800 border-gray-600 rounded focus:ring-cyan-500/20"
            />
            <div className="flex items-center space-x-2">
              <RefreshCw className="w-4 h-4 text-gray-400" />
              <span className="text-sm text-gray-300">Dynamic QR</span>
            </div>
          </label>
        </div>

        {/* Password Field */}
        {options.hasPassword && (
          <div>
            <input
              type="password"
              placeholder="Enter password"
              value={formData.password}
              onChange={(e) => updateFormField('password', e.target.value)}
              className="w-full bg-gray-800/50 border border-gray-600/50 rounded-lg px-4 py-3 text-white placeholder-gray-400 focus:border-cyan-500/50 focus:ring-1 focus:ring-cyan-500/20 transition-all"
            />
          </div>
        )}

        {/* Advanced Options */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <label className="flex items-center space-x-2 text-sm text-gray-300 mb-2">
              <Clock className="w-4 h-4" />
              <span>Expiry Date</span>
            </label>
            <input
              type="datetime-local"
              value={formData.expiryDate}
              onChange={(e) => updateFormField('expiryDate', e.target.value)}
              className="w-full bg-gray-800/50 border border-gray-600/50 rounded-lg px-4 py-2 text-white focus:border-cyan-500/50 focus:ring-1 focus:ring-cyan-500/20 transition-all"
            />
          </div>

          <div>
            <label className="flex items-center space-x-2 text-sm text-gray-300 mb-2">
              <Hash className="w-4 h-4" />
              <span>Usage Limit</span>
            </label>
            <input
              type="number"
              placeholder="Max scans"
              value={formData.usageLimit}
              onChange={(e) => updateFormField('usageLimit', e.target.value)}
              className="w-full bg-gray-800/50 border border-gray-600/50 rounded-lg px-4 py-2 text-white placeholder-gray-400 focus:border-cyan-500/50 focus:ring-1 focus:ring-cyan-500/20 transition-all"
            />
          </div>
        </div>

        {/* Geo-fencing */}
        <div>
          <label className="flex items-center space-x-3 cursor-pointer mb-3">
            <input
              type="checkbox"
              checked={options.geoFencing}
              onChange={(e) => updateOption('geoFencing', e.target.checked)}
              className="w-4 h-4 text-cyan-500 bg-gray-800 border-gray-600 rounded focus:ring-cyan-500/20"
            />
            <div className="flex items-center space-x-2">
              <MapPin className="w-4 h-4 text-gray-400" />
              <span className="text-sm text-gray-300">Enable Geo-fencing</span>
            </div>
          </label>
          
          {options.geoFencing && (
            <input
              type="number"
              placeholder="Radius in meters"
              value={formData.geoRadius}
              onChange={(e) => updateFormField('geoRadius', e.target.value)}
              className="w-full bg-gray-800/50 border border-gray-600/50 rounded-lg px-4 py-2 text-white placeholder-gray-400 focus:border-cyan-500/50 focus:ring-1 focus:ring-cyan-500/20 transition-all"
            />
          )}
        </div>
      </div>
    </div>
  );
}