import { Draggable } from '@hello-pangea/dnd';

interface Deal {
  id: string;
  title: string;
  value: number;
  stage: string;
  probability: number;
  contact: { id: string; name: string; company?: string };
  assignedTo?: { id: string; name: string; avatar?: string };
}

interface DealCardProps {
  deal: Deal;
  index: number;
  onEdit: (deal: Deal) => void;
  onDelete: (id: string, title: string) => void;
}

export function DealCard({ deal, index, onEdit, onDelete }: DealCardProps) {
  return (
    <Draggable draggableId={deal.id} index={index}>
      {(provided, snapshot) => (
        <div
          ref={provided.innerRef}
          {...provided.draggableProps}
          {...provided.dragHandleProps}
          className={`bg-white border rounded-xl p-3 shadow-sm cursor-grab active:cursor-grabbing transition-shadow ${
            snapshot.isDragging ? 'shadow-lg ring-2 ring-blue-500 ring-opacity-50' : 'border-gray-100 hover:shadow-md'
          }`}
        >
          <div className="flex items-start justify-between gap-2">
            <p className="text-sm font-medium text-gray-900 leading-snug flex-1">{deal.title}</p>
            <div className="flex gap-1 flex-shrink-0 opacity-0 group-hover:opacity-100">
              <button
                onClick={e => { e.stopPropagation(); onEdit(deal); }}
                className="text-gray-300 hover:text-blue-500 transition-colors p-0.5"
              >
                <svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z" /></svg>
              </button>
              <button
                onClick={e => { e.stopPropagation(); onDelete(deal.id, deal.title); }}
                className="text-gray-300 hover:text-red-500 transition-colors p-0.5"
              >
                <svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" /></svg>
              </button>
            </div>
          </div>

          <p className="text-xs text-gray-400 mt-1">{deal.contact.name}{deal.contact.company ? ` · ${deal.contact.company}` : ''}</p>

          <div className="flex items-center justify-between mt-3">
            <span className="text-sm font-semibold text-gray-900">${deal.value.toLocaleString()}</span>
            <div className="flex items-center gap-2">
              <div className="flex items-center gap-1">
                <div className="w-16 bg-gray-100 rounded-full h-1.5">
                  <div
                    className="h-1.5 rounded-full bg-blue-500"
                    style={{ width: `${deal.probability}%` }}
                  />
                </div>
                <span className="text-xs text-gray-400">{deal.probability}%</span>
              </div>
              {deal.assignedTo && (
                deal.assignedTo.avatar
                  ? <img src={deal.assignedTo.avatar} className="w-5 h-5 rounded-full" alt="" title={deal.assignedTo.name} />
                  : <div className="w-5 h-5 rounded-full bg-blue-600 flex items-center justify-center text-white text-xs" title={deal.assignedTo.name}>{deal.assignedTo.name[0]}</div>
              )}
            </div>
          </div>
        </div>
      )}
    </Draggable>
  );
}
