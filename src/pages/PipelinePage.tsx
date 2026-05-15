import { useState } from 'react';
import { useQuery, useMutation, useSubscription } from '@apollo/client/react';
import { DragDropContext, Droppable, type DropResult } from '@hello-pangea/dnd';
import { DEALS_QUERY } from '../graphql/queries';
import { MOVE_DEAL_MUTATION, DELETE_DEAL_MUTATION } from '../graphql/mutations';
import { DealCard } from '../components/Pipeline/DealCard';
import { DealForm } from '../components/Pipeline/DealForm';
import { DEAL_MOVED_SUBSCRIPTION } from '../graphql/subscriptions';

const STAGES = [
  { id: 'LEAD', label: 'Lead', color: 'bg-gray-100', dot: 'bg-gray-400' },
  { id: 'QUALIFIED', label: 'Qualified', color: 'bg-blue-50', dot: 'bg-blue-400' },
  { id: 'PROPOSAL', label: 'Proposal', color: 'bg-indigo-50', dot: 'bg-indigo-500' },
  { id: 'NEGOTIATION', label: 'Negotiation', color: 'bg-yellow-50', dot: 'bg-yellow-500' },
  { id: 'CLOSED_WON', label: 'Won', color: 'bg-emerald-50', dot: 'bg-emerald-500' },
  { id: 'CLOSED_LOST', label: 'Lost', color: 'bg-red-50', dot: 'bg-red-400' },
];

interface Deal {
  id: string;
  title: string;
  value: number;
  stage: string;
  probability: number;
  expectedClose?: string;
  contact: { id: string; name: string; company?: string };
  assignedTo?: { id: string; name: string; avatar?: string };
}

export function PipelinePage() {
  const { data, loading } = useQuery<{ deals: Deal[] }>(DEALS_QUERY, { variables: {} });
  const [moveDeal] = useMutation(MOVE_DEAL_MUTATION);
  const [deleteDeal] = useMutation(DELETE_DEAL_MUTATION, { refetchQueries: [DEALS_QUERY] });
  const [showForm, setShowForm] = useState(false);
  const [editingDeal, setEditingDeal] = useState<Deal | null>(null);
  const [defaultStage, setDefaultStage] = useState('LEAD');

  useSubscription<{ dealMoved: Deal }>(DEAL_MOVED_SUBSCRIPTION, {
    onData: ({ client, data: subData }) => {
      const moved = subData.data?.dealMoved;
      if (!moved) return;
      const existing = client.readQuery<{ deals: Deal[] }>({ query: DEALS_QUERY, variables: {} });
      if (!existing) return;
      client.writeQuery({
        query: DEALS_QUERY,
        variables: {},
        data: {
          deals: existing.deals.map((d) =>
            d.id === moved.id ? { ...d, stage: moved.stage, probability: moved.probability } : d
          ),
        },
      });
    },
  });

  const deals = data?.deals ?? [];
  const dealsByStage = (stage: string) => deals.filter(d => d.stage === stage);

  const onDragEnd = async (result: DropResult) => {
    const { destination, draggableId } = result;
    if (!destination) return;
    const newStage = destination.droppableId;
    const deal = deals.find(d => d.id === draggableId);
    if (!deal || deal.stage === newStage) return;
    await moveDeal({
      variables: { id: draggableId, stage: newStage },
      optimisticResponse: { moveDeal: { ...deal, stage: newStage } },
    });
  };

  const handleDelete = async (id: string, title: string) => {
    if (!confirm(`Delete deal "${title}"?`)) return;
    await deleteDeal({ variables: { id } });
  };

  return (
    <div className="flex flex-col h-full">
      <div className="flex justify-end mb-4">
        <button className="btn-primary" onClick={() => { setEditingDeal(null); setDefaultStage('LEAD'); setShowForm(true); }}>
          <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" /></svg>
          Add Deal
        </button>
      </div>

      {loading ? (
        <div className="text-center text-gray-400 py-12">Loading pipeline...</div>
      ) : (
        <DragDropContext onDragEnd={onDragEnd}>
          <div className="flex gap-4 overflow-x-auto pb-4 flex-1">
            {STAGES.map(stage => {
              const stageDeals = dealsByStage(stage.id);
              const totalValue = stageDeals.reduce((sum, d) => sum + d.value, 0);

              return (
                <div key={stage.id} className="shrink-0 w-64">
                  <div className={`rounded-t-xl px-3 py-2.5 ${stage.color}`}>
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-2">
                        <div className={`w-2 h-2 rounded-full ${stage.dot}`} />
                        <span className="text-xs font-semibold text-gray-700">{stage.label}</span>
                        <span className="text-xs text-gray-400 bg-white px-1.5 py-0.5 rounded-full">{stageDeals.length}</span>
                      </div>
                      <button
                        onClick={() => { setEditingDeal(null); setDefaultStage(stage.id); setShowForm(true); }}
                        className="text-gray-400 hover:text-gray-600 transition-colors"
                      >
                        <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" /></svg>
                      </button>
                    </div>
                    <p className="text-xs text-gray-500 mt-1">${totalValue.toLocaleString()}</p>
                  </div>

                  <Droppable droppableId={stage.id}>
                    {(provided, snapshot) => (
                      <div
                        ref={provided.innerRef}
                        {...provided.droppableProps}
                        className={`min-h-32 p-2 rounded-b-xl space-y-2 transition-colors ${
                          snapshot.isDraggingOver ? 'bg-blue-50 border-2 border-blue-200 border-dashed' : 'bg-gray-50'
                        }`}
                      >
                        {stageDeals.map((deal, idx) => (
                          <DealCard
                            key={deal.id}
                            deal={deal}
                            index={idx}
                            onEdit={(d) => { setEditingDeal(d); setShowForm(true); }}
                            onDelete={handleDelete}
                          />
                        ))}
                        {provided.placeholder}
                        {stageDeals.length === 0 && !snapshot.isDraggingOver && (
                          <p className="text-xs text-gray-300 text-center py-4">Drop deals here</p>
                        )}
                      </div>
                    )}
                  </Droppable>
                </div>
              );
            })}
          </div>
        </DragDropContext>
      )}

      <DealForm
        open={showForm}
        onClose={() => { setShowForm(false); setEditingDeal(null); }}
        deal={editingDeal}
        defaultStage={defaultStage}
      />
    </div>
  );
}
