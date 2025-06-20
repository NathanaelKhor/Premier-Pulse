import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import "./StatsPage.css";

function StatsPage() {
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

  // Calculate top scorers
  const topScorers = players
    .filter((p) => p.gls && p.gls > 0)
    .sort((a, b) => (b.gls || 0) - (a.gls || 0))
    .slice(0, 5);

  // Calculate top assisters
  const topAssisters = players
    .filter((p) => p.ast && p.ast > 0)
    .sort((a, b) => (b.ast || 0) - (a.ast || 0))
    .slice(0, 5);

  // Team statistics
  const teamStats = players.reduce((acc, player) => {
    if (!player.team) return acc;
    if (!acc[player.team]) {
      acc[player.team] = { goals: 0, players: 0 };
    }
    acc[player.team].goals += player.gls || 0;
    acc[player.team].players += 1;
    return acc;
  }, {});

  const topTeams = Object.entries(teamStats)
    .sort(([, a], [, b]) => b.goals - a.goals)
    .slice(0, 5);

  if (loading)
    return (
      <div className="stats-page">
        <div className="container">
          <p className="loading">Loading statistics...</p>
        </div>
      </div>
    );
  if (error)
    return (
      <div className="stats-page">
        <div className="container">
          <p className="error">Error loading statistics: {error}</p>
        </div>
      </div>
    );

  return (
    <div className="stats-page">
      <div className="container">
        <h1>Premier League Statistics</h1>
        <div className="stats-content">
          {/* Top Scorers */}
          <div className="stat-card">
            <h3>Top Scorers</h3>
            {topScorers.length > 0 ? (
              <div className="stat-list">
                {topScorers.map((player, index) => (
                  <div key={player.name} className="stat-item">
                    <span className="rank">{index + 1}.</span>
                    <Link
                      to={`/player/${encodeURIComponent(player.name)}`}
                      className="player-name-link"
                    >
                      <span className="player-name">{player.name}</span>
                    </Link>
                    <span className="stat-value">{player.gls} goals</span>
                  </div>
                ))}
              </div>
            ) : (
              <p>No scoring data available</p>
            )}
          </div>

          {/* Top Assisters */}
          <div className="stat-card">
            <h3>Top Assisters</h3>
            {topAssisters.length > 0 ? (
              <div className="stat-list">
                {topAssisters.map((player, index) => (
                  <div key={player.name} className="stat-item">
                    <span className="rank">{index + 1}.</span>
                    <Link
                      to={`/player/${encodeURIComponent(player.name)}`}
                      className="player-name-link"
                    >
                      <span className="player-name">{player.name}</span>
                    </Link>
                    <span className="stat-value">{player.ast} assists</span>
                  </div>
                ))}
              </div>
            ) : (
              <p>No assist data available</p>
            )}
          </div>

          {/* Team Rankings */}
          <div className="stat-card">
            <h3>Team Goal Rankings</h3>
            {topTeams.length > 0 ? (
              <div className="stat-list">
                {topTeams.map(([team, stats], index) => (
                  <div key={team} className="stat-item">
                    <span className="rank">{index + 1}.</span>
                    <span className="team-name">{team}</span>
                    <span className="stat-value">{stats.goals} goals</span>
                  </div>
                ))}
              </div>
            ) : (
              <p>No team data available</p>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

export default StatsPage;
