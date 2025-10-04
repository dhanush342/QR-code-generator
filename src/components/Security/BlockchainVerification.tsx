import React, { useState } from 'react';
import { Link, CheckCircle, Clock, AlertCircle } from 'lucide-react';

export function BlockchainVerification() {
  const [verifying, setVerifying] = useState(false);

  const blockchainRecords = [
    {
      id: 'block_001',
      qrId: 'qr_abc123',
      hash: '0x1a2b3c4d5e6f7g8h9i0j',
      confirmations: 12,
      timestamp: '2024-01-15T10:30:00Z',
      status: 'confirmed'
    },
    {
      id: 'block_002',
      qrId: 'qr_def456',
      hash: '0x9i8h7g6f5e4d3c2b1a0j',
      confirmations: 6,
      timestamp: '2024-01-15T11:15:00Z',
      status: 'pending'
    },
    {
      id: 'block_003',
      qrId: 'qr_ghi789',
      hash: '0x5e4d3c2b1a0j9i8h7g6f',
      confirmations: 25,
      timestamp: '2024-01-15T09:45:00Z',
      status: 'confirmed'
    }
  ];

  const handleVerify = () => {
    setVerifying(true);
    setTimeout(() => {
      setVerifying(false);
    }, 3000);
  };

  return (
    <div className="bg-gray-900/50 backdrop-blur-sm border border-gray-700/50 rounded-xl p-6">
      <div className="flex items-center space-x-2 mb-6">
        <Link className="w-5 h-5 text-purple-400" />
        <h3 className="text-lg font-semibold text-white">Blockchain Verification</h3>
      </div>

      <div className="space-y-4 mb-6">
        {blockchainRecords.map((record) => (
          <div key={record.id} className="bg-gray-800/30 border border-gray-700/30 rounded-lg p-4">
            <div className="flex items-center justify-between mb-2">
              <div className="flex items-center space-x-2">
                {record.status === 'confirmed' ? (
                  <CheckCircle className="w-4 h-4 text-green-400" />
                ) : record.status === 'pending' ? (
                  <Clock className="w-4 h-4 text-orange-400" />
                ) : (
                  <AlertCircle className="w-4 h-4 text-red-400" />
                )}
                <span className="text-sm text-white font-medium">
                  QR Code {record.qrId.slice(-6)}
                </span>
              </div>
              <span className={`text-xs px-2 py-1 rounded-full ${
                record.status === 'confirmed' 
                  ? 'bg-green-500/20 text-green-400' 
                  : 'bg-orange-500/20 text-orange-400'
              }`}>
                {record.confirmations} confirmations
              </span>
            </div>
            
            <div className="text-xs text-gray-400 font-mono mb-2">
              Hash: {record.hash}
            </div>
            
            <div className="flex items-center justify-between text-xs text-gray-500">
              <span>{new Date(record.timestamp).toLocaleString()}</span>
              <span className="capitalize">{record.status}</span>
            </div>
          </div>
        ))}
      </div>

      <div className="border-t border-gray-700/30 pt-4">
        <button
          onClick={handleVerify}
          disabled={verifying}
          className="w-full bg-gradient-to-r from-purple-600 to-pink-600 text-white py-3 px-6 rounded-lg font-semibold hover:shadow-lg hover:shadow-purple-500/25 transition-all duration-200 disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center space-x-2"
        >
          {verifying ? (
            <>
              <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
              <span>Verifying on Blockchain...</span>
            </>
          ) : (
            <>
              <Link className="w-4 h-4" />
              <span>Verify New QR Code</span>
            </>
          )}
        </button>
      </div>

      <div className="mt-4 p-3 bg-purple-500/10 border border-purple-500/20 rounded-lg">
        <div className="text-xs text-purple-400">
          <div className="font-semibold mb-1">Blockchain Stats</div>
          <div className="space-y-1">
            <div className="flex justify-between">
              <span>Network:</span>
              <span>Ethereum Mainnet</span>
            </div>
            <div className="flex justify-between">
              <span>Gas Price:</span>
              <span>15 gwei</span>
            </div>
            <div className="flex justify-between">
              <span>Avg Confirmation:</span>
              <span>2.5 minutes</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}