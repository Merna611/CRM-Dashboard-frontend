import { useState } from 'react';
import { useQuery, useMutation } from '@apollo/client/react';
import { Link } from 'react-router-dom';
import { CONTACTS_QUERY } from '../graphql/queries';
import { DELETE_CONTACT_MUTATION } from '../graphql/mutations';
import { ContactForm } from '../components/Contacts/ContactForm';
import { Badge, statusVariant } from '../components/common/Badge';

const statuses = ['', 'LEAD', 'PROSPECT', 'CUSTOMER', 'CHURNED'];

interface Contact {
  id: string;
  name: string;
  email: string;
  phone?: string;
  company?: string;
  status: string;
  tags: string[];
  notes?: string;
  deals?: { id: string }[];
  assignedTo?: { id: string; name: string; avatar?: string };
}

export function ContactsPage() {
  const [search, setSearch] = useState('');
  const [statusFilter, setStatusFilter] = useState('');
  const [showForm, setShowForm] = useState(false);
  const [editing, setEditing] = useState<Contact | null>(null);

  const { data, loading } = useQuery<{ contacts: Contact[] }>(CONTACTS_QUERY, {
    variables: { search: search || undefined, status: statusFilter || undefined },
  });

  const [deleteContact] = useMutation(DELETE_CONTACT_MUTATION, { refetchQueries: [CONTACTS_QUERY] });

  const handleDelete = async (id: string, name: string) => {
    if (!confirm(`Delete ${name}? This will also remove their deals and activities.`)) return;
    await deleteContact({ variables: { id } });
  };

  const contacts = data?.contacts ?? [];

  return (
    <div className="space-y-5">
      <div className="flex flex-col sm:flex-row gap-3 justify-between items-start sm:items-center">
        <div className="flex gap-3 flex-1">
          <div className="relative flex-1 max-w-sm">
            <svg className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
            </svg>
            <input className="input pl-9" placeholder="Search contacts..." value={search} onChange={e => setSearch(e.target.value)} />
          </div>
          <select className="input w-40" value={statusFilter} onChange={e => setStatusFilter(e.target.value)}>
            {statuses.map(s => <option key={s} value={s}>{s || 'All Status'}</option>)}
          </select>
        </div>
        <button className="btn-primary shrink-0" onClick={() => { setEditing(null); setShowForm(true); }}>
          <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" /></svg>
          Add Contact
        </button>
      </div>

      <div className="bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden">
        {loading ? (
          <div className="p-8 text-center text-gray-400">Loading contacts...</div>
        ) : contacts.length === 0 ? (
          <div className="p-8 text-center text-gray-400">No contacts found</div>
        ) : (
          <table className="w-full">
            <thead className="bg-gray-50 border-b border-gray-100">
              <tr>
                <th className="text-left px-6 py-3 text-xs font-medium text-gray-500 uppercase tracking-wider">Name</th>
                <th className="text-left px-6 py-3 text-xs font-medium text-gray-500 uppercase tracking-wider hidden md:table-cell">Company</th>
                <th className="text-left px-6 py-3 text-xs font-medium text-gray-500 uppercase tracking-wider">Status</th>
                <th className="text-left px-6 py-3 text-xs font-medium text-gray-500 uppercase tracking-wider hidden lg:table-cell">Assigned</th>
                <th className="text-left px-6 py-3 text-xs font-medium text-gray-500 uppercase tracking-wider hidden lg:table-cell">Deals</th>
                <th className="px-6 py-3"></th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-50">
              {contacts.map((c) => (
                <tr key={c.id} className="hover:bg-gray-50 transition-colors">
                  <td className="px-6 py-4">
                    <Link to={`/contacts/${c.id}`} className="block">
                      <p className="text-sm font-medium text-blue-600 hover:text-blue-700">{c.name}</p>
                      <p className="text-xs text-gray-400">{c.email}</p>
                    </Link>
                  </td>
                  <td className="px-6 py-4 text-sm text-gray-600 hidden md:table-cell">{c.company ?? '—'}</td>
                  <td className="px-6 py-4"><Badge label={c.status} variant={statusVariant[c.status]} /></td>
                  <td className="px-6 py-4 hidden lg:table-cell">
                    {c.assignedTo ? (
                      <div className="flex items-center gap-2">
                        {c.assignedTo.avatar
                          ? <img src={c.assignedTo.avatar} className="w-6 h-6 rounded-full" alt="" />
                          : <div className="w-6 h-6 rounded-full bg-blue-600 flex items-center justify-center text-white text-xs">{c.assignedTo.name[0]}</div>}
                        <span className="text-sm text-gray-600">{c.assignedTo.name}</span>
                      </div>
                    ) : <span className="text-sm text-gray-400">—</span>}
                  </td>
                  <td className="px-6 py-4 text-sm text-gray-600 hidden lg:table-cell">{c.deals?.length ?? 0}</td>
                  <td className="px-6 py-4">
                    <div className="flex items-center gap-2 justify-end">
                      <button onClick={() => { setEditing(c); setShowForm(true); }} className="text-gray-400 hover:text-blue-600 transition-colors">
                        <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z" /></svg>
                      </button>
                      <button onClick={() => handleDelete(c.id, c.name)} className="text-gray-400 hover:text-red-500 transition-colors">
                        <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" /></svg>
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        )}
      </div>

      <ContactForm open={showForm} onClose={() => { setShowForm(false); setEditing(null); }} contact={editing} />
    </div>
  );
}
