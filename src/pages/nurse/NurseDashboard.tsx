import React from 'react';
import { UserPlus } from 'lucide-react';

const NurseDashboard = () => {
  return (
    <div className="min-h-screen bg-gray-50 p-6">
      <div className="max-w-7xl mx-auto">
        <div className="flex items-center gap-3 mb-8">
          <UserPlus className="h-8 w-8 text-green-600" />
          <h1 className="text-3xl font-bold text-gray-900">Nurse Dashboard</h1>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          <div className="bg-white rounded-lg shadow p-6">
            <h2 className="text-xl font-semibold text-gray-800 mb-4">Patient Care</h2>
            <p className="text-gray-600">View and update patient care plans</p>
          </div>
          
          <div className="bg-white rounded-lg shadow p-6">
            <h2 className="text-xl font-semibold text-gray-800 mb-4">Appointments</h2>
            <p className="text-gray-600">Manage daily patient appointments</p>
          </div>
          
          <div className="bg-white rounded-lg shadow p-6">
            <h2 className="text-xl font-semibold text-gray-800 mb-4">Medical Records</h2>
            <p className="text-gray-600">Access and update patient records</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default NurseDashboard;