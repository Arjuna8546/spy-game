import React, { useContext, useState, useRef } from "react";
import { PlayersContext } from "../context/context";
import axios from "axios";
import { useNavigate } from "react-router-dom";

function PlayersShowing() {
  const { players, randomFood, randomTheif } = useContext(PlayersContext);
  const [responses, setResponses] = useState([]);
  const {setHints} = useContext(PlayersContext)
  const navigate = useNavigate()

  const sendPrompt = async () => {
    const API_KEY = import.meta.env.VITE_GEMINI_API_KEY; // Secure API key
    const prompt = ` give hints to find this word ${randomFood} without mentioning this word as an array of questions i need 10 question`; // Example prompt

    try {
      const res = await axios.post(
        `https://generativelanguage.googleapis.com/v1beta/models/gemini-pro:generateContent?key=${API_KEY}`,
        {
          contents: [{ role: "user", parts: [{ text: prompt }] }],
        },
        {
          headers: {
            "Content-Type": "application/json",
          },
        }
      );

      const responseText = res.data.candidates[0].content.parts[0].text;
      const hintsArray = responseText.split("\n").filter((line) => line.trim() !== "");
      setHints(hintsArray); // Store responses in an array
      navigate("/hints")

    } catch (error) {
      console.error("Error fetching response:", error);
    }
  };

  const [eachUser, setEachUser] = useState(""); // Current player
  const [showData, setShowData] = useState(false); // Toggle data visibility
  const [showToast, setShowToast] = useState(false); // Toast visibility

  // Generator to yield players one by one
  function* eachPlayer() {
    for (let player of players) {
      yield player;
    }
  }

  const generatorRef = useRef(eachPlayer());

  const handleNextPlayer = () => {
    const { value, done } = generatorRef.current.next();

    if (!done) {
      setEachUser(value);  // Show player name
      setShowData(false);  // Hide data until "Show Data" is clicked
      setShowToast(false); // Hide toast if visible
    } else {
      setShowToast(true);  // Show toast notification
      setTimeout(() => {
        setShowToast(false); // Auto-hide toast after 3 seconds
        generatorRef.current = eachPlayer(); // Reset generator
        setEachUser("");
        setShowData(false);
      }, 3000); // 3-second delay
    }
  };

  const handleShowData = () => {
    if (eachUser) setShowData(true);  // Show data only if a player is selected
  };

  return (
    <div className="min-h-screen bg-gray-900 bg-opacity-95 backdrop-blur-md flex flex-col items-center justify-center p-6 relative overflow-hidden">
      {/* Inline Styles for Custom Animations */}
      <style>
        {`
          @keyframes slideInRight {
            0% { opacity: 0; transform: translateX(100%); }
            100% { opacity: 1; transform: translateX(0); }
          }
          @keyframes disappoint {
            0% { opacity: 0; transform: translateY(-10px) rotate(0deg); }
            20% { transform: translateY(5px) rotate(-2deg); }
            40% { transform: translateY(0) rotate(2deg); }
            60% { transform: translateY(3px) rotate(-1deg); }
            100% { opacity: 1; transform: translateY(0) rotate(0deg); }
          }
          @keyframes excite {
            0% { opacity: 0; transform: scale(0.8) translateY(10px); }
            50% { transform: scale(1.1) translateY(-5px); }
            80% { transform: scale(0.95) translateY(2px); }
            100% { opacity: 1; transform: scale(1) translateY(0); }
          }
          @keyframes cardFlip {
            0% { transform: perspective(800px) rotateY(0deg); }
            100% { transform: perspective(800px) rotateY(180deg); }
          }
          @keyframes cardFlipBack {
            0% { transform: perspective(800px) rotateY(180deg); }
            100% { transform: perspective(800px) rotateY(0deg); }
          }
          .card-container {
            position: relative;
            width: 100%;
            height: 100%;
            transform-style: preserve-3d;
          }
          .card-front, .card-back {
            backface-visibility: hidden;
            position: absolute;
            width: 100%;
            height: 100%;
            top: 0;
            left: 0;
            display: flex;
            align-items: center;
            justify-content: center;
          }
          .card-front {
            z-index: 2;
            transform: rotateY(0deg);
          }
          .card-back {
            transform: rotateY(180deg);
          }
          .animate-card-flip {
            animation: cardFlip 0.6s ease-out forwards;
          }
          .animate-card-flip-back {
            animation: cardFlipBack 0.6s ease-out forwards;
          }
          .animate-slide-in-right {
            animation: slideInRight 0.5s ease-out;
          }
          .animate-disappoint {
            animation: disappoint 0.6s ease-out;
          }
          .animate-excite {
            animation: excite 0.6s ease-out;
          }
        `}
      </style>

      {/* Title */}
      <h1 className="text-4xl md:text-5xl font-bold text-white drop-shadow-lg mb-10 tracking-wider animate-pulse">
        <span className="text-red-500">AGENT</span> DEBRIEFING
      </h1>

      {/* Player Card */}
      <div className="w-full max-w-md bg-gray-800 bg-opacity-80 p-6 rounded-lg shadow-xl border border-gray-700 flex flex-col items-center space-y-6">
        <p className="text-xl text-gray-300">Agent:</p>
        <div className="w-full h-36 perspective-800">
          {/* Card Container */}
          <div
            className={`card-container transition-all duration-300 transform hover:scale-105 ${
              showData ? "animate-card-flip" : "animate-card-flip-back"
            }`}
          >
            {/* Front of the Card */}
            <div className="card-front bg-gradient-to-br from-gray-700 to-gray-600 p-4 rounded-md shadow-md">
              <h2 className="text-2xl font-semibold text-white text-center">
                {eachUser || "No agent selected"}
              </h2>
            </div>
            {/* Back of the Card */}
            <div className="card-back bg-gradient-to-br from-gray-700 to-gray-600 p-4 rounded-md shadow-md">
              {eachUser && (
                <h3
                  className={`text-lg text-center font-medium ${
                    randomTheif === eachUser
                      ? "text-blue-400 animate-disappoint"
                      : "text-blue-400 animate-excite"
                  }`}
                >
                  {randomTheif === eachUser ? (
                    <span className="flex items-center justify-center space-x-2">
                      <span>😞</span>
                      <span>You are the Infiltrator!</span>
                    </span>
                  ) : (
                    <span className="flex items-center justify-center space-x-2">
                      <span>😊</span>
                      <span>Codename: {randomFood}</span>
                    </span>
                  )}
                </h3>
              )}
            </div>
          </div>
        </div>

        {/* Buttons */}
        <div className="flex space-x-4">
          <button
            onClick={handleNextPlayer}
            className="px-6 py-2 bg-blue-600 text-white font-semibold rounded-md hover:bg-blue-700 active:bg-blue-800 transition-all duration-200 shadow-md hover:shadow-lg"
          >
            Next Agent
          </button>
          <button
            onClick={handleShowData}
            disabled={!eachUser || showData}
            className={`px-6 py-2 font-semibold rounded-md transition-all duration-200 shadow-md hover:shadow-lg ${
              !eachUser || showData
                ? "bg-gray-600 text-gray-400 cursor-not-allowed"
                : "bg-red-600 text-white hover:bg-red-700 active:bg-red-800"
            }`}
          >
            Reveal Intel
          </button>
          <button onClick={()=>sendPrompt()}>Finish</button>
        </div>
      </div>

      {/* Toast Notification */}
      {showToast && (
        <div className="fixed top-4 right-4 z-50 animate-slide-in-right">
          <div className="bg-gray-800 bg-opacity-90 border border-red-500 text-white px-6 py-3 rounded-md shadow-lg flex items-center space-x-2">
            <span className="text-red-500 font-bold">⚠️</span>
            <p className="text-sm">No more agents! Debriefing complete...</p>
          </div>
        </div>
      )}

      {/* Decorative Background Elements */}
      <div className="absolute inset-0 -z-10 overflow-hidden">
        <div className="w-full h-full bg-gradient-to-br from-gray-900 via-black to-gray-800 opacity-50"></div>
        <div className="absolute top-0 left-0 w-64 h-64 bg-red-500 rounded-full filter blur-3xl opacity-10 animate-pulse"></div>
        <div className="absolute bottom-0 right-0 w-96 h-96 bg-blue-500 rounded-full filter blur-3xl opacity-10 animate-pulse"></div>
      </div>
    </div>
  );
}

export default PlayersShowing;