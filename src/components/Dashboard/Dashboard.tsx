import { QRCodeList } from './QRCodeList';
import { AnalyticsOverview } from './AnalyticsOverview';
import { RecentActivity } from './RecentActivity';
import { SecurityAlerts } from './SecurityAlerts';
import { useQRCodes } from '../../hooks/useQRCodes';

export function Dashboard() {
  const { qrCodes, analytics } = useQRCodes();

  return (
    <div className="min-h-screen bg-gray-950 py-8">
      <div className="container mx-auto px-6">
        <div className="max-w-7xl mx-auto">
          <div className="mb-8">
            <h2 className="text-3xl font-bold text-white mb-2">Dashboard</h2>
            <p className="text-gray-400">Monitor and manage your QR codes</p>
          </div>

          <div className="grid lg:grid-cols-12 gap-6">
            {/* Main Content */}
            <div className="lg:col-span-8 space-y-6">
              <AnalyticsOverview analytics={analytics} />
              <QRCodeList qrCodes={qrCodes} />
            </div>

            {/* Sidebar */}
            <div className="lg:col-span-4 space-y-6">
              <SecurityAlerts qrCodes={qrCodes} />
              <RecentActivity qrCodes={qrCodes} />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}