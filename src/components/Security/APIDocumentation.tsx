import React, { useState } from 'react';
import { Code, Copy, CheckCircle, Book } from 'lucide-react';

export function APIDocumentation() {
  const [selectedEndpoint, setSelectedEndpoint] = useState('create');
  const [copiedCode, setCopiedCode] = useState<string | null>(null);

  const endpoints = [
    {
      id: 'create',
      method: 'POST',
      path: '/api/qr/create',
      title: 'Create QR Code',
      description: 'Generate a new QR code with security features',
      request: {
        type: 'url',
        content: 'https://example.com',
        title: 'My QR Code',
        encrypted: true,
        securityLevel: 'enhanced',
        expiryDate: '2024-12-31T23:59:59Z',
        customization: {
          size: 256,
          foregroundColor: '#000000',
          backgroundColor: '#FFFFFF'
        }
      },
      response: {
        id: 'qr_abc123',
        dataUrl: 'data:image/png;base64,iVBORw0KGgoAAAANS...',
        securityHash: 'sha256:d2d2d2d2d2d2d2d2',
        createdAt: '2024-01-15T10:30:00Z'
      }
    },
    {
      id: 'scan',
      method: 'POST',
      path: '/api/qr/scan',
      title: 'Record Scan',
      description: 'Log a QR code scan event with analytics',
      request: {
        qrId: 'qr_abc123',
        deviceType: 'mobile',
        location: { latitude: 37.7749, longitude: -122.4194 },
        userAgent: 'Mozilla/5.0...'
      },
      response: {
        success: true,
        content: 'https://example.com',
        fraudScore: 12,
        accessGranted: true,
        scanId: 'scan_xyz789'
      }
    },
    {
      id: 'analytics',
      method: 'GET',
      path: '/api/qr/{id}/analytics',
      title: 'Get Analytics',
      description: 'Retrieve scan analytics for a QR code',
      response: {
        totalScans: 1250,
        uniqueUsers: 892,
        scansByDay: [45, 67, 23, 78, 34, 56, 89],
        topCountries: ['US', 'CA', 'UK', 'DE', 'FR'],
        fraudAttempts: 3,
        lastScan: '2024-01-15T14:22:00Z'
      }
    },
    {
      id: 'verify',
      method: 'POST',
      path: '/api/qr/verify',
      title: 'Verify QR Code',
      description: 'Verify QR code authenticity and security',
      request: {
        qrId: 'qr_abc123',
        digitalSignature: 'sig:a1b2c3d4...',
        blockchainHash: 'block:xyz789...'
      },
      response: {
        verified: true,
        signatureValid: true,
        blockchainConfirmed: true,
        trustScore: 98.5,
        verifiedAt: '2024-01-15T14:25:00Z'
      }
    }
  ];

  const copyCode = (code: string, type: string) => {
    navigator.clipboard.writeText(code);
    setCopiedCode(type);
    setTimeout(() => setCopiedCode(null), 2000);
  };

  const selectedEndpointData = endpoints.find(e => e.id === selectedEndpoint)!;

  const generateCurlCommand = (endpoint: typeof selectedEndpointData) => {
    const hasBody = endpoint.request;
    return `curl -X ${endpoint.method} \\
  https://api.nextgenqr.com${endpoint.path} \\
  -H "Authorization: Bearer YOUR_API_KEY" \\
  -H "Content-Type: application/json"${hasBody ? ` \\
  -d '${JSON.stringify(endpoint.request, null, 2)}'` : ''}`;
  };

  const generateJSCode = (endpoint: typeof selectedEndpointData) => {
    return `const response = await fetch('https://api.nextgenqr.com${endpoint.path}', {
  method: '${endpoint.method}',
  headers: {
    'Authorization': 'Bearer YOUR_API_KEY',
    'Content-Type': 'application/json',
  },${endpoint.request ? `
  body: JSON.stringify(${JSON.stringify(endpoint.request, null, 2)}),` : ''}
});

const data = await response.json();
console.log(data);`;
  };

  return (
    <div className="bg-gray-900/50 backdrop-blur-sm border border-gray-700/50 rounded-xl p-6">
      <div className="flex items-center space-x-2 mb-6">
        <Book className="w-5 h-5 text-cyan-400" />
        <h3 className="text-lg font-semibold text-white">API Documentation</h3>
      </div>

      {/* Endpoint Selection */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-2 mb-6">
        {endpoints.map((endpoint) => (
          <button
            key={endpoint.id}
            onClick={() => setSelectedEndpoint(endpoint.id)}
            className={`p-3 rounded-lg border text-left transition-all ${
              selectedEndpoint === endpoint.id
                ? 'border-cyan-500/50 bg-cyan-500/10'
                : 'border-gray-600/50 bg-gray-800/30 hover:border-gray-500/50'
            }`}
          >
            <div className={`text-xs font-medium mb-1 ${
              endpoint.method === 'GET' ? 'text-green-400' : 
              endpoint.method === 'POST' ? 'text-blue-400' : 'text-orange-400'
            }`}>
              {endpoint.method}
            </div>
            <div className="text-sm text-white">{endpoint.title}</div>
          </button>
        ))}
      </div>

      {/* Endpoint Details */}
      <div className="space-y-6">
        <div>
          <h4 className="text-white font-semibold mb-2">{selectedEndpointData.title}</h4>
          <p className="text-gray-400 text-sm mb-4">{selectedEndpointData.description}</p>
          <div className="flex items-center space-x-2">
            <span className={`px-2 py-1 rounded text-xs font-medium ${
              selectedEndpointData.method === 'GET' ? 'bg-green-500/20 text-green-400' :
              selectedEndpointData.method === 'POST' ? 'bg-blue-500/20 text-blue-400' : 
              'bg-orange-500/20 text-orange-400'
            }`}>
              {selectedEndpointData.method}
            </span>
            <code className="text-cyan-400 bg-gray-800/50 px-2 py-1 rounded text-sm">
              {selectedEndpointData.path}
            </code>
          </div>
        </div>

        {/* Code Examples */}
        <div className="space-y-4">
          <div>
            <div className="flex items-center justify-between mb-2">
              <h5 className="text-white font-medium">cURL</h5>
              <button
                onClick={() => copyCode(generateCurlCommand(selectedEndpointData), 'curl')}
                className="flex items-center space-x-1 text-gray-400 hover:text-white transition-colors"
              >
                {copiedCode === 'curl' ? (
                  <CheckCircle className="w-4 h-4 text-green-400" />
                ) : (
                  <Copy className="w-4 h-4" />
                )}
                <span className="text-sm">Copy</span>
              </button>
            </div>
            <pre className="bg-gray-800/50 border border-gray-700/30 rounded-lg p-4 overflow-x-auto">
              <code className="text-sm text-gray-300">
                {generateCurlCommand(selectedEndpointData)}
              </code>
            </pre>
          </div>

          <div>
            <div className="flex items-center justify-between mb-2">
              <h5 className="text-white font-medium">JavaScript</h5>
              <button
                onClick={() => copyCode(generateJSCode(selectedEndpointData), 'js')}
                className="flex items-center space-x-1 text-gray-400 hover:text-white transition-colors"
              >
                {copiedCode === 'js' ? (
                  <CheckCircle className="w-4 h-4 text-green-400" />
                ) : (
                  <Copy className="w-4 h-4" />
                )}
                <span className="text-sm">Copy</span>
              </button>
            </div>
            <pre className="bg-gray-800/50 border border-gray-700/30 rounded-lg p-4 overflow-x-auto">
              <code className="text-sm text-gray-300">
                {generateJSCode(selectedEndpointData)}
              </code>
            </pre>
          </div>

          {/* Response Example */}
          <div>
            <h5 className="text-white font-medium mb-2">Response</h5>
            <pre className="bg-gray-800/50 border border-gray-700/30 rounded-lg p-4 overflow-x-auto">
              <code className="text-sm text-gray-300">
                {JSON.stringify(selectedEndpointData.response, null, 2)}
              </code>
            </pre>
          </div>
        </div>
      </div>
    </div>
  );
}