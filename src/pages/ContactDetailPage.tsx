import { useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import { useQuery, useMutation } from '@apollo/client/react';
import { CONTACT_QUERY } from '../graphql/queries';
import { ADD_ACTIVITY_MUTATION } from '../graphql/mutations';
import { Badge, statusVariant, stageVariant } from '../components/common/Badge';
import { ContactForm } from '../components/Contacts/ContactForm';

const typeIcons: Record<string, string> = { CALL: '📞', EMAIL: '✉️', MEETING: '🤝', NOTE: '📝' };
const activityTypes = ['CALL', 'EMAIL', 'MEETING', 'NOTE'];

interface ActivityItem {
  id: string;
  type: string;
  description: string;
  createdAt: string;
  user: { name: string; avatar?: string };
}

interface DealItem {
  id: string;
  title: string;
  value: number;
  stage: string;
}

export function ContactDetailPage() {
  const { id } = useParams<{ id: string }>();
  interface ContactData { contact: { id: string; name: string; email: string; phone?: string; company?: string; status: string; tags: string[]; notes?: string; deals: DealItem[]; activities: ActivityItem[] } }
  const { data, loading } = useQuery<ContactData>(CONTACT_QUERY, { variables: { id } });
  const [showForm, setShowForm] = useState(false);
  const [actType, setActType] = useState('NOTE');
  const [actDesc, setActDesc] = useState('');
  const [addActivity] = useMutation(ADD_ACTIVITY_MUTATION, { refetchQueries: [{ query: CONTACT_QUERY, variables: { id } }] });

  const contact = data?.contact;

  const handleAddActivity = async () => {
    if (!actDesc.trim()) return;
    await addActivity({ variables: { input: { type: actType, description: actDesc, contactId: id } } });
    setActDesc('');
  };

  if (loading) return <div className="text-gray-400 p-8">Loading...</div>;
  if (!contact) return <div className="text-gray-400 p-8">Contact not found</div>;

  return (
    <div className="max-w-4xl mx-auto space-y-6">
      <div className="flex items-center gap-3">
        <Link to="/contacts" className="text-gray-400 hover:text-gray-600 transition-colors">
          <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" /></svg>
        </Link>
        <h2 className="text-lg font-semibold text-gray-900">{contact.name}</h2>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="lg:col-span-1 space-y-4">
          <div className="card">
            <div className="flex items-start justify-between mb-4">
              <div className="w-12 h-12 rounded-xl bg-blue-600 flex items-center justify-center text-white text-lg font-semibold">
                {contact.name[0]}
              </div>
              <button className="btn-secondary text-xs py-1" onClick={() => setShowForm(true)}>Edit</button>
            </div>
            <h3 className="font-semibold text-gray-900">{contact.name}</h3>
            {contact.company && <p className="text-sm text-gray-500">{contact.company}</p>}
            <div className="mt-3"><Badge label={contact.status} variant={statusVariant[contact.status]} /></div>

            <div className="mt-4 space-y-2">
              <div className="flex items-center gap-2 text-sm text-gray-600">
                <svg className="w-4 h-4 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" /></svg>
                {contact.email}
              </div>
              {contact.phone && (
                <div className="flex items-center gap-2 text-sm text-gray-600">
                  <svg className="w-4 h-4 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" /></svg>
                  {contact.phone}
                </div>
              )}
            </div>

            {(contact.tags as string[])?.length > 0 && (
              <div className="mt-4 flex flex-wrap gap-1">
                {(contact.tags as string[]).map((tag) => <Badge key={tag} label={tag} />)}
              </div>
            )}

            {contact.notes && (
              <div className="mt-4 pt-4 border-t border-gray-100">
                <p className="text-xs font-medium text-gray-500 mb-1">Notes</p>
                <p className="text-sm text-gray-600">{contact.notes}</p>
              </div>
            )}
          </div>

          {(contact.deals as DealItem[])?.length > 0 && (
            <div className="card">
              <h4 className="text-sm font-semibold text-gray-900 mb-3">Deals ({(contact.deals as DealItem[]).length})</h4>
              <div className="space-y-2">
                {(contact.deals as DealItem[]).map((d) => (
                  <div key={d.id} className="flex items-center justify-between">
                    <span className="text-sm text-gray-700 truncate">{d.title}</span>
                    <div className="flex items-center gap-2 ml-2 shrink-0">
                      <span className="text-sm font-medium text-gray-900">${d.value.toLocaleString()}</span>
                      <Badge label={d.stage.replace('_', ' ')} variant={stageVariant[d.stage]} />
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>

        <div className="lg:col-span-2 card space-y-4">
          <h4 className="text-sm font-semibold text-gray-900">Activity</h4>

          <div className="flex gap-2">
            <select className="input w-36 shrink-0" value={actType} onChange={e => setActType(e.target.value)}>
              {activityTypes.map(t => <option key={t} value={t}>{t}</option>)}
            </select>
            <input className="input flex-1" placeholder="Add a note, log a call..." value={actDesc} onChange={e => setActDesc(e.target.value)} onKeyDown={e => e.key === 'Enter' && handleAddActivity()} />
            <button className="btn-primary shrink-0" onClick={handleAddActivity}>Log</button>
          </div>

          <div className="space-y-3 max-h-96 overflow-y-auto pr-1">
            {(contact.activities as ActivityItem[])?.length === 0 && <p className="text-sm text-gray-400 py-4 text-center">No activities yet</p>}
            {(contact.activities as ActivityItem[])?.map((a) => (
              <div key={a.id} className="flex items-start gap-3 p-3 bg-gray-50 rounded-lg">
                <span className="text-lg">{typeIcons[a.type]}</span>
                <div className="flex-1 min-w-0">
                  <p className="text-sm text-gray-800">{a.description}</p>
                  <p className="text-xs text-gray-400 mt-1">{a.user.name} · {new Date(a.createdAt).toLocaleDateString()}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      <ContactForm open={showForm} onClose={() => setShowForm(false)} contact={contact} />
    </div>
  );
}
