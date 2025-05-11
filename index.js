import React, { useState } from "react";

const categories = [
  { key: "useCase", label: "Token Utility & Use Case", weight: 0.2 },
  { key: "team", label: "Team & Transparency", weight: 0.1 },
  { key: "roadmap", label: "Roadmap & Dev Activity", weight: 0.1 },
  { key: "community", label: "Community Strength", weight: 0.1 },
  { key: "tokenomics", label: "Tokenomics", weight: 0.1 },
  { key: "sentiment", label: "Market Sentiment & Hype", weight: 0.1 },
  { key: "liquidity", label: "Liquidity & Listings", weight: 0.1 },
  { key: "partnerships", label: "Partnerships & Ecosystem", weight: 0.05 },
  { key: "funding", label: "Funding & Investors", weight: 0.1 },
];

export default function CPMeter() {
  const [scores, setScores] = useState(Object.fromEntries(categories.map(c => [c.key, 5])));
  const [redFlags, setRedFlags] = useState(0);
  const [finalScore, setFinalScore] = useState(null);

  const handleScoreChange = (key, value) => {
    setScores(prev => ({ ...prev, [key]: Number(value) }));
  };

  const calculateScore = () => {
    const total = categories.reduce(
      (sum, cat) => sum + scores[cat.key] * cat.weight,
      0
    );
    const penalty = redFlags * 1.5;
    setFinalScore(Math.max(0, Math.round(total * 10 - penalty)));
  };

  return (
    <div className="min-h-screen bg-black text-white p-6">
      <h1 className="text-3xl font-bold mb-6 text-center">Project Potential Meter (CPM)</h1>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {categories.map(cat => (
          <div key={cat.key} className="bg-gray-900 p-4 rounded-xl shadow">
            <label className="block mb-2">{cat.label}</label>
            <input
              type="range"
              min={0}
              max={10}
              value={scores[cat.key]}
              onChange={(e) => handleScoreChange(cat.key, e.target.value)}
              className="w-full"
            />
            <div className="text-right text-sm mt-1">{scores[cat.key]}</div>
          </div>
        ))}

        <div className="bg-gray-900 p-4 rounded-xl shadow md:col-span-2">
          <label className="block mb-2">Red Flags</label>
          <input
            type="range"
            min={0}
            max={10}
            value={redFlags}
            onChange={(e) => setRedFlags(Number(e.target.value))}
            className="w-full"
          />
          <div className="text-right text-sm mt-1">{redFlags}</div>
        </div>
      </div>

      <div className="text-center mt-6">
        <button onClick={calculateScore} className="bg-green-600 hover:bg-green-700 px-4 py-2 rounded text-white">
          Calculate Score
        </button>
        {finalScore !== null && (
          <div className="mt-6 text-2xl font-semibold">
            Score: {finalScore} / 100 — {finalScore >= 80 ? "Strong Hold" : finalScore >= 60 ? "Cautious Hold" : finalScore >= 40 ? "Watch Closely" : "Likely Sell"}
          </div>
        )}
      </div>
    </div>
  );
}