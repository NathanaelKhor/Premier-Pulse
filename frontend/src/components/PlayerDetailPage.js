import React, { useState, useEffect } from "react";
import { useParams, Link } from "react-router-dom";
import { getCountryName } from "../utils/countryUtils";
import "./PlayerDetailPage.css";

function PlayerDetailPage() {
  const { playerName } = useParams();
  const [player, setPlayer] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchPlayer = async () => {
      try {
        // Use the name parameter from URL to search for the player
        const response = await fetch(
          `/api/v1/player?name=${encodeURIComponent(playerName)}`
        );
        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }
        const result = await response.json();

        // Find exact match (since the API returns an array of matches)
        const exactMatch = result.find((p) => p.name === playerName);
        if (exactMatch) {
          setPlayer(exactMatch);
        } else {
          throw new Error("Player not found");
        }
      } catch (err) {
        setError(err.message);
        console.error("Error fetching player:", err);
      } finally {
        setLoading(false);
      }
    };

    if (playerName) {
      fetchPlayer();
    }
  }, [playerName]);

  if (loading) {
    return (
      <div className="player-detail-page">
        <div className="container">
          <p className="loading">Loading player details...</p>
        </div>
      </div>
    );
  }

  if (error || !player) {
    return (
      <div className="player-detail-page">
        <div className="container">
          <div className="error-section">
            <h2>Player Not Found</h2>
            <p className="error">Unable to find player: {playerName}</p>
            <Link to="/players" className="back-link">
              ← Back to Players
            </Link>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="player-detail-page">
      <div className="container">
        {/* Back Navigation */}
        <Link to="/players" className="back-link">
          ← Back to Players
        </Link>

        {/* Hero Section */}
        <div className="player-hero">
          <div className="player-header">
            <h1>{player.name}</h1>
            <div className="player-meta">
              <span className="position">
                {player.pos || "Unknown Position"}
              </span>
              <span className="team">{player.team || "Unknown Team"}</span>
              <span className="nation">
                {getCountryName(player.nation) || "Unknown Nation"}
              </span>
              {player.age && <span className="age">Age: {player.age}</span>}
            </div>
          </div>
        </div>

        {/* Statistics Grid */}
        <div className="stats-grid">
          {/* Basic Stats */}
          <div className="stat-section">
            <h3>Basic Statistics</h3>
            <div className="stat-items">
              <div className="stat-item">
                <span className="stat-label">Matches Played</span>
                <span className="stat-value">{player.mp || 0}</span>
              </div>
              <div className="stat-item">
                <span className="stat-label">Starts</span>
                <span className="stat-value">{player.starts || 0}</span>
              </div>
              <div className="stat-item">
                <span className="stat-label">Minutes</span>
                <span className="stat-value">{player.min || 0}</span>
              </div>
              <div className="stat-item">
                <span className="stat-label">90s Played</span>
                <span className="stat-value">{player.nineties || 0}</span>
              </div>
            </div>
          </div>

          {/* Attacking Stats */}
          <div className="stat-section">
            <h3>Attacking</h3>
            <div className="stat-items">
              <div className="stat-item highlight">
                <span className="stat-label">Goals</span>
                <span className="stat-value">{player.gls || 0}</span>
              </div>
              <div className="stat-item highlight">
                <span className="stat-label">Assists</span>
                <span className="stat-value">{player.ast || 0}</span>
              </div>
              <div className="stat-item">
                <span className="stat-label">Goals + Assists</span>
                <span className="stat-value">{player.g_a || 0}</span>
              </div>
              <div className="stat-item">
                <span className="stat-label">Non-penalty Goals</span>
                <span className="stat-value">{player.gpk || 0}</span>
              </div>
              <div className="stat-item">
                <span className="stat-label">Penalties</span>
                <span className="stat-value">{player.pk || 0}</span>
              </div>
              <div className="stat-item">
                <span className="stat-label">Penalty Attempts</span>
                <span className="stat-value">{player.pkatt || 0}</span>
              </div>
            </div>
          </div>

          {/* Expected Stats */}
          <div className="stat-section">
            <h3>Expected Statistics</h3>
            <div className="stat-items">
              <div className="stat-item">
                <span className="stat-label">Expected Goals (xG)</span>
                <span className="stat-value">
                  {player.xg?.toFixed(2) || "0.00"}
                </span>
              </div>
              <div className="stat-item">
                <span className="stat-label">Non-penalty xG</span>
                <span className="stat-value">
                  {player.npxg?.toFixed(2) || "0.00"}
                </span>
              </div>
              <div className="stat-item">
                <span className="stat-label">Expected Assists (xAG)</span>
                <span className="stat-value">
                  {player.xag?.toFixed(2) || "0.00"}
                </span>
              </div>
              <div className="stat-item">
                <span className="stat-label">npxG + xAG</span>
                <span className="stat-value">
                  {player.npxg_xag?.toFixed(2) || "0.00"}
                </span>
              </div>
            </div>
          </div>

          {/* Per 90 Stats */}
          <div className="stat-section">
            <h3>Per 90 Minutes</h3>
            <div className="stat-items">
              <div className="stat-item">
                <span className="stat-label">Goals per 90</span>
                <span className="stat-value">
                  {player.gls_1?.toFixed(2) || "0.00"}
                </span>
              </div>
              <div className="stat-item">
                <span className="stat-label">Assists per 90</span>
                <span className="stat-value">
                  {player.ast_1?.toFixed(2) || "0.00"}
                </span>
              </div>
              <div className="stat-item">
                <span className="stat-label">G+A per 90</span>
                <span className="stat-value">
                  {player.g_a_1?.toFixed(2) || "0.00"}
                </span>
              </div>
              <div className="stat-item">
                <span className="stat-label">xG per 90</span>
                <span className="stat-value">
                  {player.xg_1?.toFixed(2) || "0.00"}
                </span>
              </div>
              <div className="stat-item">
                <span className="stat-label">xAG per 90</span>
                <span className="stat-value">
                  {player.xag_1?.toFixed(2) || "0.00"}
                </span>
              </div>
            </div>
          </div>

          {/* Progression Stats */}
          <div className="stat-section">
            <h3>Progression</h3>
            <div className="stat-items">
              <div className="stat-item">
                <span className="stat-label">Progressive Carries</span>
                <span className="stat-value">{player.prgc || 0}</span>
              </div>
              <div className="stat-item">
                <span className="stat-label">Progressive Passes</span>
                <span className="stat-value">{player.prgp || 0}</span>
              </div>
              <div className="stat-item">
                <span className="stat-label">Progressive Receptions</span>
                <span className="stat-value">{player.prgr || 0}</span>
              </div>
            </div>
          </div>

          {/* Discipline */}
          <div className="stat-section">
            <h3>Discipline</h3>
            <div className="stat-items">
              <div className="stat-item">
                <span className="stat-label">Yellow Cards</span>
                <span className="stat-value">{player.crdy || 0}</span>
              </div>
              <div className="stat-item">
                <span className="stat-label">Red Cards</span>
                <span className="stat-value">{player.crdr || 0}</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default PlayerDetailPage;
