import React from 'react';
import { Shield, Lock, Eye, Fingerprint, Hash, Zap } from 'lucide-react';

export function SecurityFeatures() {
  const features = [
    {
      icon: Lock,
      title: 'AES-256 Encryption',
      description: 'Military-grade encryption for all data',
      status: 'active',
      level: 95
    },
    {
      icon: Fingerprint,
      title: 'Biometric Authentication',
      description: 'Touch/Face ID for secure access',
      status: 'active',
      level: 88
    },
    {
      icon: Shield,
      title: 'Digital Signatures',
      description: 'RSA signature verification',
      status: 'active',
      level: 92
    },
    {
      icon: Eye,
      title: 'AI Fraud Detection',
      description: 'Machine learning threat analysis',
      status: 'active',
      level: 87
    },
    {
      icon: Hash,
      title: 'Blockchain Verification',
      description: 'Immutable authenticity proof',
      status: 'active',
      level: 94
    },
    {
      icon: Zap,
      title: 'Real-time Monitoring',
      description: '24/7 security surveillance',
      status: 'active',
      level: 99
    }
  ];

  return (
    <div className="bg-gray-900/50 backdrop-blur-sm border border-gray-700/50 rounded-xl p-6">
      <div className="flex items-center space-x-2 mb-6">
        <Shield className="w-5 h-5 text-cyan-400" />
        <h3 className="text-lg font-semibold text-white">Security Features</h3>
      </div>

      <div className="space-y-4">
        {features.map((feature, index) => {
          const Icon = feature.icon;
          return (
            <div key={index} className="bg-gray-800/30 border border-gray-700/30 rounded-lg p-4">
              <div className="flex items-center justify-between mb-2">
                <div className="flex items-center space-x-3">
                  <div className="p-2 bg-cyan-500/20 rounded-lg">
                    <Icon className="w-4 h-4 text-cyan-400" />
                  </div>
                  <div>
                    <h4 className="text-white font-medium">{feature.title}</h4>
                    <p className="text-xs text-gray-400">{feature.description}</p>
                  </div>
                </div>
                <div className="text-right">
                  <div className="text-xs text-green-400 font-medium mb-1">
                    {feature.level}%
                  </div>
                  <div className="w-16 h-1 bg-gray-700 rounded-full overflow-hidden">
                    <div
                      className="h-full bg-gradient-to-r from-cyan-500 to-green-500 transition-all duration-300"
                      style={{ width: `${feature.level}%` }}
                    ></div>
                  </div>
                </div>
              </div>
            </div>
          );
        })}
      </div>

      <div className="mt-6 p-4 bg-gradient-to-r from-cyan-500/10 to-green-500/10 border border-cyan-500/20 rounded-lg">
        <div className="flex items-center space-x-2 mb-2">
          <Shield className="w-4 h-4 text-green-400" />
          <span className="text-green-400 font-medium text-sm">Security Score</span>
        </div>
        <div className="flex items-center space-x-3">
          <div className="text-2xl font-bold text-white">92.5/100</div>
          <div className="flex-1">
            <div className="w-full h-2 bg-gray-700 rounded-full overflow-hidden">
              <div className="h-full bg-gradient-to-r from-cyan-500 to-green-500 rounded-full" style={{ width: '92.5%' }}></div>
            </div>
          </div>
        </div>
        <p className="text-xs text-gray-400 mt-2">Excellent security posture</p>
      </div>
    </div>
  );
}