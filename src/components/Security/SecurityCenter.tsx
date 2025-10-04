import React from 'react';
import { APIDocumentation } from './APIDocumentation';
import { SecurityFeatures } from './SecurityFeatures';
import { BlockchainVerification } from './BlockchainVerification';

export function SecurityCenter() {
  return (
    <div className="min-h-screen bg-gray-950 py-8">
      <div className="container mx-auto px-6">
        <div className="max-w-7xl mx-auto">
          <div className="mb-8">
            <h2 className="text-3xl font-bold text-white mb-2">Security & API Center</h2>
            <p className="text-gray-400">Advanced security features and developer tools</p>
          </div>

          <div className="grid lg:grid-cols-3 gap-6">
            <div className="lg:col-span-2">
              <APIDocumentation />
            </div>
            <div className="space-y-6">
              <SecurityFeatures />
              <BlockchainVerification />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}