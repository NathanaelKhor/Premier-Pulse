# Premier Pulse Frontend 🎨

React-based frontend application for Premier League statistics visualization and player data management.

## 🚀 Features

- **Modern React Application**: Built with React 19 and functional components with hooks
- **Responsive Design**: Mobile-first design with CSS Grid and Flexbox
- **Dynamic Routing**: Client-side routing with React Router DOM
- **Real-time Search**: Live player search with debounced input
- **Advanced Filtering**: Filter players by team, position, and nationality
- **Interactive UI**: Smooth animations and hover effects
- **Player Profiles**: Detailed individual player statistics pages

## 🏗️ Technology Stack

- **React** 19.1.0
- **React Router DOM** 7.6.2
- **CSS3** with modern features (Grid, Flexbox, Animations)
- **Web Vitals** for performance monitoring
- **Testing Library** for component testing

## 📁 Project Structure

```
frontend/
├── public/
│   ├── index.html
│   ├── favicon.ico
│   └── manifest.json
├── src/
│   ├── components/
│   │   ├── HomePage.js/.css      # Landing page with featured players
│   │   ├── PlayersPage.js/.css   # Player listing with search/filter
│   │   ├── PlayerDetailPage.js/.css # Individual player statistics
│   │   ├── StatsPage.js/.css     # League statistics and rankings
│   │   └── Navigation.js/.css    # Main navigation component
│   ├── utils/
│   │   └── countryUtils.js       # Country code mappings
│   ├── App.js                    # Main application component
│   ├── App.css                   # Global styles
│   ├── index.js                  # Application entry point
│   └── index.css                 # Base CSS styles
├── package.json
└── README.md
```

## 🚀 Getting Started

### Prerequisites

- Node.js (v16 or higher)
- npm or yarn package manager

### Installation

1. **Install dependencies**

   ```bash
   npm install
   ```

2. **Start development server**

   ```bash
   npm start
   ```

3. **Open your browser**
   Navigate to [http://localhost:3000](http://localhost:3000)

### Available Scripts

- `npm start` - Runs the app in development mode
- `npm test` - Launches the test runner
- `npm run build` - Builds the app for production
- `npm run eject` - Ejects from Create React App (irreversible)

## 🎨 Component Overview

### HomePage (`/`)

- Hero section with call-to-action buttons
- Featured players grid (top 6 players)
- Features showcase section
- Responsive landing page design

### PlayersPage (`/players`)

- Complete player listing with pagination
- Real-time search functionality
- Multiple filter options (team, position, nationality)
- Player cards with key statistics
- Responsive grid layout

### PlayerDetailPage (`/player/:name`)

- Comprehensive player statistics
- Organized stat sections (Basic, Attacking, Expected, Per-90, etc.)
- Visual stat highlights with color coding
- Back navigation to players list

### StatsPage (`/stats`)

- League-wide statistics
- Top scorers and assisters leaderboards
- Team goal rankings
- Interactive stat cards

### Navigation

- Responsive navigation bar
- Active route highlighting
- Mobile-friendly menu

## 📊 Data Integration

The frontend connects to the Spring Boot backend via REST API:

```javascript
// Example API call
const fetchPlayers = async () => {
  const response = await fetch("/api/v1/player");
  const players = await response.json();
  setPlayers(players);
};
```

### API Integration Points

- Player listing: `GET /api/v1/player`
- Player search: `GET /api/v1/player?name={name}`
- Team filtering: `GET /api/v1/player?team={team}`
- Position filtering: `GET /api/v1/player?position={position}`
- Nation filtering: `GET /api/v1/player?nation={nation}`

## 🎨 Styling Architecture

### CSS Organization

- Component-specific CSS files co-located with components
- Global styles in `App.css` and `index.css`
- CSS variables for consistent theming
- Mobile-first responsive design

### Design System

- **Primary Colors**: Premier League purple (`#37003c`), accent green (`#00ff87`)
- **Typography**: System fonts with fallbacks
- **Spacing**: Consistent padding/margin scale
- **Animations**: Smooth transitions and hover effects

### Key CSS Features

```css
/* Gradient backgrounds */
background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);

/* Card hover effects */
.player-card:hover {
  transform: translateY(-5px);
  box-shadow: 0 8px 25px rgba(0, 0, 0, 0.15);
}

/* Responsive grid */
.players-grid {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(300px, 1fr));
  gap: 2rem;
}
```

## 🔍 Search & Filter System

### Search Implementation

- Real-time search with controlled input
- Case-insensitive name matching
- Debounced input for performance

### Filter System

- Multiple simultaneous filters
- Dynamic filter options based on available data
- Clear filters functionality
- Results counter display

```javascript
// Filter logic example
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

  setFilteredPlayers(filtered);
}, [players, searchTerm, selectedTeam, selectedPosition, selectedNation]);
```

## 📱 Responsive Design

### Breakpoints

- Mobile: < 768px
- Tablet: 768px - 1024px
- Desktop: > 1024px

### Mobile Optimizations

- Touch-friendly button sizes
- Collapsible navigation
- Single-column layouts on mobile
- Optimized image loading

## 🧪 Testing

### Testing Strategy

- Component unit tests with React Testing Library
- User interaction testing
- API integration testing
- Responsive design testing

### Running Tests

```bash
npm test                 # Run tests in watch mode
npm test -- --coverage  # Run tests with coverage report
```

## 🚀 Production Build

### Build Process

```bash
npm run build
```

This creates an optimized production build with:

- Minified JavaScript and CSS
- Optimized asset loading
- Service worker for caching
- Performance optimizations

### Deployment

The build folder can be deployed to any static hosting service:

- Netlify
- Vercel
- GitHub Pages
- AWS S3 + CloudFront

## 🔧 Configuration

### Environment Variables

Create a `.env` file for environment-specific configuration:

```
REACT_APP_API_URL=http://localhost:8080
REACT_APP_VERSION=1.0.0
```

### Proxy Configuration

The `package.json` includes a proxy setting for development:

```json
{
  "proxy": "http://localhost:8080"
}
```

## 🎯 Performance Optimizations

- Lazy loading for route-based code splitting
- Optimized re-renders with proper dependency arrays
- Efficient state management with useState and useEffect
- Image optimization and lazy loading
- CSS animations using transform for better performance

## 🤝 Contributing

1. Follow the existing code style and structure
2. Write tests for new components
3. Ensure responsive design works across devices
4. Update documentation for new features
5. Use semantic commit messages

## 📞 Support

For frontend-specific issues, please check:

1. Browser console for JavaScript errors
2. Network tab for API call failures
3. React Developer Tools for component debugging

---

Built with ❤️ using React and modern web technologies
