# Premier Pulse 🏆

A comprehensive Premier League statistics web application that provides detailed player statistics, team analysis, and live data visualization for the current Premier League season.

## 🚀 Features

- **Player Statistics**: Comprehensive stats for all Premier League players including goals, assists, expected goals (xG), progressive passes, and disciplinary records
- **Advanced Search & Filtering**: Search players by name, position, team, or nationality
- **Detailed Player Profiles**: Individual player pages with complete statistical breakdowns
- **Team Analysis**: Team-based performance metrics and rankings
- **Real-time Data**: Automated data scraping from FBRef for up-to-date statistics
- **Responsive Design**: Fully responsive web interface optimized for all devices

## 🏗️ Architecture

This is a full-stack application built with:

- **Frontend**: React 19 with React Router for navigation
- **Backend**: Spring Boot 3.5 with RESTful API
- **Database**: PostgreSQL for data persistence
- **Data Scraping**: Python with Selenium and BeautifulSoup for automated data collection
- **Styling**: Custom CSS with modern gradients and animations

## 📁 Project Structure

```
Premier-Pulse/
├── frontend/           # React frontend application
├── backend/           # Spring Boot backend API
├── data_scraper/      # Python data scraping scripts
└── README.md         # This file
```

## 🚀 Quick Start

### Prerequisites

- **Node.js** (v16 or higher)
- **Java** (v21 or higher)
- **Python** (v3.8 or higher)
- **PostgreSQL** (v12 or higher)
- **Chrome Browser** (for web scraping)

### Installation

1. **Clone the repository**

   ```bash
   git clone https://github.com/yourusername/Premier-Pulse.git
   cd Premier-Pulse
   ```

2. **Set up the database**

   ```sql
   CREATE DATABASE premier_pulse;
   CREATE USER premier_user WITH PASSWORD 'your_password';
   GRANT ALL PRIVILEGES ON DATABASE premier_pulse TO premier_user;
   ```

3. **Start the backend**

   ```bash
   cd backend
   ./gradlew bootRun
   ```

4. **Start the frontend**

   ```bash
   cd frontend
   npm install
   npm start
   ```

5. **Run data scraper** (optional - to update data)
   ```bash
   cd data_scraper
   pip install -r requirements.txt
   python Data_Scraping.py
   ```

### Configuration

Update `backend/src/main/resources/application.properties`:

```properties
spring.datasource.url=jdbc:postgresql://localhost:5432/premier_pulse
spring.datasource.username=premier_user
spring.datasource.password=your_password
spring.jpa.hibernate.ddl-auto=update
```

## 🌐 API Endpoints

### Players API (`/api/v1/player`)

- `GET /api/v1/player` - Get all players
- `GET /api/v1/player?name={name}` - Search players by name
- `GET /api/v1/player?team={team}` - Get players by team
- `GET /api/v1/player?position={position}` - Get players by position
- `GET /api/v1/player?nation={nation}` - Get players by nationality
- `POST /api/v1/player` - Add new player
- `PUT /api/v1/player` - Update player
- `DELETE /api/v1/player/{name}` - Delete player

## 📊 Data Model

### Player Entity

The application tracks comprehensive player statistics including:

- **Basic Info**: Name, age, position, team, nationality
- **Performance**: Matches played, goals, assists, minutes
- **Advanced Metrics**: Expected goals (xG), expected assists (xAG), progressive statistics
- **Disciplinary**: Yellow cards, red cards
- **Per-90 Stats**: Normalized statistics per 90 minutes played

## 🔧 Development

### Frontend Development

```bash
cd frontend
npm start              # Start development server
npm test              # Run tests
npm run build         # Build for production
```

### Backend Development

```bash
cd backend
./gradlew bootRun     # Start development server
./gradlew test        # Run tests
./gradlew build       # Build JAR file
```

### Data Scraping

```bash
cd data_scraper
python Data_Scraping.py  # Update player statistics
```

## 🚀 Deployment

### Frontend (Netlify/Vercel)

```bash
cd frontend
npm run build
# Deploy dist/ folder to your hosting service
```

### Backend (Heroku/Railway)

```bash
cd backend
./gradlew build
# Deploy JAR file from build/libs/
```

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## 📝 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## 🙏 Acknowledgments

- [FBRef](https://fbref.com/) for providing comprehensive football statistics
- Premier League for the amazing football data
- React and Spring Boot communities for excellent documentation

---

**Premier Pulse** - Your gateway to Premier League insights! ⚽
