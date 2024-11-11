import React from 'react';

const LeadDetails = ({ lead, onSave }) => {
  const [formData, setFormData] = React.useState(lead);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    onSave(formData);
  };

  return (
    <form onSubmit={handleSubmit}>
      <input type="text" name="name" value={formData.name} onChange={handleChange} placeholder="Name" />
      <input type="text" name="contactInfo" value={formData.contactInfo} onChange={handleChange} placeholder="Contact Info" />
      <input type="text" name="serviceRequested" value={formData.serviceRequested} onChange={handleChange} placeholder="Service Requested" />
      <select name="leadSource" value={formData.leadSource} onChange={handleChange}>
        <option value="manual">Manual</option>
        <option value="website">Website</option>
        <option value="partner">Partner</option>
        <option value="ad">Ad</option>
      </select>
      <select name="leadStatus" value={formData.leadStatus} onChange={handleChange}>
        <option value="new">New</option>
        <option value="open">Open</option>
        <option value="follow-up">Follow-Up</option>
        <option value="won">Won</option>
        <option value="lost">Lost</option>
        <option value="junk">Junk</option>
      </select>
      <button type="submit">Save</button>
    </form>
  );
};

export default LeadDetails;