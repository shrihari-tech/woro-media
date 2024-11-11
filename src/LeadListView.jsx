import React from 'react';

const LeadListView = ({ leads, onEdit, onDelete }) => {
  return (
    <table>
      <thead>
        <tr>
          <th>Name</th>
          <th>Contact Info</th>
          <th>Service Requested</th>
          <th>Lead Source</th>
          <th>Lead Status</th>
          <th>Actions</th>
        </tr>
      </thead>
      <tbody>
        {leads.map((lead) => (
          <tr key={lead.id}>
            <td>{lead.name}</td>
            <td>{lead.contactInfo}</td>
            <td>{lead.serviceRequested}</td>
            <td>{lead.leadSource}</td>
            <td>{lead.leadStatus}</td>
            <td>
              <button onClick={() => onEdit(lead)}>Edit</button>
              <button onClick={() => onDelete(lead.id)}>Delete</button>
            </td>
          </tr>
        ))}
      </tbody>
    </table>
  );
};

export default LeadListView;