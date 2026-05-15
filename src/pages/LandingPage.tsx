import { Link } from 'react-router-dom';

const features = [
  {
    icon: (
      <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" />
      </svg>
    ),
    title: 'Visual Pipeline',
    desc: 'Drag-and-drop Kanban board across 6 stages. See every deal\'s value, probability, and owner at a glance.',
  },
  {
    icon: (
      <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0z" />
      </svg>
    ),
    title: 'Contact Management',
    desc: 'Searchable contact database with tags, status tracking, deal history, and full activity timelines.',
  },
  {
    icon: (
      <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M16 8v8m-4-5v5m-4-2v2m-2 4h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
      </svg>
    ),
    title: 'Live Analytics',
    desc: 'Revenue trends, pipeline breakdown by stage, conversion rates — all updated in real time.',
  },
  {
    icon: (
      <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M13 10V3L4 14h7v7l9-11h-7z" />
      </svg>
    ),
    title: 'Real-Time Collaboration',
    desc: 'GraphQL subscriptions push updates instantly. When a teammate moves a deal, everyone sees it live.',
  },
  {
    icon: (
      <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2m-3 7h3m-3 4h3m-6-4h.01M9 16h.01" />
      </svg>
    ),
    title: 'Activity Logging',
    desc: 'Log calls, emails, meetings, and notes against any contact or deal. Full history always at hand.',
  },
  {
    icon: (
      <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
      </svg>
    ),
    title: 'Role-Based Access',
    desc: 'Admins, Managers, and Members each get the right level of access. Secure JWT authentication.',
  },
];

const stats = [
  { value: '20+', label: 'Contacts tracked' },
  { value: '15', label: 'Deals in pipeline' },
  { value: '6', label: 'Pipeline stages' },
  { value: '100%', label: 'Real-time sync' },
];

export function LandingPage() {
  return (
    <div className="min-h-screen bg-white">
      {/* Nav */}
      <header className="fixed top-0 inset-x-0 z-50 bg-white/80 backdrop-blur-md border-b border-gray-100">
        <div className="max-w-6xl mx-auto px-6 h-16 flex items-center justify-between">
          <div className="flex items-center gap-2.5">
            <div className="w-8 h-8 bg-blue-600 rounded-lg flex items-center justify-center">
              <svg className="w-5 h-5 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0z" />
              </svg>
            </div>
            <span className="font-semibold text-gray-900">CRM Dashboard</span>
          </div>
          <div className="flex items-center gap-3">
            <Link to="/login" className="text-sm text-gray-600 hover:text-gray-900 font-medium transition-colors">
              Sign in
            </Link>
            <Link to="/login" className="btn-primary text-sm py-2">
              Get started free
            </Link>
          </div>
        </div>
      </header>

      {/* Hero */}
      <section className="pt-32 pb-20 px-6">
        <div className="max-w-4xl mx-auto text-center">
          <div className="inline-flex items-center gap-2 bg-blue-50 text-blue-700 text-xs font-semibold px-3 py-1.5 rounded-full mb-6">
            <span className="w-1.5 h-1.5 bg-blue-500 rounded-full animate-pulse" />
            Real-time collaboration · GraphQL · TypeScript
          </div>
          <h1 className="text-5xl sm:text-6xl font-bold text-gray-900 leading-tight tracking-tight">
            Close more deals with{' '}
            <span className="text-transparent bg-clip-text bg-linear-to-r from-blue-600 to-indigo-600">
              less friction
            </span>
          </h1>
          <p className="mt-6 text-xl text-gray-500 max-w-2xl mx-auto leading-relaxed">
            A full-stack CRM built on React, GraphQL, and PostgreSQL. Pipeline tracking, contact management, live analytics, and real-time team collaboration — all in one place.
          </p>
          <div className="mt-10 flex flex-col sm:flex-row items-center justify-center gap-4">
            <Link to="/login" className="btn-primary text-base px-6 py-3 w-full sm:w-auto justify-center">
              Start for free
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7l5 5m0 0l-5 5m5-5H6" />
              </svg>
            </Link>
            <Link to="/login" className="btn-secondary text-base px-6 py-3 w-full sm:w-auto justify-center">
              View demo
            </Link>
          </div>
          <p className="mt-4 text-sm text-gray-400">
            Demo: <code className="bg-gray-100 px-1.5 py-0.5 rounded text-xs">alice@crm.com</code> · password: <code className="bg-gray-100 px-1.5 py-0.5 rounded text-xs">password123</code>
          </p>
        </div>
      </section>

      {/* Dashboard preview */}
      <section className="px-6 pb-24">
        <div className="max-w-5xl mx-auto">
          <div className="bg-linear-to-b from-blue-50 to-indigo-50 rounded-2xl p-4 ring-1 ring-gray-200 shadow-xl">
            <div className="bg-gray-900 rounded-xl overflow-hidden">
              {/* Fake browser chrome */}
              <div className="flex items-center gap-2 px-4 py-3 bg-gray-800">
                <div className="w-3 h-3 rounded-full bg-red-500" />
                <div className="w-3 h-3 rounded-full bg-yellow-500" />
                <div className="w-3 h-3 rounded-full bg-green-500" />
                <div className="flex-1 mx-4 bg-gray-700 rounded-md h-6 flex items-center px-3">
                  <span className="text-gray-400 text-xs">localhost:5173</span>
                </div>
              </div>
              {/* Fake app screenshot */}
              <div className="flex h-64 bg-gray-50">
                {/* Sidebar */}
                <div className="w-48 bg-gray-900 flex flex-col p-3 gap-1">
                  {['Dashboard', 'Contacts', 'Pipeline'].map((item, i) => (
                    <div key={item} className={`flex items-center gap-2 px-3 py-2 rounded-lg text-xs font-medium ${i === 0 ? 'bg-blue-600 text-white' : 'text-gray-400'}`}>
                      <div className="w-3.5 h-3.5 bg-current rounded-sm opacity-60" />
                      {item}
                    </div>
                  ))}
                </div>
                {/* Main area */}
                <div className="flex-1 p-4 space-y-3">
                  <div className="grid grid-cols-4 gap-2">
                    {[
                      { label: 'Contacts', value: '20', color: 'bg-blue-500' },
                      { label: 'Deals', value: '15', color: 'bg-purple-500' },
                      { label: 'Revenue', value: '$543K', color: 'bg-emerald-500' },
                      { label: 'Win Rate', value: '26.7%', color: 'bg-orange-500' },
                    ].map(stat => (
                      <div key={stat.label} className="bg-white rounded-lg p-2 shadow-sm">
                        <p className="text-gray-400 text-xs">{stat.label}</p>
                        <p className="text-gray-900 font-bold text-sm">{stat.value}</p>
                        <div className={`mt-1 h-1 w-8 rounded-full ${stat.color}`} />
                      </div>
                    ))}
                  </div>
                  <div className="grid grid-cols-2 gap-2">
                    <div className="bg-white rounded-lg p-3 shadow-sm">
                      <p className="text-xs font-medium text-gray-600 mb-2">Revenue (6 months)</p>
                      <div className="flex items-end gap-1 h-16">
                        {[30, 55, 40, 70, 60, 85].map((h, i) => (
                          <div key={i} className="flex-1 bg-blue-500 rounded-t opacity-80" style={{ height: `${h}%` }} />
                        ))}
                      </div>
                    </div>
                    <div className="bg-white rounded-lg p-3 shadow-sm">
                      <p className="text-xs font-medium text-gray-600 mb-2">Pipeline by Stage</p>
                      <div className="flex items-end gap-1 h-16">
                        {[60, 80, 50, 40, 90, 20].map((h, i) => (
                          <div key={i} className={`flex-1 rounded-t opacity-80 ${['bg-gray-400','bg-blue-400','bg-indigo-500','bg-yellow-500','bg-emerald-500','bg-red-400'][i]}`} style={{ height: `${h}%` }} />
                        ))}
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Stats */}
      <section className="py-16 bg-gray-900">
        <div className="max-w-4xl mx-auto px-6">
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-8">
            {stats.map(s => (
              <div key={s.label} className="text-center">
                <p className="text-3xl font-bold text-white">{s.value}</p>
                <p className="mt-1 text-sm text-gray-400">{s.label}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Features */}
      <section className="py-24 px-6">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-3xl font-bold text-gray-900">Everything your team needs</h2>
            <p className="mt-4 text-lg text-gray-500">Built with modern tools. No bloat, no unnecessary abstractions.</p>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {features.map(f => (
              <div key={f.title} className="p-6 rounded-2xl border border-gray-100 hover:border-blue-200 hover:shadow-md transition-all group">
                <div className="w-10 h-10 bg-blue-50 text-blue-600 rounded-xl flex items-center justify-center group-hover:bg-blue-100 transition-colors">
                  {f.icon}
                </div>
                <h3 className="mt-4 font-semibold text-gray-900">{f.title}</h3>
                <p className="mt-2 text-sm text-gray-500 leading-relaxed">{f.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Tech stack */}
      <section className="py-16 bg-gray-50 px-6">
        <div className="max-w-4xl mx-auto text-center">
          <p className="text-sm font-medium text-gray-400 uppercase tracking-wider mb-8">Built with</p>
          <div className="flex flex-wrap justify-center gap-4">
            {['React 19', 'TypeScript', 'GraphQL', 'Apollo Client v4', 'Node.js', 'Prisma', 'PostgreSQL', 'Tailwind CSS v4', 'Recharts'].map(tech => (
              <span key={tech} className="px-4 py-2 bg-white border border-gray-200 rounded-full text-sm font-medium text-gray-700 shadow-sm">
                {tech}
              </span>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-24 px-6">
        <div className="max-w-2xl mx-auto text-center">
          <h2 className="text-3xl font-bold text-gray-900">Ready to try it?</h2>
          <p className="mt-4 text-gray-500">Sign in with a demo account or create your own. No credit card required.</p>
          <div className="mt-8 flex flex-col sm:flex-row items-center justify-center gap-4">
            <Link to="/login" className="btn-primary text-base px-8 py-3 w-full sm:w-auto justify-center">
              Get started free
            </Link>
            <Link to="/login" className="text-sm text-gray-500 hover:text-gray-700 transition-colors">
              Sign in to existing account →
            </Link>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="border-t border-gray-100 py-8 px-6">
        <div className="max-w-6xl mx-auto flex flex-col sm:flex-row items-center justify-between gap-4">
          <div className="flex items-center gap-2">
            <div className="w-6 h-6 bg-blue-600 rounded-md flex items-center justify-center">
              <svg className="w-3.5 h-3.5 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0z" />
              </svg>
            </div>
            <span className="text-sm font-medium text-gray-700">CRM Dashboard</span>
          </div>
          <p className="text-xs text-gray-400">Full-stack CRM · React · GraphQL · PostgreSQL</p>
        </div>
      </footer>
    </div>
  );
}
