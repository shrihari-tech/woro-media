const mongoose = require('mongoose');

const leadSchema = new mongoose.Schema({
  name: { type: String, required: false },
  email: { type: String, required: false, unique: false },
  mobile: { type: String, required: false },
  company: { type: String, required: false },
  title: { type: String, required: false },
  owner: { type: String, required: false },
  status: { type: String, required: false, enum: ['NEW', 'CONTACTED', 'QUALIFIED', 'LOST', 'JUNK'] },
  source: { type: String, required: false },
  annualRevenue: { type: Number, required: false },
  notes: { type: String, default: '' }
}, { timestamps: true });

module.exports = mongoose.model('Lead', leadSchema);
