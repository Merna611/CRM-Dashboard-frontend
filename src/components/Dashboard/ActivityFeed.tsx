import { useQuery } from '@apollo/client/react';
import { ACTIVITIES_QUERY } from '../../graphql/queries';

const typeColors: Record<string, string> = {
  CALL: 'bg-green-100 text-green-700',
  EMAIL: 'bg-blue-100 text-blue-700',
  MEETING: 'bg-purple-100 text-purple-700',
  NOTE: 'bg-yellow-100 text-yellow-700',
};

const typeIcons: Record<string, string> = {
  CALL: '📞', EMAIL: '✉️', MEETING: '🤝', NOTE: '📝',
};

function timeAgo(dateStr: string): string {
  const ms = Date.now() - new Date(dateStr).getTime();
  const mins = Math.floor(ms / 60000);
  if (mins < 1) return 'just now';
  if (mins < 60) return `${mins}m ago`;
  const hrs = Math.floor(mins / 60);
  if (hrs < 24) return `${hrs}h ago`;
  return `${Math.floor(hrs / 24)}d ago`;
}

interface Activity {
  id: string;
  type: string;
  description: string;
  createdAt: string;
  user: { name: string; avatar?: string };
  contact?: { name: string; company?: string };
}

export function ActivityFeed() {
  const { data, loading } = useQuery<{ activities: Activity[] }>(ACTIVITIES_QUERY, { variables: { limit: 10 } });

  if (loading) return (
    <div className="card">
      <h3 className="text-sm font-semibold text-gray-900 mb-4">Recent Activity</h3>
      <div className="space-y-3 animate-pulse">
        {[...Array(5)].map((_, i) => <div key={i} className="h-12 bg-gray-100 rounded-lg" />)}
      </div>
    </div>
  );

  const activities = data?.activities ?? [];

  return (
    <div className="card">
      <h3 className="text-sm font-semibold text-gray-900 mb-4">Recent Activity</h3>
      {activities.length === 0 ? (
        <p className="text-sm text-gray-400 text-center py-8">No recent activity</p>
      ) : (
        <div className="space-y-3 max-h-80 overflow-y-auto pr-1">
          {activities.map((a) => (
            <div key={a.id} className="flex items-start gap-3">
              <span className="text-lg mt-0.5">{typeIcons[a.type]}</span>
              <div className="flex-1 min-w-0">
                <p className="text-sm text-gray-800 leading-snug">{a.description}</p>
                <div className="flex items-center gap-2 mt-1">
                  <span className={`text-xs px-2 py-0.5 rounded-full font-medium ${typeColors[a.type]}`}>{a.type}</span>
                  {a.contact && <span className="text-xs text-gray-400">{a.contact.name}</span>}
                  <span className="text-xs text-gray-400 ml-auto">{timeAgo(a.createdAt)}</span>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
