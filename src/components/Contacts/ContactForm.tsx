import { useState, type FormEvent, useEffect } from 'react';
import { useMutation, useQuery } from '@apollo/client/react';
import { Modal } from '../common/Modal';
import { CREATE_CONTACT_MUTATION, UPDATE_CONTACT_MUTATION } from '../../graphql/mutations';
import { CONTACTS_QUERY, USERS_QUERY } from '../../graphql/queries';

interface Contact {
  id: string;
  name: string;
  email: string;
  phone?: string;
  company?: string;
  status: string;
  tags: string[];
  notes?: string;
  assignedTo?: { id: string };
}

interface User { id: string; name: string }

interface ContactFormProps {
  open: boolean;
  onClose: () => void;
  contact?: Contact | null;
}

const statuses = ['LEAD', 'PROSPECT', 'CUSTOMER', 'CHURNED'];

export function ContactForm({ open, onClose, contact }: ContactFormProps) {
  const { data: usersData } = useQuery<{ users: User[] }>(USERS_QUERY);
  const [createContact, { loading: creating }] = useMutation(CREATE_CONTACT_MUTATION, { refetchQueries: [CONTACTS_QUERY] });
  const [updateContact, { loading: updating }] = useMutation(UPDATE_CONTACT_MUTATION, { refetchQueries: [CONTACTS_QUERY] });

  const [form, setForm] = useState({ name: '', email: '', phone: '', company: '', status: 'LEAD', tags: '', notes: '', assignedToId: '' });
  const [error, setError] = useState('');

  useEffect(() => {
    if (contact) {
      setForm({
        name: contact.name,
        email: contact.email,
        phone: contact.phone ?? '',
        company: contact.company ?? '',
        status: contact.status,
        tags: contact.tags.join(', '),
        notes: contact.notes ?? '',
        assignedToId: contact.assignedTo?.id ?? '',
      });
    } else {
      setForm({ name: '', email: '', phone: '', company: '', status: 'LEAD', tags: '', notes: '', assignedToId: '' });
    }
  }, [contact, open]);

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    setError('');
    const input = {
      name: form.name,
      email: form.email,
      phone: form.phone || undefined,
      company: form.company || undefined,
      status: form.status,
      tags: form.tags.split(',').map(t => t.trim()).filter(Boolean),
      notes: form.notes || undefined,
      assignedToId: form.assignedToId || undefined,
    };
    try {
      if (contact) {
        await updateContact({ variables: { id: contact.id, input } });
      } else {
        await createContact({ variables: { input } });
      }
      onClose();
    } catch (err: unknown) {
      setError(err instanceof Error ? err.message : 'Failed to save contact');
    }
  };

  const loading = creating || updating;

  return (
    <Modal open={open} onClose={onClose} title={contact ? 'Edit Contact' : 'Add Contact'}>
      <form onSubmit={handleSubmit} className="space-y-4">
        <div className="grid grid-cols-2 gap-4">
          <div>
            <label className="label">Name *</label>
            <input className="input" value={form.name} onChange={e => setForm(f => ({ ...f, name: e.target.value }))} required />
          </div>
          <div>
            <label className="label">Email *</label>
            <input className="input" type="email" value={form.email} onChange={e => setForm(f => ({ ...f, email: e.target.value }))} required />
          </div>
          <div>
            <label className="label">Phone</label>
            <input className="input" value={form.phone} onChange={e => setForm(f => ({ ...f, phone: e.target.value }))} />
          </div>
          <div>
            <label className="label">Company</label>
            <input className="input" value={form.company} onChange={e => setForm(f => ({ ...f, company: e.target.value }))} />
          </div>
          <div>
            <label className="label">Status</label>
            <select className="input" value={form.status} onChange={e => setForm(f => ({ ...f, status: e.target.value }))}>
              {statuses.map(s => <option key={s} value={s}>{s}</option>)}
            </select>
          </div>
          <div>
            <label className="label">Assigned To</label>
            <select className="input" value={form.assignedToId} onChange={e => setForm(f => ({ ...f, assignedToId: e.target.value }))}>
              <option value="">Unassigned</option>
              {usersData?.users?.map((u) => <option key={u.id} value={u.id}>{u.name}</option>)}
            </select>
          </div>
        </div>
        <div>
          <label className="label">Tags (comma separated)</label>
          <input className="input" value={form.tags} onChange={e => setForm(f => ({ ...f, tags: e.target.value }))} placeholder="enterprise, tech, vip" />
        </div>
        <div>
          <label className="label">Notes</label>
          <textarea className="input resize-none" rows={3} value={form.notes} onChange={e => setForm(f => ({ ...f, notes: e.target.value }))} />
        </div>
        {error && <p className="text-sm text-red-600 bg-red-50 px-3 py-2 rounded-lg">{error}</p>}
        <div className="flex justify-end gap-3 pt-1">
          <button type="button" className="btn-secondary" onClick={onClose}>Cancel</button>
          <button type="submit" className="btn-primary" disabled={loading}>{loading ? 'Saving...' : contact ? 'Update' : 'Create'}</button>
        </div>
      </form>
    </Modal>
  );
}
