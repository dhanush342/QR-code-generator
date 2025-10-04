import { BarChart3, Users, Shield, TrendingUp } from 'lucide-react';
import { AnalyticsData } from '../../types';

interface AnalyticsOverviewProps {
  analytics: AnalyticsData;
}

export function AnalyticsOverview({ analytics }: AnalyticsOverviewProps) {
  const stats = [
    {
      label: 'Total Scans',
      value: analytics.totalScans.toLocaleString(),
      icon: BarChart3,
      color: 'from-cyan-500 to-blue-600',
      change: '+12.5%'
    },
    {
      label: 'Unique Users',
      value: analytics.uniqueUsers.toLocaleString(),
      icon: Users,
      color: 'from-green-500 to-emerald-600',
      change: '+8.2%'
    },
    {
      label: 'Fraud Attempts',
      value: analytics.fraudAttempts.toString(),
      icon: Shield,
      color: 'from-red-500 to-pink-600',
      change: '-2.1%'
    },
    {
      label: 'Engagement',
      value: `${analytics.averageEngagement.toFixed(1)}%`,
      icon: TrendingUp,
      color: 'from-purple-500 to-violet-600',
      change: '+15.3%'
    }
  ];

  return (
    <div className="bg-gray-900/50 backdrop-blur-sm border border-gray-700/50 rounded-xl p-6">
      <div className="flex items-center justify-between mb-6">
        <h3 className="text-lg font-semibold text-white">Analytics Overview</h3>
        <select className="bg-gray-800/50 border border-gray-600/50 rounded-lg px-3 py-1 text-sm text-white">
          <option>Last 7 days</option>
          <option>Last 30 days</option>
          <option>Last 90 days</option>
        </select>
      </div>

      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        {stats.map((stat) => {
          const Icon = stat.icon;
          return (
            <div key={stat.label} className="bg-gray-800/50 border border-gray-700/30 rounded-lg p-4">
              <div className="flex items-center justify-between mb-2">
                <div className={`p-2 rounded-lg bg-gradient-to-r ${stat.color}`}>
                  <Icon className="w-4 h-4 text-white" />
                </div>
                <span className={`text-xs font-medium ${
                  stat.change.startsWith('+') ? 'text-green-400' : 'text-red-400'
                }`}>
                  {stat.change}
                </span>
              </div>
              <div className="text-2xl font-bold text-white mb-1">{stat.value}</div>
              <div className="text-xs text-gray-400">{stat.label}</div>
            </div>
          );
        })}
      </div>

      {/* Chart Placeholder */}
      <div className="mt-6 h-48 bg-gray-800/30 rounded-lg border border-gray-700/30 flex items-center justify-center">
        <div className="text-center text-gray-500">
          <BarChart3 className="w-12 h-12 mx-auto mb-2 opacity-50" />
          <p>Scan trends visualization</p>
          <p className="text-xs mt-1">Chart component would be implemented here</p>
        </div>
      </div>
    </div>
  );
}