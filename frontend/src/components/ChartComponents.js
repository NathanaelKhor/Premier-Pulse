import React, { useState } from "react";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
  ArcElement,
  RadialLinearScale,
  PointElement,
  LineElement,
} from "chart.js";
import { Bar, Pie, Radar, Line } from "react-chartjs-2";

// Register Chart.js components
// This tells Chart.js which components we want to use
ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
  ArcElement,
  RadialLinearScale,
  PointElement,
  LineElement
);

// Enhanced Top Scorers Chart with filtering
export const TopScorersChart = ({ topScorers, onPlayerClick }) => {
  const data = {
    labels: topScorers.map((player) => player.name),
    datasets: [
      {
        label: "Goals Scored",
        data: topScorers.map((player) => player.gls || 0),
        backgroundColor: [
          "#37003c",
          "#00ff85",
          "#e90052",
          "#04f5ff",
          "#3d195b",
        ],
        borderColor: ["#37003c", "#00ff85", "#e90052", "#04f5ff", "#3d195b"],
        borderWidth: 1,
        hoverBackgroundColor: [
          "#4a0049",
          "#14ff94",
          "#f21361",
          "#1affff",
          "#4e1f6b",
        ],
      },
    ],
  };

  const options = {
    responsive: true,
    plugins: {
      legend: {
        position: "top",
      },
      title: {
        display: true,
        text: "Top 5 Goal Scorers",
        font: {
          size: 16,
          weight: "bold",
        },
      },
      tooltip: {
        callbacks: {
          afterLabel: function (context) {
            const player = topScorers[context.dataIndex];
            return [
              `Team: ${player.team || "Unknown"}`,
              `Assists: ${player.ast || 0}`,
              `Matches: ${player.mp || 0}`,
            ];
          },
        },
      },
    },
    scales: {
      y: {
        beginAtZero: true,
        ticks: {
          stepSize: 1,
        },
      },
    },
    onClick: (event, activeElements) => {
      if (activeElements.length > 0 && onPlayerClick) {
        const index = activeElements[0].index;
        const player = topScorers[index];
        onPlayerClick(player);
      }
    },
  };

  return <Bar data={data} options={options} />;
};

// Enhanced Team Goals Chart with better tooltips
export const TeamGoalsChart = ({ topTeams, onTeamClick }) => {
  const data = {
    labels: topTeams.map(([teamName]) => teamName),
    datasets: [
      {
        label: "Goals",
        data: topTeams.map(([, stats]) => stats.goals),
        backgroundColor: [
          "#37003c",
          "#00ff85",
          "#e90052",
          "#04f5ff",
          "#3d195b",
        ],
        borderColor: "#ffffff",
        borderWidth: 3,
        hoverBorderWidth: 4,
      },
    ],
  };

  const options = {
    responsive: true,
    plugins: {
      legend: {
        position: "right",
      },
      title: {
        display: true,
        text: "Team Goals Distribution",
        font: {
          size: 16,
          weight: "bold",
        },
      },
      tooltip: {
        callbacks: {
          afterLabel: function (context) {
            const [teamName, stats] = topTeams[context.dataIndex];
            return [
              `Players: ${stats.players}`,
              `Avg per player: ${(stats.goals / stats.players).toFixed(1)}`,
            ];
          },
        },
      },
    },
    onClick: (event, activeElements) => {
      if (activeElements.length > 0 && onTeamClick) {
        const index = activeElements[0].index;
        const [teamName] = topTeams[index];
        onTeamClick(teamName);
      }
    },
  };

  return <Pie data={data} options={options} />;
};

// Enhanced Player Comparison with position-based stats
export const PlayerComparisonChart = ({
  players,
  selectedStats = ["Goals", "Assists", "Minutes Played", "Starts", "Matches"],
}) => {
  const topPlayers = players.slice(0, 3);

  // Dynamic stat mapping based on selection
  const getStatValue = (player, statName) => {
    switch (statName) {
      case "Goals":
        return player.gls || 0;
      case "Assists":
        return player.ast || 0;
      case "Minutes Played":
        return Math.round((player.min || 0) / 90);
      case "Starts":
        return player.starts || 0;
      case "Matches":
        return player.mp || 0;
      case "Expected Goals":
        return parseFloat((player.xg || 0).toFixed(1));
      case "Expected Assists":
        return parseFloat((player.xag || 0).toFixed(1));
      case "Yellow Cards":
        return player.crdy || 0;
      default:
        return 0;
    }
  };

  const data = {
    labels: selectedStats,
    datasets: topPlayers.map((player, index) => ({
      label: player.name,
      data: selectedStats.map((stat) => getStatValue(player, stat)),
      backgroundColor: [
        "rgba(55, 0, 60, 0.2)",
        "rgba(0, 255, 133, 0.2)",
        "rgba(233, 0, 82, 0.2)",
      ][index],
      borderColor: ["#37003c", "#00ff85", "#e90052"][index],
      borderWidth: 2,
      pointBackgroundColor: ["#37003c", "#00ff85", "#e90052"][index],
    })),
  };

  const options = {
    responsive: true,
    plugins: {
      legend: {
        position: "top",
      },
      title: {
        display: true,
        text: "Top 3 Players Comparison",
        font: {
          size: 16,
          weight: "bold",
        },
      },
    },
    scales: {
      r: {
        beginAtZero: true,
        ticks: {
          stepSize: 1,
        },
      },
    },
  };

  return <Radar data={data} options={options} />;
};

// NEW: Line Chart for Player Performance Trends
export const PlayerTrendChart = ({ player, statType = "goals" }) => {
  // Mock data for demonstration - in real app, you'd have historical data
  const generateTrendData = (statValue) => {
    const weeks = 20;
    const data = [];
    let current = 0;

    for (let i = 0; i < weeks; i++) {
      // Simulate realistic progression
      const increment = Math.random() * (statValue / weeks) * 1.5;
      current += increment;
      data.push(Math.min(current, statValue));
    }

    return data;
  };

  const data = {
    labels: Array.from({ length: 20 }, (_, i) => `Week ${i + 1}`),
    datasets: [
      {
        label: `${
          statType.charAt(0).toUpperCase() + statType.slice(1)
        } Progress`,
        data: generateTrendData(
          player[statType === "goals" ? "gls" : "ast"] || 0
        ),
        borderColor: "#37003c",
        backgroundColor: "rgba(55, 0, 60, 0.1)",
        tension: 0.4,
        fill: true,
      },
    ],
  };

  const options = {
    responsive: true,
    plugins: {
      legend: {
        position: "top",
      },
      title: {
        display: true,
        text: `${player.name} - ${
          statType.charAt(0).toUpperCase() + statType.slice(1)
        } Trend`,
      },
    },
    scales: {
      y: {
        beginAtZero: true,
      },
    },
  };

  return <Line data={data} options={options} />;
};
