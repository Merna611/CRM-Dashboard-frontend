import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, BarChart, Bar } from 'recharts';

interface MonthlyRevenue {
  month: string;
  revenue: number;
  deals: number;
}

interface RevenueChartProps {
  data: MonthlyRevenue[];
}

const formatCurrency = (value: number) =>
  value >= 1000 ? `$${(value / 1000).toFixed(0)}k` : `$${value}`;

export function RevenueChart({ data }: RevenueChartProps) {
  return (
    <div className="card">
      <h3 className="text-sm font-semibold text-gray-900 mb-4">Revenue (Last 6 Months)</h3>
      <ResponsiveContainer width="100%" height={200}>
        <LineChart data={data} margin={{ top: 4, right: 16, left: 0, bottom: 0 }}>
          <CartesianGrid strokeDasharray="3 3" stroke="#f0f0f0" />
          <XAxis dataKey="month" tick={{ fontSize: 12, fill: '#6b7280' }} axisLine={false} tickLine={false} />
          <YAxis tickFormatter={formatCurrency} tick={{ fontSize: 12, fill: '#6b7280' }} axisLine={false} tickLine={false} />
          <Tooltip formatter={(value) => [`$${Number(value).toLocaleString()}`, 'Revenue']} />
          <Line type="monotone" dataKey="revenue" stroke="#2563eb" strokeWidth={2} dot={{ fill: '#2563eb', r: 3 }} activeDot={{ r: 5 }} />
        </LineChart>
      </ResponsiveContainer>
    </div>
  );
}

interface StageCount {
  stage: string;
  count: number;
  value: number;
}

interface PipelineChartProps {
  data: StageCount[];
}

const stageLabels: Record<string, string> = {
  LEAD: 'Lead',
  QUALIFIED: 'Qualified',
  PROPOSAL: 'Proposal',
  NEGOTIATION: 'Negotiation',
  CLOSED_WON: 'Won',
  CLOSED_LOST: 'Lost',
};

export function PipelineChart({ data }: PipelineChartProps) {
  const formatted = data.map(d => ({ ...d, label: stageLabels[d.stage] ?? d.stage }));

  return (
    <div className="card">
      <h3 className="text-sm font-semibold text-gray-900 mb-4">Pipeline by Stage</h3>
      <ResponsiveContainer width="100%" height={200}>
        <BarChart data={formatted} margin={{ top: 4, right: 16, left: 0, bottom: 0 }}>
          <CartesianGrid strokeDasharray="3 3" stroke="#f0f0f0" vertical={false} />
          <XAxis dataKey="label" tick={{ fontSize: 11, fill: '#6b7280' }} axisLine={false} tickLine={false} />
          <YAxis tick={{ fontSize: 12, fill: '#6b7280' }} axisLine={false} tickLine={false} />
          <Tooltip formatter={(value, name) => [name === 'value' ? `$${Number(value).toLocaleString()}` : value, name === 'value' ? 'Value' : 'Count']} />
          <Bar dataKey="count" fill="#2563eb" radius={[4, 4, 0, 0]} />
        </BarChart>
      </ResponsiveContainer>
    </div>
  );
}
