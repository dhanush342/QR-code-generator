import { Activity, Smartphone, Globe, MapPin } from 'lucide-react';
import { QRCodeData } from '../../types';

interface RecentActivityProps {
  qrCodes: QRCodeData[];
}

export function RecentActivity({ qrCodes }: RecentActivityProps) {
  // Get recent scans from all QR codes
  const recentScans = qrCodes
    .flatMap(qr => qr.scanHistory.map(scan => ({ ...scan, qrTitle: qr.title, qrId: qr.id })))
    .sort((a, b) => new Date(b.timestamp).getTime() - new Date(a.timestamp).getTime())
    .slice(0, 8);

  const getDeviceIcon = (deviceType: string) => {
    switch (deviceType) {
      case 'mobile': return Smartphone;
      case 'desktop': return Globe;
      default: return Activity;
    }
  };

  const formatTimeAgo = (timestamp: Date) => {
    const now = new Date();
    const diff = now.getTime() - new Date(timestamp).getTime();
    const minutes = Math.floor(diff / (1000 * 60));
    const hours = Math.floor(diff / (1000 * 60 * 60));
    const days = Math.floor(diff / (1000 * 60 * 60 * 24));

    if (minutes < 60) return `${minutes}m ago`;
    if (hours < 24) return `${hours}h ago`;
    return `${days}d ago`;
  };

  return (
    <div className="bg-gray-900/50 backdrop-blur-sm border border-gray-700/50 rounded-xl p-6">
      <div className="flex items-center space-x-2 mb-4">
        <Activity className="w-5 h-5 text-cyan-400" />
        <h3 className="text-lg font-semibold text-white">Recent Activity</h3>
      </div>

      <div className="space-y-3">
        {recentScans.length > 0 ? (
          recentScans.map((scan) => {
            const DeviceIcon = getDeviceIcon(scan.deviceType);
            return (
              <div key={scan.id} className="flex items-center space-x-3 p-3 bg-gray-800/30 rounded-lg border border-gray-700/30">
                <div className={`p-2 rounded-lg ${
                  scan.suspicious ? 'bg-red-500/20' : 'bg-cyan-500/20'
                }`}>
                  <DeviceIcon className={`w-4 h-4 ${
                    scan.suspicious ? 'text-red-400' : 'text-cyan-400'
                  }`} />
                </div>
                
                <div className="flex-1 min-w-0">
                  <div className="flex items-center justify-between mb-1">
                    <h4 className="text-sm font-medium text-white truncate">{scan.qrTitle}</h4>
                    <span className="text-xs text-gray-400">{formatTimeAgo(scan.timestamp)}</span>
                  </div>
                  
                  <div className="flex items-center space-x-2 text-xs text-gray-400">
                    <span className="capitalize">{scan.deviceType}</span>
                    {scan.location && (
                      <>
                        <span>•</span>
                        <div className="flex items-center space-x-1">
                          <MapPin className="w-3 h-3" />
                          <span>Location tracked</span>
                        </div>
                      </>
                    )}
                    {scan.suspicious && (
                      <>
                        <span>•</span>
                        <span className="text-red-400 font-medium">Suspicious</span>
                      </>
                    )}
                  </div>
                </div>
                
                {scan.fraudScore > 50 && (
                  <div className="text-xs text-red-400 font-mono">
                    {Math.round(scan.fraudScore)}%
                  </div>
                )}
              </div>
            );
          })
        ) : (
          <div className="text-center py-8 text-gray-500">
            <Activity className="w-12 h-12 mx-auto mb-3 opacity-50" />
            <p>No recent activity</p>
            <p className="text-sm mt-1">Scan activity will appear here</p>
          </div>
        )}
      </div>

      {recentScans.length > 0 && (
        <div className="mt-4 pt-4 border-t border-gray-700/30">
          <button className="w-full text-sm text-cyan-400 hover:text-cyan-300 transition-colors">
            View All Activity →
          </button>
        </div>
      )}
    </div>
  );
}