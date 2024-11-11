import React, { useState } from 'react';
import { X, Phone, Mail, Share2, Calendar, Clock } from 'lucide-react';

const LeadPreviewModal = ({ isOpen, onClose, lead, onUpdateLead }) => {
  const [editedLead, setEditedLead] = useState(lead);
  const [activeTab, setActiveTab] = useState('info');
  
  if (!isOpen) return null;

  const handleStatusChange = (newStatus) => {
    const updatedLead = { ...editedLead, status: newStatus };
    setEditedLead(updatedLead);
    onUpdateLead(updatedLead);
  };

  const handleSave = () => {
    onUpdateLead(editedLead);
    onClose();
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-start justify-center pt-10 z-50 overflow-y-auto">
      <div className="bg-white rounded-lg w-full max-w-4xl mx-4 mb-10">
        {/* Header */}
        <div className="p-6 border-b">
          <div className="flex justify-between items-center mb-4">
            <div className="flex items-center gap-3">
              <button onClick={() => onClose()} className="text-gray-500 hover:text-gray-700">
                ← Lead preview
              </button>
              <button className="text-blue-600 font-medium">
                View full details →
              </button>
            </div>
            <button onClick={onClose} className="p-1 rounded-full hover:bg-gray-100">
              <X size={20} className="text-gray-500" />
            </button>
          </div>

          <div className="flex items-center justify-between">
            <div className="flex items-center gap-4">
              <div className="w-12 h-12 bg-gray-200 rounded-full overflow-hidden">
                {editedLead.avatar ? (
                  <img src={editedLead.avatar} alt={editedLead.name} className="w-full h-full object-cover" />
                ) : (
                  <div className="w-full h-full flex items-center justify-center bg-blue-600 text-white text-xl">
                    {editedLead.name.charAt(0)}
                  </div>
                )}
              </div>
              <div>
                <h2 className="text-xl font-semibold">{editedLead.name}</h2>
                <div className="flex items-center gap-3 text-gray-500 text-sm">
                  <a href={`mailto:${editedLead.email}`} className="hover:text-gray-700">
                    {editedLead.email}
                  </a>
                  <span>•</span>
                  <a href={`tel:${editedLead.mobile}`} className="hover:text-gray-700">
                    {editedLead.mobile}
                  </a>
                </div>
              </div>
            </div>
            <div className="flex gap-2">
              <button className="p-2 rounded-full hover:bg-gray-100">
                <Phone size={20} className="text-gray-600" />
              </button>
              <button className="p-2 rounded-full hover:bg-gray-100">
                <Mail size={20} className="text-gray-600" />
              </button>
              <button className="p-2 rounded-full hover:bg-gray-100">
                <Share2 size={20} className="text-gray-600" />
              </button>
            </div>
          </div>
        </div>

        {/* Lead Details */}
        <div className="p-6">
          <div className="grid grid-cols-4 gap-6 mb-8">
            <div>
              <label className="text-sm text-gray-500">Lead owner</label>
              <p className="font-medium">{editedLead.owner}</p>
            </div>
            <div>
              <label className="text-sm text-gray-500">Company Name</label>
              <p className="font-medium">{editedLead.company}</p>
            </div>
            <div>
              <label className="text-sm text-gray-500">Job Title</label>
              <p className="font-medium">{editedLead.title}</p>
            </div>
            <div>
              <label className="text-sm text-gray-500">Annual Revenue</label>
              <p className="font-medium">${editedLead.annualRevenue?.toLocaleString()}</p>
            </div>
          </div>

          {/* Status Buttons */}
          <div className="flex gap-3 mb-8">
            <button
              onClick={() => handleStatusChange('NEW')}
              className={`px-4 py-2 rounded-md ${
                editedLead.status === 'NEW' 
                  ? 'bg-blue-100 text-blue-600' 
                  : 'bg-gray-100 text-gray-600'
              }`}
            >
              New
            </button>
            <button
              onClick={() => handleStatusChange('CONTACTED')}
              className={`px-4 py-2 rounded-md ${
                editedLead.status === 'CONTACTED' 
                  ? 'bg-blue-100 text-blue-600' 
                  : 'bg-gray-100 text-gray-600'
              }`}
            >
              Contacted
            </button>
            <button
              onClick={() => handleStatusChange('QUALIFIED')}
              className={`px-4 py-2 rounded-md ${
                editedLead.status === 'QUALIFIED' 
                  ? 'bg-green-100 text-green-600' 
                  : 'bg-gray-100 text-gray-600'
              }`}
            >
              Qualified
            </button>
            <button
              onClick={() => handleStatusChange('CLOSED')}
              className={`px-4 py-2 rounded-md ${
                editedLead.status === 'CLOSED' 
                  ? 'bg-red-100 text-red-600' 
                  : 'bg-gray-100 text-gray-600'
              }`}
            >
              Closed
            </button>
          </div>

          {/* Activity Section */}
          <div className="border rounded-lg p-4 mb-6">
            <h3 className="font-medium mb-4">Upcoming Activity</h3>
            <div className="flex items-start gap-4 mb-4">
              <div className="w-8 h-8 bg-gray-200 rounded-full flex items-center justify-center">
                <Calendar size={16} className="text-gray-600" />
              </div>
              <div className="flex-1">
                <h4 className="font-medium mb-1">Prepare quote for {editedLead.name}</h4>
                <p className="text-gray-500 text-sm mb-3">
                  Review requirements and prepare initial quote for client review
                </p>
                <div className="flex items-center gap-4 text-sm">
                  <div className="flex items-center gap-1 text-gray-500">
                    <Clock size={14} />
                    <span>Submit by 5:00pm</span>
                  </div>
                  <div className="text-gray-500">•</div>
                  <div className="text-gray-500">High Priority</div>
                </div>
              </div>
              <button className="px-4 py-1 text-sm border border-gray-300 rounded-md hover:bg-gray-50">
                Join
              </button>
            </div>
          </div>

          {/* Notes Section */}
          <div>
            <h3 className="font-medium mb-4">Notes</h3>
            <textarea
              className="w-full h-32 p-3 border rounded-lg resize-none focus:outline-none focus:ring-2 focus:ring-blue-500"
              placeholder="Add notes about this lead..."
              value={editedLead.notes || ''}
              onChange={(e) => setEditedLead({ ...editedLead, notes: e.target.value })}
            />
          </div>
        </div>

        {/* Footer */}
        <div className="border-t p-4 flex justify-end gap-3">
          <button
            onClick={onClose}
            className="px-4 py-2 border border-gray-300 rounded-md hover:bg-gray-50"
          >
            Cancel
          </button>
          <button
            onClick={handleSave}
            className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700"
          >
            Save Changes
          </button>
        </div>
      </div>
    </div>
  );
};

export default LeadPreviewModal;