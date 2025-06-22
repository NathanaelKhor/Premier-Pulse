import React, { useState } from "react";
import { PlayerTrendChart } from "./ChartComponents";
import { getCountryName } from "../utils/countryUtils";
import "./PlayerComparison.css";

function PlayerComparison({ players }) {
  const [selectedPlayers, setSelectedPlayers] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [comparisonStats, setComparisonStats] = useState([
    "Goals",
    "Assists",
    "Expected Goals",
    "Expected Assists",
    "Matches",
  ]);

  // Filter players for search
  const filteredPlayers = players
    .filter(
      (player) =>
        player.name?.toLowerCase().includes(searchTerm.toLowerCase()) &&
        !selectedPlayers.find((p) => p.name === player.name)
    )
    .slice(0, 10); // Limit to 10 results

  // Add player to comparison
  const addPlayer = (player) => {
    if (selectedPlayers.length < 4) {
      // Max 4 players
      setSelectedPlayers([...selectedPlayers, player]);
      setSearchTerm("");
    }
  };

  // Remove player from comparison
  const removePlayer = (playerName) => {
    setSelectedPlayers(selectedPlayers.filter((p) => p.name !== playerName));
  };

  // Available stats for comparison
  const availableStats = [
    "Goals",
    "Assists",
    "Expected Goals",
    "Expected Assists",
    "Matches",
    "Starts",
    "Minutes Played",
    "Yellow Cards",
  ];

  // Toggle stat selection
  const toggleStat = (stat) => {
    if (comparisonStats.includes(stat)) {
      setComparisonStats(comparisonStats.filter((s) => s !== stat));
    } else {
      setComparisonStats([...comparisonStats, stat]);
    }
  };

  return (
    <div className="player-comparison">
      <h2>🔍 Player Comparison Tool</h2>

      {/* Player Search */}
      <div className="player-search">
        <input
          type="text"
          placeholder="Search players to compare..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className="comparison-search"
        />

        {searchTerm && (
          <div className="search-results">
            {filteredPlayers.map((player) => (
              <div
                key={player.name}
                className="search-result"
                onClick={() => addPlayer(player)}
              >
                <span className="player-name">{player.name}</span>
                <span className="player-team">{player.team}</span>
              </div>
            ))}
          </div>
        )}
      </div>

      {/* Selected Players */}
      {selectedPlayers.length > 0 && (
        <div className="selected-players">
          <h3>Selected Players ({selectedPlayers.length}/4)</h3>
          <div className="player-chips">
            {selectedPlayers.map((player) => (
              <div key={player.name} className="player-chip">
                <span>{player.name}</span>
                <button onClick={() => removePlayer(player.name)}>×</button>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Stat Selection */}
      {selectedPlayers.length > 0 && (
        <div className="stat-selection">
          <h3>Choose Stats to Compare</h3>
          <div className="stat-chips">
            {availableStats.map((stat) => (
              <button
                key={stat}
                className={`stat-chip ${
                  comparisonStats.includes(stat) ? "active" : ""
                }`}
                onClick={() => toggleStat(stat)}
              >
                {stat}
              </button>
            ))}
          </div>
        </div>
      )}

      {/* Comparison Results */}
      {selectedPlayers.length >= 2 && (
        <div className="comparison-results">
          <div className="comparison-table">
            <table>
              <thead>
                <tr>
                  <th>Player</th>
                  <th>Team</th>
                  {comparisonStats.map((stat) => (
                    <th key={stat}>{stat}</th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {selectedPlayers.map((player) => (
                  <tr key={player.name}>
                    <td className="player-name-cell">
                      <strong>{player.name}</strong>
                    </td>
                    <td>{player.team}</td>
                    {comparisonStats.map((stat) => (
                      <td key={stat} className="stat-cell">
                        {getStatValue(player, stat)}
                      </td>
                    ))}
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}
    </div>
  );
}

// Helper function to get stat values
function getStatValue(player, statName) {
  switch (statName) {
    case "Goals":
      return player.gls || 0;
    case "Assists":
      return player.ast || 0;
    case "Expected Goals":
      return (player.xg || 0).toFixed(1);
    case "Expected Assists":
      return (player.xag || 0).toFixed(1);
    case "Matches":
      return player.mp || 0;
    case "Starts":
      return player.starts || 0;
    case "Minutes Played":
      return player.min || 0;
    case "Yellow Cards":
      return player.crdy || 0;
    default:
      return 0;
  }
}

export default PlayerComparison;
