interface StatsCardProps {
  title: string;
  value: string;
  change?: string;
  positive?: boolean;
  icon: React.ReactNode;
  color: string;
}

export function StatsCard({ title, value, change, positive, icon, color }: StatsCardProps) {
  return (
    <div className="card">
      <div className="flex items-start justify-between">
        <div>
          <p className="text-sm text-gray-500 font-medium">{title}</p>
          <p className="text-2xl font-bold text-gray-900 mt-1">{value}</p>
          {change && (
            <p className={`text-xs mt-1 font-medium ${positive ? 'text-emerald-600' : 'text-red-500'}`}>
              {positive ? '↑' : '↓'} {change}
            </p>
          )}
        </div>
        <div className={`w-12 h-12 rounded-xl ${color} flex items-center justify-center`}>
          {icon}
        </div>
      </div>
    </div>
  );
}
