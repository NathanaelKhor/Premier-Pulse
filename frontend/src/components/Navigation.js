import React from "react";
import { Link, useLocation } from "react-router-dom";
import "./Navigation.css";

function Navigation() {
  const location = useLocation();

  return (
    <nav className="navigation">
      <div className="nav-container">
        <Link to="/" className="nav-logo">
          Premier Pulse
        </Link>
        <ul className="nav-menu">
          <li className="nav-item">
            <Link
              to="/"
              className={`nav-link ${
                location.pathname === "/" ? "active" : ""
              }`}
            >
              Home
            </Link>
          </li>
          <li className="nav-item">
            <Link
              to="/players"
              className={`nav-link ${
                location.pathname === "/players" ? "active" : ""
              }`}
            >
              Players
            </Link>
          </li>
          <li className="nav-item">
            <Link
              to="/stats"
              className={`nav-link ${
                location.pathname === "/stats" ? "active" : ""
              }`}
            >
              Stats
            </Link>
          </li>
        </ul>
      </div>
    </nav>
  );
}

export default Navigation;
