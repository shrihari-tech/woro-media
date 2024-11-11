import React from 'react';

const LeadKanbanView = ({ leads, onStatusChange }) => {
  const statuses = ['new', 'open', 'follow-up', 'won', 'lost', 'junk'];

  return (
    <div className="kanban-board">
      {statuses.map((status) => (
        <div key={status} className="kanban-column">
          <h3>{status}</h3>
          {leads.filter((lead) => lead.leadStatus === status).map((lead) => (
            <div key={lead.id} className="kanban-card">
              <p>{lead.name}</p>
              <p>{lead.contactInfo}</p>
              <p>{lead.serviceRequested}</p>
              <button onClick={() => onStatusChange(lead.id, status)}>Change Status</button>
            </div>
          ))}
        </div>
      ))}
    </div>
  );
};

export default LeadKanbanView;