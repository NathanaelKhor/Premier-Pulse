import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { getCountryName } from "../utils/countryUtils";
import "./PlayersPage.css";

function PlayersPage() {
  const [players, setPlayers] = useState([]);
  const [filteredPlayers, setFilteredPlayers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // Filter states
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedTeam, setSelectedTeam] = useState("");
  const [selectedPosition, setSelectedPosition] = useState("");
  const [selectedNation, setSelectedNation] = useState("");

  useEffect(() => {
    const fetchPlayers = async () => {
      try {
        const response = await fetch("/api/v1/player");
        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }
        const result = await response.json();
        setPlayers(result);
        setFilteredPlayers(result);
      } catch (err) {
        setError(err.message);
        console.error("Error fetching players:", err);
      } finally {
        setLoading(false);
      }
    };

    fetchPlayers();
  }, []);

  // Get unique values for filters
  const teams = [...new Set(players.map((p) => p.team).filter(Boolean))].sort();
  const positions = [
    ...new Set(players.map((p) => p.pos).filter(Boolean)),
  ].sort();
  const nations = [
    ...new Set(players.map((p) => p.nation).filter(Boolean)),
  ].sort();

  // Apply filters
  useEffect(() => {
    let filtered = players;

    if (searchTerm) {
      filtered = filtered.filter((player) =>
        player.name?.toLowerCase().includes(searchTerm.toLowerCase())
      );
    }

    if (selectedTeam) {
      filtered = filtered.filter((player) => player.team === selectedTeam);
    }

    if (selectedPosition) {
      filtered = filtered.filter((player) => player.pos === selectedPosition);
    }

    if (selectedNation) {
      filtered = filtered.filter((player) => player.nation === selectedNation);
    }

    setFilteredPlayers(filtered);
  }, [players, searchTerm, selectedTeam, selectedPosition, selectedNation]);

  const clearFilters = () => {
    setSearchTerm("");
    setSelectedTeam("");
    setSelectedPosition("");
    setSelectedNation("");
  };

  return (
    <div className="players-page">
      <div className="container">
        <h1>All Players</h1>

        {/* Search and Filter Section */}
        <div className="filters-section">
          <div className="search-bar">
            <input
              type="text"
              placeholder="Search players by name..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="search-input"
            />
          </div>

          <div className="filter-controls">
            <select
              value={selectedTeam}
              onChange={(e) => setSelectedTeam(e.target.value)}
              className="filter-select"
            >
              <option value="">All Teams</option>
              {teams.map((team) => (
                <option key={team} value={team}>
                  {team}
                </option>
              ))}
            </select>

            <select
              value={selectedPosition}
              onChange={(e) => setSelectedPosition(e.target.value)}
              className="filter-select"
            >
              <option value="">All Positions</option>
              {positions.map((pos) => (
                <option key={pos} value={pos}>
                  {pos}
                </option>
              ))}
            </select>

            <select
              value={selectedNation}
              onChange={(e) => setSelectedNation(e.target.value)}
              className="filter-select"
            >
              <option value="">All Nations</option>
              {nations.map((nation) => (
                <option key={nation} value={nation}>
                  {getCountryName(nation)}
                </option>
              ))}
            </select>

            <button onClick={clearFilters} className="clear-filters-btn">
              Clear Filters
            </button>
          </div>
        </div>

        {/* Results Summary */}
        <div className="results-summary">
          <p>
            Showing {filteredPlayers.length} of {players.length} players
          </p>
        </div>

        {loading && <p className="loading">Loading players...</p>}
        {error && <p className="error">Unable to load players: {error}</p>}

        {!loading && !error && (
          <div className="players-grid">
            {filteredPlayers.length > 0 ? (
              filteredPlayers.map((player, index) => (
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
                      <div className="player-stats">
                        <span className="stat">Goals: {player.gls || 0}</span>
                        <span className="stat">Assists: {player.ast || 0}</span>
                        <span className="stat">Matches: {player.mp || 0}</span>
                      </div>
                    </div>
                  </div>
                </Link>
              ))
            ) : (
              <p className="no-results">
                No players found matching your criteria
              </p>
            )}
          </div>
        )}
      </div>
    </div>
  );
}

export default PlayersPage;
