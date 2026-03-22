import React from 'react';

export default function FormationCard({ Icon, titre, description }) {
  return (
    <div className="bg-white p-8 rounded-2xl shadow-md border-t-4 border-blue-800 hover:shadow-xl transition-shadow">
      <Icon className="text-blue-800 mb-4" size={40} />
      <h3 className="text-xl font-bold">{titre}</h3>
      <p className="text-gray-500 mt-2">{description}</p>
    </div>
  );
}