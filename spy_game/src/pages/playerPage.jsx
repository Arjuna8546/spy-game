import React from 'react';
import Players from '../component/playersAddArea';

function PlayerPage() {
  return (
    <div className="min-h-screen bg-gray-900 bg-opacity-95 backdrop-blur-md flex flex-col items-center justify-center p-6">
      {/* Title with spy-themed styling */}
      <h1 className="text-5xl md:text-6xl font-bold text-white drop-shadow-lg mb-10 tracking-wider animate-pulse">
        <span className="text-red-500">SPY</span> GAME
      </h1>

      {/* Players Component Area */}
      <div className="w-full max-w-2xl bg-gray-800 bg-opacity-80 p-6 rounded-lg shadow-xl border border-gray-700">
        <Players />
      </div>

      {/* Optional decorative elements */}
      <div className="absolute inset-0 -z-10 overflow-hidden">
        <div className="w-full h-full bg-gradient-to-br from-gray-900 via-black to-gray-800 opacity-50"></div>
        <div className="absolute top-0 left-0 w-64 h-64 bg-red-500 rounded-full filter blur-3xl opacity-10 animate-pulse"></div>
        <div className="absolute bottom-0 right-0 w-96 h-96 bg-blue-500 rounded-full filter blur-3xl opacity-10 animate-pulse"></div>
      </div>
    </div>
  );
}

export default PlayerPage;
