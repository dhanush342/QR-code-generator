import { Palette, Square, Circle } from 'lucide-react';
import { QRCustomization } from '../../types';

interface CustomizationPanelProps {
  customization: QRCustomization;
  onChange: (customization: QRCustomization) => void;
}

export function CustomizationPanel({ customization, onChange }: CustomizationPanelProps) {
  const updateCustomization = <K extends keyof QRCustomization>(key: K, value: QRCustomization[K]) => {
    onChange({ ...customization, [key]: value });
  };

  const presetColors = [
    { name: 'Classic', fg: '#000000', bg: '#FFFFFF' },
    { name: 'Cyber', fg: '#00D9FF', bg: '#0A0A0A' },
    { name: 'Neon', fg: '#FF6B6B', bg: '#1A1A1A' },
    { name: 'Matrix', fg: '#00FF00', bg: '#000000' },
    { name: 'Purple', fg: '#8B5CF6', bg: '#F8FAFC' },
  ];

  return (
    <div className="bg-gray-900/50 backdrop-blur-sm border border-gray-700/50 rounded-xl p-6">
      <div className="flex items-center space-x-2 mb-4">
        <Palette className="w-5 h-5 text-cyan-400" />
        <h3 className="text-lg font-semibold text-white">Customization</h3>
      </div>

      <div className="space-y-6">
        {/* Size */}
        <div>
          <label className="text-sm font-medium text-gray-300 mb-2 block">Size: {customization.size}px</label>
          <input
            type="range"
            min="128"
            max="512"
            value={customization.size}
            onChange={(e) => updateCustomization('size', parseInt(e.target.value))}
            className="w-full accent-cyan-500"
          />
        </div>

        {/* Color Presets */}
        <div>
          <label className="text-sm font-medium text-gray-300 mb-2 block">Color Presets</label>
          <div className="grid grid-cols-5 gap-2">
            {presetColors.map((preset) => (
              <button
                key={preset.name}
                onClick={() => {
                  updateCustomization('foregroundColor', preset.fg);
                  updateCustomization('backgroundColor', preset.bg);
                }}
                className="aspect-square rounded-lg border border-gray-600/50 hover:border-gray-500/50 transition-all relative overflow-hidden"
                style={{
                  background: `linear-gradient(45deg, ${preset.bg} 50%, ${preset.fg} 50%)`
                }}
                title={preset.name}
              />
            ))}
          </div>
        </div>

        {/* Custom Colors */}
        <div className="grid grid-cols-2 gap-4">
          <div>
            <label className="text-sm font-medium text-gray-300 mb-2 block">Foreground</label>
            <div className="flex space-x-2">
              <input
                type="color"
                value={customization.foregroundColor}
                onChange={(e) => updateCustomization('foregroundColor', e.target.value)}
                className="w-12 h-10 rounded-lg border border-gray-600/50 bg-gray-800"
              />
              <input
                type="text"
                value={customization.foregroundColor}
                onChange={(e) => updateCustomization('foregroundColor', e.target.value)}
                className="flex-1 bg-gray-800/50 border border-gray-600/50 rounded-lg px-3 py-2 text-white text-sm"
              />
            </div>
          </div>
          <div>
            <label className="text-sm font-medium text-gray-300 mb-2 block">Background</label>
            <div className="flex space-x-2">
              <input
                type="color"
                value={customization.backgroundColor}
                onChange={(e) => updateCustomization('backgroundColor', e.target.value)}
                className="w-12 h-10 rounded-lg border border-gray-600/50 bg-gray-800"
              />
              <input
                type="text"
                value={customization.backgroundColor}
                onChange={(e) => updateCustomization('backgroundColor', e.target.value)}
                className="flex-1 bg-gray-800/50 border border-gray-600/50 rounded-lg px-3 py-2 text-white text-sm"
              />
            </div>
          </div>
        </div>

        {/* Shape */}
        <div>
          <label className="text-sm font-medium text-gray-300 mb-2 block">Shape</label>
          <div className="grid grid-cols-3 gap-2">
            {[
              { value: 'square', label: 'Square', icon: Square },
              { value: 'rounded', label: 'Rounded', icon: Square },
              { value: 'circular', label: 'Circular', icon: Circle }
            ].map((shape) => {
              const Icon = shape.icon;
              return (
                <button
                  key={shape.value}
                  onClick={() => updateCustomization('shape', shape.value as 'square' | 'rounded' | 'circular')}
                  className={`flex items-center justify-center space-x-2 p-3 rounded-lg border text-sm transition-all ${
                    customization.shape === shape.value
                      ? 'border-cyan-500/50 bg-cyan-500/10 text-cyan-400'
                      : 'border-gray-600/50 bg-gray-800/30 text-gray-300 hover:border-gray-500/50'
                  }`}
                >
                  <Icon className="w-4 h-4" />
                  <span>{shape.label}</span>
                </button>
              );
            })}
          </div>
        </div>

        {/* Pattern */}
        <div>
          <label className="text-sm font-medium text-gray-300 mb-2 block">Pattern</label>
          <div className="grid grid-cols-3 gap-2">
            {[
              { value: 'standard', label: 'Standard' },
              { value: 'dots', label: 'Dots' },
              { value: 'rounded-dots', label: 'Rounded' }
            ].map((pattern) => (
              <button
                key={pattern.value}
                onClick={() => updateCustomization('pattern', pattern.value as 'standard' | 'dots' | 'rounded-dots')}
                className={`p-3 rounded-lg border text-sm transition-all ${
                  customization.pattern === pattern.value
                    ? 'border-cyan-500/50 bg-cyan-500/10 text-cyan-400'
                    : 'border-gray-600/50 bg-gray-800/30 text-gray-300 hover:border-gray-500/50'
                }`}
              >
                {pattern.label}
              </button>
            ))}
          </div>
        </div>

        {/* Error Correction */}
        <div>
          <label className="text-sm font-medium text-gray-300 mb-2 block">Error Correction</label>
          <select
            value={customization.errorCorrection}
            onChange={(e) => updateCustomization('errorCorrection', e.target.value as 'L' | 'M' | 'Q' | 'H')}
            className="w-full bg-gray-800/50 border border-gray-600/50 rounded-lg px-4 py-2 text-white focus:border-cyan-500/50 focus:ring-1 focus:ring-cyan-500/20 transition-all"
          >
            <option value="L">Low (7%)</option>
            <option value="M">Medium (15%)</option>
            <option value="Q">Quartile (25%)</option>
            <option value="H">High (30%)</option>
          </select>
        </div>

        {/* Gradient */}
        <div>
          <label className="flex items-center space-x-3 cursor-pointer mb-3">
            <input
              type="checkbox"
              checked={customization.gradientEnabled}
              onChange={(e) => updateCustomization('gradientEnabled', e.target.checked)}
              className="w-4 h-4 text-cyan-500 bg-gray-800 border-gray-600 rounded focus:ring-cyan-500/20"
            />
            <span className="text-sm text-gray-300">Enable Gradient</span>
          </label>
          
          {customization.gradientEnabled && (
            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="text-xs text-gray-400 mb-1 block">Start Color</label>
                <input
                  type="color"
                  value={customization.gradientColors[0]}
                  onChange={(e) => updateCustomization('gradientColors', [e.target.value, customization.gradientColors[1]])}
                  className="w-full h-8 rounded border border-gray-600/50 bg-gray-800"
                />
              </div>
              <div>
                <label className="text-xs text-gray-400 mb-1 block">End Color</label>
                <input
                  type="color"
                  value={customization.gradientColors[1]}
                  onChange={(e) => updateCustomization('gradientColors', [customization.gradientColors[0], e.target.value])}
                  className="w-full h-8 rounded border border-gray-600/50 bg-gray-800"
                />
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}