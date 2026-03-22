import React from 'react';

export default function Navbar() {
  return (
    <nav className="flex justify-between items-center p-6 border-b shadow-sm bg-white sticky top-0 z-50">
      <div className="text-2xl font-black text-blue-800">CG ACADEMY</div>
      <div className="hidden md:flex gap-8 font-medium text-gray-600">
        <a href="#" className="hover:text-blue-800 transition-colors">Formations</a>
        <a href="#" className="hover:text-blue-800 transition-colors">Diplômes RNCP</a>
        <a href="#" className="hover:text-blue-800 transition-colors">Contact</a>
      </div>
      <button className="bg-blue-800 text-white px-6 py-2 rounded-full font-bold hover:bg-blue-900 transition-all">
        Espace Candidat
      </button>
    </nav>
  );
}