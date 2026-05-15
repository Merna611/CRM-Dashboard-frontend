import { useLocation } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';

const titles: Record<string, string> = {
  '/': 'Dashboard',
  '/contacts': 'Contacts',
  '/pipeline': 'Pipeline',
};

export function Header() {
  const { user, logout } = useAuth();
  const location = useLocation();

  const title = Object.entries(titles)
    .sort((a, b) => b[0].length - a[0].length)
    .find(([path]) => location.pathname === path || location.pathname.startsWith(path + '/'))?.[1] ?? 'CRM';

  return (
    <header className="h-16 bg-white border-b border-gray-200 flex items-center justify-between px-6 flex-shrink-0">
      <h1 className="text-lg font-semibold text-gray-900">{title}</h1>

      <div className="flex items-center gap-4">
        <div className="flex items-center gap-3">
          {user?.avatar ? (
            <img src={user.avatar} alt={user.name} className="w-8 h-8 rounded-full bg-gray-200" />
          ) : (
            <div className="w-8 h-8 rounded-full bg-blue-600 flex items-center justify-center text-white text-sm font-medium">
              {user?.name[0]}
            </div>
          )}
          <div className="hidden sm:block">
            <p className="text-sm font-medium text-gray-900">{user?.name}</p>
            <p className="text-xs text-gray-500 capitalize">{user?.role?.toLowerCase()}</p>
          </div>
        </div>
        <button
          onClick={logout}
          className="text-gray-400 hover:text-gray-600 transition-colors"
          title="Sign out"
        >
          <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1" />
          </svg>
        </button>
      </div>
    </header>
  );
}
