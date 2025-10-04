import { useState } from 'react';
import { 
  Search, 
  MoreVertical, 
  Eye, 
  Edit, 
  Trash2, 
  Ban, 
  Download,
  Shield,
  Clock,
  Users,
  MapPin
} from 'lucide-react';
import { QRCodeData } from '../../types';
import { useQRCodes } from '../../hooks/useQRCodes';
import { generateQRCodeDataUrl } from '../../utils/security';

interface QRCodeListProps {
  qrCodes: QRCodeData[];
}

export function QRCodeList({ qrCodes }: QRCodeListProps) {
  const { deleteQRCode, revokeQRCode, simulateScan } = useQRCodes();
  const [searchTerm, setSearchTerm] = useState('');
  const [filterStatus, setFilterStatus] = useState('all');
  const [selectedQR, setSelectedQR] = useState<string | null>(null);

  const filteredQRCodes = qrCodes.filter(qr => {
    const matchesSearch = qr.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         qr.content.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesStatus = filterStatus === 'all' || qr.status === filterStatus;
    return matchesSearch && matchesStatus;
  });

  const handleDownload = (qr: QRCodeData) => {
    const imageUrl = generateQRCodeDataUrl(qr.content, qr.customization);
    const link = document.createElement('a');
    link.href = imageUrl;
    link.download = `${qr.title.replace(/\s+/g, '_')}.png`;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'active': return 'bg-green-500/20 text-green-400 border-green-500/30';
      case 'expired': return 'bg-orange-500/20 text-orange-400 border-orange-500/30';
      case 'revoked': return 'bg-red-500/20 text-red-400 border-red-500/30';
      case 'suspended': return 'bg-yellow-500/20 text-yellow-400 border-yellow-500/30';
      default: return 'bg-gray-500/20 text-gray-400 border-gray-500/30';
    }
  };

  return (
    <div className="bg-gray-900/50 backdrop-blur-sm border border-gray-700/50 rounded-xl p-6">
      <div className="flex items-center justify-between mb-6">
        <h3 className="text-lg font-semibold text-white">QR Codes</h3>
        <div className="flex items-center space-x-3">
          <div className="relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
            <input
              type="text"
              placeholder="Search QR codes..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="pl-10 pr-4 py-2 bg-gray-800/50 border border-gray-600/50 rounded-lg text-white placeholder-gray-400 focus:border-cyan-500/50 focus:ring-1 focus:ring-cyan-500/20 transition-all"
            />
          </div>
          <select
            value={filterStatus}
            onChange={(e) => setFilterStatus(e.target.value)}
            className="bg-gray-800/50 border border-gray-600/50 rounded-lg px-3 py-2 text-white focus:border-cyan-500/50 focus:ring-1 focus:ring-cyan-500/20 transition-all"
          >
            <option value="all">All Status</option>
            <option value="active">Active</option>
            <option value="expired">Expired</option>
            <option value="revoked">Revoked</option>
            <option value="suspended">Suspended</option>
          </select>
        </div>
      </div>

      <div className="space-y-3">
        {filteredQRCodes.map((qr) => (
          <div key={qr.id} className="bg-gray-800/30 border border-gray-700/30 rounded-lg p-4 hover:bg-gray-800/50 transition-all">
            <div className="flex items-center justify-between">
              <div className="flex items-center space-x-4">
                <div className="w-12 h-12 bg-white rounded-lg p-1 flex-shrink-0">
                  <img
                    src={generateQRCodeDataUrl(qr.content, qr.customization)}
                    alt="QR Preview"
                    className="w-full h-full object-contain"
                  />
                </div>
                
                <div className="flex-1 min-w-0">
                  <div className="flex items-center space-x-2 mb-1">
                    <h4 className="text-white font-medium truncate">{qr.title}</h4>
                    <span className={`px-2 py-1 rounded-full text-xs font-medium border ${getStatusColor(qr.status)}`}>
                      {qr.status}
                    </span>
                    {qr.encrypted && <Shield className="w-4 h-4 text-green-400" />}
                  </div>
                  
                  <div className="flex items-center space-x-4 text-sm text-gray-400">
                    <span className="capitalize">{qr.type}</span>
                    <span className="flex items-center space-x-1">
                      <Users className="w-3 h-3" />
                      <span>{qr.currentUsage} scans</span>
                    </span>
                    {qr.expiryDate && (
                      <span className="flex items-center space-x-1">
                        <Clock className="w-3 h-3" />
                        <span>{new Date(qr.expiryDate).toLocaleDateString()}</span>
                      </span>
                    )}
                    {qr.geoFencing && (
                      <span className="flex items-center space-x-1">
                        <MapPin className="w-3 h-3" />
                        <span>Geo-fenced</span>
                      </span>
                    )}
                  </div>
                </div>
              </div>

              <div className="flex items-center space-x-2">
                <button
                  onClick={() => simulateScan(qr.id)}
                  className="p-2 text-gray-400 hover:text-cyan-400 hover:bg-gray-700/50 rounded-lg transition-all"
                  title="Test Scan"
                >
                  <Eye className="w-4 h-4" />
                </button>
                
                <button
                  onClick={() => handleDownload(qr)}
                  className="p-2 text-gray-400 hover:text-green-400 hover:bg-gray-700/50 rounded-lg transition-all"
                  title="Download"
                >
                  <Download className="w-4 h-4" />
                </button>

                <div className="relative">
                  <button
                    onClick={() => setSelectedQR(selectedQR === qr.id ? null : qr.id)}
                    className="p-2 text-gray-400 hover:text-white hover:bg-gray-700/50 rounded-lg transition-all"
                  >
                    <MoreVertical className="w-4 h-4" />
                  </button>
                  
                  {selectedQR === qr.id && (
                    <div className="absolute right-0 top-full mt-2 w-48 bg-gray-800 border border-gray-700 rounded-lg shadow-xl z-10">
                      <div className="py-2">
                        <button
                          onClick={() => {
                            // Edit functionality would go here
                            setSelectedQR(null);
                          }}
                          className="w-full flex items-center space-x-2 px-4 py-2 text-left text-gray-300 hover:bg-gray-700/50 transition-all"
                        >
                          <Edit className="w-4 h-4" />
                          <span>Edit</span>
                        </button>
                        <button
                          onClick={() => {
                            revokeQRCode(qr.id);
                            setSelectedQR(null);
                          }}
                          className="w-full flex items-center space-x-2 px-4 py-2 text-left text-orange-400 hover:bg-gray-700/50 transition-all"
                        >
                          <Ban className="w-4 h-4" />
                          <span>Revoke</span>
                        </button>
                        <button
                          onClick={() => {
                            deleteQRCode(qr.id);
                            setSelectedQR(null);
                          }}
                          className="w-full flex items-center space-x-2 px-4 py-2 text-left text-red-400 hover:bg-gray-700/50 transition-all"
                        >
                          <Trash2 className="w-4 h-4" />
                          <span>Delete</span>
                        </button>
                      </div>
                    </div>
                  )}
                </div>
              </div>
            </div>
          </div>
        ))}
        
        {filteredQRCodes.length === 0 && (
          <div className="text-center py-12 text-gray-500">
            <div className="w-16 h-16 mx-auto mb-4 bg-gradient-to-br from-cyan-500 to-blue-600 rounded-lg flex items-center justify-center opacity-50">
              <div className="w-8 h-8 bg-white rounded-sm"></div>
            </div>
            <p>No QR codes found</p>
            <p className="text-sm mt-1">Try adjusting your search or filters</p>
          </div>
        )}
      </div>
    </div>
  );
}