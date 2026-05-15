import { useState, type FormEvent, useEffect } from 'react';
import { useMutation, useQuery } from '@apollo/client/react';
import { Modal } from '../common/Modal';
import { CREATE_DEAL_MUTATION, UPDATE_DEAL_MUTATION } from '../../graphql/mutations';
import { DEALS_QUERY, CONTACTS_QUERY, USERS_QUERY } from '../../graphql/queries';

interface Deal {
  id: string;
  title: string;
  value: number;
  stage: string;
  probability: number;
  expectedClose?: string;
  contact: { id: string };
  assignedTo?: { id: string };
}

interface DealFormProps {
  open: boolean;
  onClose: () => void;
  deal?: Deal | null;
  defaultStage?: string;
}

interface ContactOption { id: string; name: string; company?: string }
interface UserOption { id: string; name: string }

const stages = ['LEAD', 'QUALIFIED', 'PROPOSAL', 'NEGOTIATION', 'CLOSED_WON', 'CLOSED_LOST'];

export function DealForm({ open, onClose, deal, defaultStage }: DealFormProps) {
  const { data: contactsData } = useQuery<{ contacts: ContactOption[] }>(CONTACTS_QUERY, { variables: {} });
  const { data: usersData } = useQuery<{ users: UserOption[] }>(USERS_QUERY);
  const [createDeal, { loading: creating }] = useMutation(CREATE_DEAL_MUTATION, { refetchQueries: [DEALS_QUERY] });
  const [updateDeal, { loading: updating }] = useMutation(UPDATE_DEAL_MUTATION, { refetchQueries: [DEALS_QUERY] });

  const [form, setForm] = useState({ title: '', value: '', stage: defaultStage ?? 'LEAD', probability: '10', expectedClose: '', contactId: '', assignedToId: '' });
  const [error, setError] = useState('');

  useEffect(() => {
    if (deal) {
      setForm({
        title: deal.title,
        value: deal.value.toString(),
        stage: deal.stage,
        probability: deal.probability.toString(),
        expectedClose: deal.expectedClose ? deal.expectedClose.split('T')[0] : '',
        contactId: deal.contact.id,
        assignedToId: deal.assignedTo?.id ?? '',
      });
    } else {
      setForm({ title: '', value: '', stage: defaultStage ?? 'LEAD', probability: '10', expectedClose: '', contactId: '', assignedToId: '' });
    }
  }, [deal, open, defaultStage]);

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    setError('');
    if (!form.contactId) { setError('Please select a contact'); return; }
    const input = {
      title: form.title,
      value: parseFloat(form.value),
      stage: form.stage,
      probability: parseInt(form.probability),
      expectedClose: form.expectedClose || undefined,
      contactId: form.contactId,
      assignedToId: form.assignedToId || undefined,
    };
    try {
      if (deal) {
        await updateDeal({ variables: { id: deal.id, input } });
      } else {
        await createDeal({ variables: { input } });
      }
      onClose();
    } catch (err: unknown) {
      setError(err instanceof Error ? err.message : 'Failed to save deal');
    }
  };

  const loading = creating || updating;

  return (
    <Modal open={open} onClose={onClose} title={deal ? 'Edit Deal' : 'Add Deal'}>
      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label className="label">Title *</label>
          <input className="input" value={form.title} onChange={e => setForm(f => ({ ...f, title: e.target.value }))} required placeholder="Acme Enterprise License" />
        </div>
        <div className="grid grid-cols-2 gap-4">
          <div>
            <label className="label">Value ($) *</label>
            <input className="input" type="number" min="0" step="100" value={form.value} onChange={e => setForm(f => ({ ...f, value: e.target.value }))} required />
          </div>
          <div>
            <label className="label">Probability (%)</label>
            <input className="input" type="number" min="0" max="100" value={form.probability} onChange={e => setForm(f => ({ ...f, probability: e.target.value }))} />
          </div>
          <div>
            <label className="label">Stage</label>
            <select className="input" value={form.stage} onChange={e => setForm(f => ({ ...f, stage: e.target.value }))}>
              {stages.map(s => <option key={s} value={s}>{s.replace('_', ' ')}</option>)}
            </select>
          </div>
          <div>
            <label className="label">Expected Close</label>
            <input className="input" type="date" value={form.expectedClose} onChange={e => setForm(f => ({ ...f, expectedClose: e.target.value }))} />
          </div>
        </div>
        <div>
          <label className="label">Contact *</label>
          <select className="input" value={form.contactId} onChange={e => setForm(f => ({ ...f, contactId: e.target.value }))} required>
            <option value="">Select a contact...</option>
            {contactsData?.contacts?.map((c) => (
              <option key={c.id} value={c.id}>{c.name}{c.company ? ` (${c.company})` : ''}</option>
            ))}
          </select>
        </div>
        <div>
          <label className="label">Assigned To</label>
          <select className="input" value={form.assignedToId} onChange={e => setForm(f => ({ ...f, assignedToId: e.target.value }))}>
            <option value="">Unassigned</option>
            {usersData?.users?.map((u) => <option key={u.id} value={u.id}>{u.name}</option>)}
          </select>
        </div>
        {error && <p className="text-sm text-red-600 bg-red-50 px-3 py-2 rounded-lg">{error}</p>}
        <div className="flex justify-end gap-3 pt-1">
          <button type="button" className="btn-secondary" onClick={onClose}>Cancel</button>
          <button type="submit" className="btn-primary" disabled={loading}>{loading ? 'Saving...' : deal ? 'Update' : 'Create'}</button>
        </div>
      </form>
    </Modal>
  );
}
