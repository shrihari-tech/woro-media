import React, {useState, useEffect} from 'react';
import { BarChart, Bar, XAxis, YAxis, ResponsiveContainer } from 'recharts';
import { Settings, HelpCircle, ChevronDown, Bell, Search, Users, FileText, DollarSign, PieChart, Mail, Briefcase, Database, Image, Menu } from 'lucide-react';
import {useNavigate} from 'react-router-dom';
import Sidebar from './Sidebar';
import axios from 'axios';
const performanceData = [
  { name: 'Week 1', value: 65 },
  { name: 'Week 2', value: 80 },
  { name: 'Week 3', value: 70 },
  { name: 'Week 4', value: 60 },
  { name: 'Week 5', value: 90 },
  { name: 'Week 6', value: 75 },
  { name: 'Week 7', value: 55 },
];

const DashboardHome = () => {
    const [leads, setLeads] = useState([]);
    const [selectedLead, setSelectedLead] = useState(null);
    const [view, setView] = useState('list'); 
    const [user, setUser] = useState(null);

    useEffect(() => {
      fetchLeads();
    }, []);
  
    const fetchLeads = async () => {
      try {
        const response = await axios.get('http://localhost:5000/api/leads');
        setLeads(response.data);
      } catch (error) {
        console.error('Error fetching leads:', error);
      }
    };
  
  return (
    <div className="flex min-h-screen bg-gray-50">
      {/* Sidebar */}
      <Sidebar />

      {/* Main Content */}
      <div className="flex-1 p-8">
        {/* Header */}
        <div className="flex justify-between items-center mb-8">
          <div>
            <h1 className="text-2xl font-semibold">Hello, {user ? user.name: "User"}</h1>
            <p className="text-gray-500">Here's your summary today</p>
          </div>
          <div className="flex items-center gap-4">
            <div className="relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={20} />
              <input
                type="text"
                placeholder="Search"
                className="pl-10 pr-4 py-2 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>
            <button className="p-2 hover:bg-gray-100 rounded-lg">
              <Bell size={20} className="text-gray-600" />
            </button>
            <div className="w-10 h-10 bg-gray-200 rounded-full"></div>
          </div>
        </div>

        {/* Stats Grid */}
        <div className="grid grid-cols-4 gap-6 mb-8">
          <div className="bg-white p-6 rounded-xl border border-gray-200">
            <div className="flex justify-between items-center mb-4">
              <h3 className="text-gray-500">Total Leads</h3>
              <span className="text-green-500 text-sm">+5%</span>
            </div>
            <div className="text-2xl font-semibold">{leads.length}</div>
            <div className="text-sm text-gray-400">Update Oct 17, 2024</div>
          </div>
          
          <div className="bg-white p-6 rounded-xl border border-gray-200">
            <div className="flex justify-between items-center mb-4">
              <h3 className="text-gray-500">Customers</h3>
              <span className="text-green-500 text-sm">+2%</span>
            </div>
            <div className="text-2xl font-semibold">102</div>
            <div className="text-sm text-gray-400">Update Oct 17, 2024</div>
          </div>
          
          <div className="bg-white p-6 rounded-xl border border-gray-200">
            <div className="flex justify-between items-center mb-4">
              <h3 className="text-gray-500">Deals</h3>
              <span className="text-red-500 text-sm">-1%</span>
            </div>
            <div className="text-2xl font-semibold">25</div>
            <div className="text-sm text-gray-400">Update Oct 17, 2024</div>
          </div>
          
          <div className="bg-white p-6 rounded-xl border border-gray-200">
            <div className="flex justify-between items-center mb-4">
              <h3 className="text-gray-500">Partners commissions</h3>
              <span className="text-green-500 text-sm">+3%</span>
            </div>
            <div className="text-2xl font-semibold">65%</div>
            <div className="text-sm text-gray-400">Update Oct 17, 2024</div>
          </div>
        </div>

        {/* Team Schedule and Performance */}
        <div className="grid grid-cols-2 gap-6">
          <div className="bg-white p-6 rounded-xl border border-gray-200">
            <div className="flex justify-between items-center mb-6">
              <h3 className="font-semibold">Team Schedule</h3>
              <div className="flex gap-2">
                <button className="px-3 py-1 text-sm bg-gray-100 rounded-full">Day</button>
                <button className="px-3 py-1 text-sm text-gray-500">Week</button>
                <button className="px-3 py-1 text-sm text-gray-500">Month</button>
              </div>
            </div>
            
            <div className="space-y-4">
              <div className="bg-blue-500 text-white p-4 rounded-lg flex justify-between items-center">
                <span>Meeting</span>
                <span>50%</span>
              </div>
              <div className="bg-yellow-400 text-white p-4 rounded-lg flex justify-between items-center">
                <span>Meeting</span>
                <span>40%</span>
              </div>
              <div className="bg-teal-500 text-white p-4 rounded-lg flex justify-between items-center">
                <span>Meeting</span>
                <span>35%</span>
              </div>
            </div>
          </div>

          <div className="bg-white p-6 rounded-xl border border-gray-200">
            <div className="flex justify-between items-center mb-6">
              <h3 className="font-semibold">Team Performance</h3>
              <div className="flex gap-2">
                <button className="px-3 py-1 text-sm bg-gray-100 rounded-full">Day</button>
                <button className="px-3 py-1 text-sm text-gray-500">Week</button>
                <button className="px-3 py-1 text-sm text-gray-500">Month</button>
              </div>
            </div>
            
            <div className="h-64">
              <ResponsiveContainer width="100%" height="100%">
                <BarChart data={performanceData}>
                  <XAxis dataKey="name" />
                  <YAxis />
                  <Bar dataKey="value" fill="#818CF8" radius={[4, 4, 0, 0]} />
                </BarChart>
              </ResponsiveContainer>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default DashboardHome;