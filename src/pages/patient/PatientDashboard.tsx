import React from 'react';
import { Calendar } from 'lucide-react';

const PatientDashboard = () => {
  return (
    <div className="min-h-screen bg-gray-50 p-6">
      <div className="max-w-7xl mx-auto">
        <div className="flex items-center gap-3 mb-8">
          <Calendar className="h-8 w-8 text-purple-600" />
          <h1 className="text-3xl font-bold text-gray-900">Patient Dashboard</h1>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          <div className="bg-white rounded-lg shadow p-6">
            <h2 className="text-xl font-semibold text-gray-800 mb-4">My Appointments</h2>
            <p className="text-gray-600">View and schedule appointments</p>
          </div>
          
          <div className="bg-white rounded-lg shadow p-6">
            <h2 className="text-xl font-semibold text-gray-800 mb-4">Health Records</h2>
            <p className="text-gray-600">Access your medical history</p>
          </div>
          
          <div className="bg-white rounded-lg shadow p-6">
            <h2 className="text-xl font-semibold text-gray-800 mb-4">Medications</h2>
            <p className="text-gray-600">Track your prescriptions and medications</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PatientDashboard;