import React, { useState } from "react";
import { PieChart, FileText, Users, DollarSign, Briefcase, Mail, Database, Image, Settings, HelpCircle, ChevronDown, Menu } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

const Sidebar = () => {
  const navigate = useNavigate();
  const [activeItem, setActiveItem] = useState("Dashboard"); // Initialize with "Dashboard" or any default item
  
  const handleNavigation = (path, itemName) => {
    setActiveItem(itemName);
    navigate(path);
  };

  return (
    <div className="w-64 bg-white border-r border-gray-200 p-4">
      <div className="flex items-center gap-2 mb-8">
        <div className="w-8 h-8 bg-blue-600 rounded-lg"></div>
        <span className="font-semibold text-lg">Honest Deal</span>
      </div>
      
      <nav className="space-y-2">
        <div
          className={`flex items-center gap-3 px-4 py-2 rounded-lg cursor-pointer ${
            activeItem === "Dashboard" ? "bg-blue-50 text-blue-600" : "text-gray-600 hover:bg-gray-50"
          }`}
          onClick={() => handleNavigation("/dashboard", "Dashboard")}
        >
          <PieChart size={20} />
          <span>Dashboard</span>
        </div>
        
        <div
          className={`flex items-center gap-3 px-4 py-2 rounded-lg cursor-pointer ${
            activeItem === "Leads" ? "bg-blue-50 text-blue-600" : "text-gray-600 hover:bg-gray-50"
          }`}
          onClick={() => handleNavigation("/leads", "Leads")}
        >
          <FileText size={20} />
          <span>Leads</span>
        </div>
        
        <div
          className={`flex items-center gap-3 px-4 py-2 rounded-lg cursor-pointer ${
            activeItem === "Customers" ? "bg-blue-50 text-blue-600" : "text-gray-600 hover:bg-gray-50"
          }`}
          onClick={() => setActiveItem("Customers")}
        >
          <Users size={20} />
          <span>Customers</span>
          <ChevronDown className="ml-auto" size={16} />
        </div>

        <div
          className={`flex items-center gap-3 px-4 py-2 rounded-lg cursor-pointer ${
            activeItem === "Deals" ? "bg-blue-50 text-blue-600" : "text-gray-600 hover:bg-gray-50"
          }`}
          onClick={() => setActiveItem("Deals")}
        >
          <DollarSign size={20} />
          <span>Deals</span>
          <ChevronDown className="ml-auto" size={16} />
        </div>
        
        <div
          className={`flex items-center gap-3 px-4 py-2 rounded-lg cursor-pointer ${
            activeItem === "Partners" ? "bg-blue-50 text-blue-600" : "text-gray-600 hover:bg-gray-50"
          }`}
          onClick={() => setActiveItem("Partners")}
        >
          <Briefcase size={20} />
          <span>Partners</span>
          <ChevronDown className="ml-auto" size={16} />
        </div>

        <div
          className={`flex items-center gap-3 px-4 py-2 rounded-lg cursor-pointer ${
            activeItem === "Mails" ? "bg-blue-50 text-blue-600" : "text-gray-600 hover:bg-gray-50"
          }`}
          onClick={() => setActiveItem("Mails")}
        >
          <Mail size={20} />
          <span>Mails</span>
        </div>

        <div
          className={`flex items-center gap-3 px-4 py-2 rounded-lg cursor-pointer ${
            activeItem === "Reports" ? "bg-blue-50 text-blue-600" : "text-gray-600 hover:bg-gray-50"
          }`}
          onClick={() => setActiveItem("Reports")}
        >
          <Database size={20} />
          <span>Reports & Analytics</span>
          <ChevronDown className="ml-auto" size={16} />
        </div>

        <div
          className={`flex items-center gap-3 px-4 py-2 rounded-lg cursor-pointer ${
            activeItem === "Integration" ? "bg-blue-50 text-blue-600" : "text-gray-600 hover:bg-gray-50"
          }`}
          onClick={() => setActiveItem("Integration")}
        >
          <Menu size={20} />
          <span>Integration</span>
        </div>

        <div
          className={`flex items-center gap-3 px-4 py-2 rounded-lg cursor-pointer ${
            activeItem === "Media Library" ? "bg-blue-50 text-blue-600" : "text-gray-600 hover:bg-gray-50"
          }`}
          onClick={() => setActiveItem("Media Library")}
        >
          <Image size={20} />
          <span>Media Library</span>
        </div>
      </nav>
      
      <div className="mt-8">
        <div className="text-sm font-semibold text-gray-400 mb-4">MANAGE</div>
        <div className="space-y-2">
          <div
            className={`flex items-center gap-3 px-4 py-2 rounded-lg cursor-pointer ${
              activeItem === "Settings" ? "bg-blue-50 text-blue-600" : "text-gray-600 hover:bg-gray-50"
            }`}
            onClick={() => setActiveItem("Settings")}
          >
            <Settings size={20} />
            <span>Settings</span>
          </div>
          <div
            className={`flex items-center gap-3 px-4 py-2 rounded-lg cursor-pointer ${
              activeItem === "Help" ? "bg-blue-50 text-blue-600" : "text-gray-600 hover:bg-gray-50"
            }`}
            onClick={() => setActiveItem("Help")}
          >
            <HelpCircle size={20} />
            <span>Help</span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Sidebar;
