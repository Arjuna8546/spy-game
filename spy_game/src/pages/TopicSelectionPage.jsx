import React, { useContext } from 'react';
import { PlayersContext } from '../context/context';
import { useNavigate } from 'react-router-dom';

function TopicSelectionPage() {
  const { players, topics, setRandomFood, setRandomTheif } = useContext(PlayersContext);
  const navigate = useNavigate();

  const onselect = (name) => {
    const randomItem = topics[name][Math.floor(Math.random() * topics[name].length)];
    setRandomFood(randomItem);
    const randomPlayer = players[Math.floor(Math.random() * players.length)];
    setRandomTheif(randomPlayer);
    navigate('/players');
  };

  return (
    <div className="min-h-screen bg-gray-900 bg-opacity-95 backdrop-blur-md flex flex-col items-center justify-center p-6 relative overflow-hidden">
      {/* Title */}
      <h1 className="text-4xl md:text-5xl font-bold text-white drop-shadow-lg mb-10 tracking-wider animate-pulse">
        <span className="text-blue-500">MISSION</span> BRIEFING
      </h1>

      {/* Topics List */}
      <div className="w-full max-w-md bg-gray-800 bg-opacity-80 p-6 rounded-lg shadow-xl border border-gray-700 space-y-4">
        <h2 className="text-xl text-gray-300 mb-4">Select Your Objective:</h2>
        {Object.keys(topics).length > 0 ? (
          Object.keys(topics).map((name) => (
            <p
              key={name}
              onClick={() => onselect(name)}
              className="p-3 bg-gray-700 bg-opacity-60 text-white rounded-md shadow-sm hover:bg-blue-600 hover:text-white cursor-pointer transition-all duration-200"
            >
              {name}
            </p>
          ))
        ) : (
          <p className="text-gray-400 italic">No missions available...</p>
        )}
      </div>

      {/* Decorative Background Elements */}
      <div className="absolute inset-0 -z-10 overflow-hidden">
        <div className="w-full h-full bg-gradient-to-br from-gray-900 via-black to-gray-800 opacity-50"></div>
        <div className="absolute top-0 left-0 w-64 h-64 bg-blue-500 rounded-full filter blur-3xl opacity-10 animate-pulse"></div>
        <div className="absolute bottom-0 right-0 w-96 h-96 bg-red-500 rounded-full filter blur-3xl opacity-10 animate-pulse"></div>
      </div>
    </div>
  );
}

export default TopicSelectionPage;