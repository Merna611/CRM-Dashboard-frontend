import { useQuery } from '@apollo/client/react';
import { DASHBOARD_STATS_QUERY } from '../graphql/queries';
import { StatsCard } from '../components/Dashboard/StatsCard';
import { RevenueChart, PipelineChart } from '../components/Dashboard/RevenueChart';
import { ActivityFeed } from '../components/Dashboard/ActivityFeed';

interface DashboardStats {
  totalContacts: number;
  totalDeals: number;
  totalRevenue: number;
  wonDeals: number;
  conversionRate: number;
  pipelineByStage: { stage: string; count: number; value: number }[];
  revenueByMonth: { month: string; revenue: number; deals: number }[];
}

function formatCurrency(n: number) {
  if (n >= 1000000) return `$${(n / 1000000).toFixed(1)}M`;
  if (n >= 1000) return `$${(n / 1000).toFixed(0)}K`;
  return `$${n.toLocaleString()}`;
}

export function DashboardPage() {
  const { data, loading } = useQuery<{ dashboardStats: DashboardStats }>(DASHBOARD_STATS_QUERY);
  const stats = data?.dashboardStats;

  return (
    <div className="space-y-6">
      <div className="grid grid-cols-2 xl:grid-cols-4 gap-4">
        <StatsCard
          title="Total Contacts"
          value={loading ? '—' : stats?.totalContacts?.toString() ?? '0'}
          color="bg-blue-50"
          icon={<svg className="w-6 h-6 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0z" /></svg>}
        />
        <StatsCard
          title="Active Deals"
          value={loading ? '—' : stats?.totalDeals?.toString() ?? '0'}
          color="bg-purple-50"
          icon={<svg className="w-6 h-6 text-purple-600" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" /></svg>}
        />
        <StatsCard
          title="Revenue Won"
          value={loading ? '—' : formatCurrency(stats?.totalRevenue ?? 0)}
          color="bg-emerald-50"
          icon={<svg className="w-6 h-6 text-emerald-600" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z" /></svg>}
        />
        <StatsCard
          title="Conversion Rate"
          value={loading ? '—' : `${stats?.conversionRate ?? 0}%`}
          color="bg-orange-50"
          icon={<svg className="w-6 h-6 text-orange-600" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7h8m0 0v8m0-8l-8 8-4-4-6 6" /></svg>}
        />
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <RevenueChart data={stats?.revenueByMonth ?? []} />
        <PipelineChart data={stats?.pipelineByStage ?? []} />
      </div>

      <ActivityFeed />
    </div>
  );
}
