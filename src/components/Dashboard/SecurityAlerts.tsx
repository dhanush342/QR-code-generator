import { Shield, AlertTriangle, CheckCircle, Clock } from 'lucide-react';
import { QRCodeData } from '../../types';

interface SecurityAlertsProps {
  qrCodes: QRCodeData[];
}

export function SecurityAlerts({ qrCodes }: SecurityAlertsProps) {
  const alerts = [
    {
      id: 1,
      type: 'warning',
      title: 'Suspicious Scan Activity',
      message: 'Multiple failed authentication attempts detected',
      timestamp: '2 minutes ago',
      icon: AlertTriangle,
      color: 'text-orange-400'
    },
    {
      id: 2,
      type: 'info',
      title: 'QR Code Expiring Soon',
      message: 'Payment QR expires in 24 hours',
      timestamp: '1 hour ago',
      icon: Clock,
      color: 'text-blue-400'
    },
    {
      id: 3,
      type: 'success',
      title: 'Security Scan Complete',
      message: 'All QR codes passed security verification',
      timestamp: '3 hours ago',
      icon: CheckCircle,
      color: 'text-green-400'
    }
  ];

  const suspiciousScans = qrCodes.reduce((total, qr) => {
    return total + qr.scanHistory.filter(scan => scan.suspicious).length;
  }, 0);

  return (
    <div className="bg-gray-900/50 backdrop-blur-sm border border-gray-700/50 rounded-xl p-6">
      <div className="flex items-center space-x-2 mb-4">
        <Shield className="w-5 h-5 text-cyan-400" />
        <h3 className="text-lg font-semibold text-white">Security Alerts</h3>
        {suspiciousScans > 0 && (
          <span className="px-2 py-1 bg-red-500/20 text-red-400 text-xs rounded-full border border-red-500/30">
            {suspiciousScans} suspicious
          </span>
        )}
      </div>

      <div className="space-y-3">
        {alerts.map((alert) => {
          const Icon = alert.icon;
          return (
            <div key={alert.id} className="flex items-start space-x-3 p-3 bg-gray-800/30 rounded-lg border border-gray-700/30">
              <Icon className={`w-5 h-5 ${alert.color} flex-shrink-0 mt-0.5`} />
              <div className="flex-1 min-w-0">
                <div className="flex items-center justify-between mb-1">
                  <h4 className="text-sm font-medium text-white truncate">{alert.title}</h4>
                  <span className="text-xs text-gray-400">{alert.timestamp}</span>
                </div>
                <p className="text-sm text-gray-400">{alert.message}</p>
              </div>
            </div>
          );
        })}
      </div>

      <div className="mt-4 pt-4 border-t border-gray-700/30">
        <button className="w-full text-sm text-cyan-400 hover:text-cyan-300 transition-colors">
          View All Security Events →
        </button>
      </div>
    </div>
  );
}