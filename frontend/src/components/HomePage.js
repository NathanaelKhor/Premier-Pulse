import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { getCountryName } from "../utils/countryUtils";
import "./HomePage.css";

function HomePage() {
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
        setPlayers(result.slice(0, 6)); // Show only first 6 players on homepage
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
    <div className="homepage">
      {/* Hero Section */}
      <section className="hero">
        <div className="hero-content">
          <h1>Premier Pulse</h1>
          <p>
            Your ultimate destination for Premier League stats, players, and
            insights
          </p>
          <div className="hero-buttons">
            <Link to="/players" className="btn-primary">
              Explore Players
            </Link>
            <Link to="/stats" className="btn-secondary">
              View Stats
            </Link>
          </div>
        </div>
      </section>

      {/* Featured Players Section */}
      <section className="featured-section">
        <div className="container">
          <h2>Featured Players</h2>
          {loading && <p className="loading">Loading players...</p>}
          {error && <p className="error">Unable to load players: {error}</p>}

          {!loading && !error && (
            <div className="players-grid">
              {players.length > 0 ? (
                players.map((player, index) => (
                  <Link
                    key={index}
                    to={`/player/${encodeURIComponent(player.name)}`}
                    className="player-card-link"
                  >
                    <div className="player-card">
                      <div className="player-info">
                        <h3>{player.name || `Player ${index + 1}`}</h3>
                        <div className="player-badges">
                          <span className="position">
                            {player.pos || "Unknown Position"}
                          </span>
                          <span className="team">
                            {player.team || "Unknown Team"}
                          </span>
                          <span className="nation">
                            {getCountryName(player.nation) || "Unknown Country"}
                          </span>
                        </div>
                      </div>
                    </div>
                  </Link>
                ))
              ) : (
                <p>No players found</p>
              )}
            </div>
          )}
        </div>
      </section>

      {/* Features Section */}
      <section className="features-section">
        <div className="container">
          <h2>What We Offer</h2>
          <div className="features-grid">
            <div className="feature-card">
              <h3>Player Statistics</h3>
              <p>Comprehensive stats for all Premier League players</p>
            </div>
            <div className="feature-card">
              <h3>Team Analysis</h3>
              <p>In-depth analysis of team performance and tactics</p>
            </div>
            <div className="feature-card">
              <h3>Live Updates</h3>
              <p>Real-time updates on matches and player performances</p>
            </div>
            <div className="feature-card">
              <h3>Historical Data</h3>
              <p>Access to historical Premier League data and trends</p>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}

export default HomePage;
