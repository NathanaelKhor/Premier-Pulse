import React, { useState, useEffect } from "react";
import "./PlayersPage.css";

function PlayersPage() {
  const [players, setPlayers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchPlayers = async () => {
      try {
        const response = await fetch("/api/v1/player");
        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }
        const result = await response.json();
        setPlayers(result);
      } catch (err) {
        setError(err.message);
        console.error("Error fetching players:", err);
      } finally {
        setLoading(false);
      }
    };

    fetchPlayers();
  }, []);

  return (
    <div className="players-page">
      <div className="container">
        <h1>All Players</h1>

        {loading && <p className="loading">Loading players...</p>}
        {error && <p className="error">Unable to load players: {error}</p>}

        {!loading && !error && (
          <div className="players-grid">
            {players.length > 0 ? (
              players.map((player, index) => (
                <div key={index} className="player-card">
                  <div className="player-info">
                    <h3>{player.name || `Player ${index + 1}`}</h3>
                    <p className="position">
                      {player.pos || "Position not specified"}
                    </p>
                    <p className="team">
                      {player.team || "Team not specified"}
                    </p>
                  </div>
                </div>
              ))
            ) : (
              <p>No players found</p>
            )}
          </div>
        )}
      </div>
    </div>
  );
}

export default PlayersPage;
