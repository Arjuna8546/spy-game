import React, { useContext, useState } from 'react';
import { PlayersContext } from '../context/context';
import { useNavigate } from 'react-router-dom';

function Players() {
  const [user, setUser] = useState('');
  const { players, setPlayers } = useContext(PlayersContext);
  const navigate = useNavigate();

  const addPlayerName = (e) => {
    setUser(e.target.value);
  };

  const addPlayerToList = () => {
    if (user.trim()) { // Prevent adding empty names
      setPlayers((prev) => [...prev, user]);
      setUser('');
    }
  };

  return (
    <div className="space-y-6">
      {/* Input and Add Button */}
      <div className="flex items-center space-x-4">
        <input
          type="text"
          value={user}
          name="playerName"
          onChange={(e) => addPlayerName(e)}
          placeholder="Enter Agent Name"
          className="w-full px-4 py-2 bg-gray-900 text-white border border-gray-700 rounded-md focus:outline-none focus:ring-2 focus:ring-red-500 placeholder-gray-500 transition-all duration-300"
        />
        <button
          onClick={addPlayerToList}
          className="px-6 py-2 bg-red-600 text-white font-semibold rounded-md hover:bg-red-700 active:bg-red-800 transition-all duration-200 shadow-md hover:shadow-lg"
        >
          ADD
        </button>
      </div>

      {/* Players List */}
      <div className="space-y-3 max-h-64 overflow-y-auto scrollbar-thin scrollbar-thumb-gray-700 scrollbar-track-gray-900">
        {players.length > 0 ? (
          players.map((per, index) => (
            <p
              key={index}
              className="p-3 bg-gray-700 bg-opacity-60 text-white rounded-md shadow-sm hover:bg-gray-600 transition-all duration-200"
            >
              Agent: {per}
            </p>
          ))
        ) : (
          <p className="text-gray-400 italic">No agents recruited yet...</p>
        )}
      </div>

      {/* Next Button */}
      <button
        onClick={() => navigate('/topic')}
        className="w-full px-6 py-3 bg-blue-600 text-white font-semibold rounded-md hover:bg-blue-700 active:bg-blue-800 transition-all duration-200 shadow-md hover:shadow-lg"
      >
        Proceed to Mission
      </button>
    </div>
  );
}

export default Players;