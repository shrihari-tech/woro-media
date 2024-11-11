const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const bodyParser = require('body-parser');
const authRoutes = require('./routes/Auth');

const app = express();

// Middleware
// app.use(cors());
app.use(cors({
  origin: 'http://localhost:5173', // Allow only this origin
  credentials: true // Allow credentials
}));

app.use(bodyParser.json());

// Routes
app.use('/api/auth', authRoutes);
app.use('/api/leads', require('./routes/Leads'));

// MongoDB Connection
mongoose.connect('mongodb://localhost:27017/loginSignupDB')
  .then(() => console.log('MongoDB connected'))
  .catch((err) => console.log('MongoDB connection error:', err));

// Start Server
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
