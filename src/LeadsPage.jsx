import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Search, Filter, MoreHorizontal, Plus, Table2, Download, Mail, Phone } from 'lucide-react';
import Sidebar from './Sidebar';
import LeadFormModal from './LeadFormModal';
import LeadPreviewModal from './LeadPreviewModel';

const LeadsPage = () => {
  const [isFormModalOpen, setIsFormModalOpen] = useState(false);
  const [isPreviewModalOpen, setIsPreviewModalOpen] = useState(false);
  const [selectedLead, setSelectedLead] = useState(null);
  const [leads, setLeads] = useState([]);
  const [user, setUser] = useState(null);

  useEffect(() => {
    // Fetch leads from the backend
    axios.get('http://localhost:5000/api/leads')
      .then(response => setLeads(response.data))
      .catch(error => console.error("Error fetching leads:", error));
  }, []);

  const handleAddLead = async (newLead) => {
    try {
      const response = await axios.post('http://localhost:5000/api/leads', newLead);
      setLeads(prevLeads => [...prevLeads, response.data]);
    } catch (error) {
      console.error("Error adding lead:", error);
    }
  };

  const handleUpdateLead = async (updatedLead) => {
    console.log("Updated lead data:", updatedLead); // Log the data to see if `_id` is present
    if (!updatedLead._id) {
      console.error("Error: Lead ID is undefined");
      return;
    }
    try {
      const response = await axios.put(`http://localhost:5000/api/leads/${updatedLead._id}`, updatedLead);
      setLeads(prevLeads => prevLeads.map(lead => lead._id === updatedLead._id ? response.data : lead));
    } catch (error) {
      console.error("Error updating lead:", error);
    }
  };
  

  const handleLeadClick = (lead) => {
    setSelectedLead(lead);
    setIsPreviewModalOpen(true);
  };

  return (
    <div className='flex min-h-screen bg-gray-50'>
      <Sidebar />
      <div className="min-h-screen bg-gray-50 p-6">
        {/* Header */}
        <div className="flex justify-between items-center mb-6">
          <h1 className="text-2xl font-semibold">Hello,{user ? user.name: "User"} </h1>
          <div className="flex items-center gap-4">
            <button className="p-2 rounded-full hover:bg-gray-100">
              <Table2 size={20} className="text-gray-600" />
            </button>
            <button className="p-2 rounded-full hover:bg-gray-100">
              <Download size={20} className="text-gray-600" />
            </button>
            <button 
              className="bg-blue-600 text-white px-4 py-2 rounded-lg flex items-center gap-2"
              onClick={() => setIsFormModalOpen(true)}
            >
              <Plus size={20} />
              New Lead
            </button>
          </div>
        </div>

        {/* Modals */}
        <LeadFormModal 
          isOpen={isFormModalOpen}
          onClose={() => setIsFormModalOpen(false)}
          onAddLead={handleAddLead}
        />

        {selectedLead && (
          <LeadPreviewModal
            isOpen={isPreviewModalOpen}
            onClose={() => {
              setIsPreviewModalOpen(false);
              setSelectedLead(null);
            }}
            lead={selectedLead}
            onUpdateLead={handleUpdateLead}
          />
        )}

        {/* Table */}
        <div className="bg-white rounded-lg p-4">
          <table className="w-full">
            <thead className="bg-gray-50">
              <tr>
                <th className="w-8 p-3"><input type="checkbox" className="rounded" /></th>
                <th className="text-left p-3 text-gray-600">Lead Name</th>
                <th className="text-left p-3 text-gray-600">Company Name</th>
                <th className="text-left p-3 text-gray-600">Title</th>
                <th className="text-left p-3 text-gray-600">Owner Name</th>
                <th className="text-left p-3 text-gray-600">Status</th>
                <th className="text-left p-3 text-gray-600">Source</th>
                <th className="text-left p-3 text-gray-600">Details</th>
              </tr>
            </thead>
            <tbody>
              {leads.map((lead) => (
                <tr 
                  key={lead._id} 
                  className="border-t border-gray-100 hover:bg-gray-50 cursor-pointer"
                  onClick={() => handleLeadClick(lead)}
                >
                  <td className="p-3" onClick={(e) => e.stopPropagation()}>
                    <input type="checkbox" className="rounded" />
                  </td>
                  <td className="p-3">{lead.name}</td>
                  <td className="p-3">{lead.company}</td>
                  <td className="p-3">{lead.title}</td>
                  <td className="p-3">{lead.owner}</td>
                  <td className="p-3">
                    <span className={`px-3 py-1 rounded-full text-sm ${
                      lead.status === 'CONTACTED' 
                        ? 'bg-blue-100 text-blue-600'
                        : lead.status === 'NEW'
                        ? 'bg-gray-100 text-gray-600'
                        : lead.status === 'QUALIFIED'
                        ? 'bg-green-100 text-green-600'
                        : 'bg-red-100 text-red-600'
                    }`}>
                      {lead.status}
                    </span>
                  </td>
                  <td className="p-3">{lead.source}</td>
                  <td className="p-3">
                    <div className="flex gap-2" onClick={(e) => e.stopPropagation()}>
                      <button className="p-1 rounded hover:bg-gray-100">
                        <Mail size={16} className="text-gray-600" />
                      </button>
                      <button className="p-1 rounded hover:bg-gray-100">
                        <Phone size={16} className="text-gray-600" />
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default LeadsPage;
