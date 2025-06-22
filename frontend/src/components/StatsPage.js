import React, { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import {
  TopScorersChart,
  TeamGoalsChart,
  PlayerComparisonChart,
} from "./ChartComponents";
import PlayerComparison from "./PlayerComparison";
import "./StatsPage.css";

function StatsPage() {
  const [players, setPlayers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [activeTab, setActiveTab] = useState("overview");
  const navigate = useNavigate();

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

  // Interactive chart handlers
  const handlePlayerClick = (player) => {
    navigate(`/player/${encodeURIComponent(player.name)}`);
  };

  const handleTeamClick = (teamName) => {
    navigate(`/players?team=${encodeURIComponent(teamName)}`);
  };

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

        {/* Tab Navigation */}
        <div className="stats-tabs">
          <button
            className={`tab ${activeTab === "overview" ? "active" : ""}`}
            onClick={() => setActiveTab("overview")}
          >
            📊 Overview
          </button>
          <button
            className={`tab ${activeTab === "charts" ? "active" : ""}`}
            onClick={() => setActiveTab("charts")}
          >
            📈 Visual Analytics
          </button>
          <button
            className={`tab ${activeTab === "comparison" ? "active" : ""}`}
            onClick={() => setActiveTab("comparison")}
          >
            🔍 Player Comparison
          </button>
          <button
            className={`tab ${activeTab === "insights" ? "active" : ""}`}
            onClick={() => setActiveTab("insights")}
          >
            🧠 Insights
          </button>
        </div>

        {/* Tab Content */}
        {activeTab === "overview" && (
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
        )}

        {activeTab === "charts" && (
          <div className="charts-section">
            <div className="charts-grid">
              <div className="chart-container">
                {topScorers.length > 0 && (
                  <TopScorersChart
                    topScorers={topScorers}
                    onPlayerClick={handlePlayerClick}
                  />
                )}
              </div>

              <div className="chart-container">
                {topTeams.length > 0 && (
                  <TeamGoalsChart
                    topTeams={topTeams}
                    onTeamClick={handleTeamClick}
                  />
                )}
              </div>

              <div className="chart-container">
                {topScorers.length >= 3 && (
                  <PlayerComparisonChart players={topScorers} />
                )}
              </div>
            </div>
          </div>
        )}

        {activeTab === "comparison" && <PlayerComparison players={players} />}

        {activeTab === "insights" && (
          <div className="insights-section">
            <div className="insights-grid">
              <div className="insight-card">
                <h3>🔥 Hot Streak</h3>
                <p>Most goals in recent matches</p>
                {topScorers[0] && (
                  <div className="insight-content">
                    <strong>{topScorers[0].name}</strong>
                    <span>{topScorers[0].gls} goals this season</span>
                  </div>
                )}
              </div>

              <div className="insight-card">
                <h3>🎯 Most Efficient</h3>
                <p>Goals per 90 minutes</p>
                {topScorers.length > 0 && (
                  <div className="insight-content">
                    {(() => {
                      const mostEfficient = topScorers
                        .filter((p) => p.min > 450) // At least 5 games worth
                        .sort((a, b) => (b.gls_1 || 0) - (a.gls_1 || 0))[0];
                      return mostEfficient ? (
                        <>
                          <strong>{mostEfficient.name}</strong>
                          <span>
                            {(mostEfficient.gls_1 || 0).toFixed(2)} goals/90min
                          </span>
                        </>
                      ) : (
                        <span>No data available</span>
                      );
                    })()}
                  </div>
                )}
              </div>

              <div className="insight-card">
                <h3>🏆 Team Power</h3>
                <p>Highest scoring team</p>
                {topTeams[0] && (
                  <div className="insight-content">
                    <strong>{topTeams[0][0]}</strong>
                    <span>{topTeams[0][1].goals} total goals</span>
                  </div>
                )}
              </div>

              <div className="insight-card">
                <h3>📊 League Stats</h3>
                <p>Season overview</p>
                <div className="insight-content">
                  <div className="mini-stat">
                    <span>Total Players</span>
                    <strong>{players.length}</strong>
                  </div>
                  <div className="mini-stat">
                    <span>Total Goals</span>
                    <strong>
                      {players.reduce((sum, p) => sum + (p.gls || 0), 0)}
                    </strong>
                  </div>
                  <div className="mini-stat">
                    <span>Avg Goals/Player</span>
                    <strong>
                      {(
                        players.reduce((sum, p) => sum + (p.gls || 0), 0) /
                        players.length
                      ).toFixed(1)}
                    </strong>
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

export default StatsPage;
