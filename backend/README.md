# Premier Pulse Backend ⚽

Spring Boot REST API backend for Premier League statistics management and data persistence.

## 🚀 Features

- **RESTful API**: Comprehensive REST endpoints for player data management
- **PostgreSQL Integration**: Robust data persistence with JPA/Hibernate
- **Advanced Querying**: Multiple search and filter options for player data
- **Spring Boot 3.5**: Modern Spring Boot application with latest features
- **Transaction Management**: Safe data operations with proper transaction handling
- **CORS Support**: Configured for frontend integration
- **Auto-generated Documentation**: Swagger/OpenAPI integration ready

## 🏗️ Technology Stack

- **Java** 21
- **Spring Boot** 3.5.0
- **Spring Data JPA** for database operations
- **PostgreSQL** for data persistence
- **Gradle** for build management
- **JUnit** for testing

## 📁 Project Structure

```
backend/
├── src/
│   ├── main/
│   │   ├── java/
│   │   │   └── com/pl/premier_zone/
│   │   │       ├── PremierZoneApplication.java     # Main application class
│   │   │       └── player/
│   │   │           ├── Player.java                 # Entity model
│   │   │           ├── PlayerController.java       # REST controller
│   │   │           ├── PlayerService.java          # Business logic
│   │   │           └── PlayerRepository.java       # Data access layer
│   │   └── resources/
│   │       ├── application.properties              # Configuration
│   │       ├── static/                            # Static resources
│   │       └── templates/                         # Template files
│   └── test/
│       └── java/
│           └── com/pl/premier_zone/
│               └── PremierZoneApplicationTests.java
├── build.gradle                                   # Build configuration
├── gradlew                                        # Gradle wrapper (Unix)
├── gradlew.bat                                    # Gradle wrapper (Windows)
└── README.md
```

## 🚀 Getting Started

### Prerequisites

- **Java** 21 or higher
- **PostgreSQL** 12 or higher
- **Gradle** 7.0+ (or use included wrapper)

### Database Setup

1. **Create PostgreSQL database**

   ```sql
   CREATE DATABASE premier_pulse;
   CREATE USER premier_user WITH PASSWORD 'your_password';
   GRANT ALL PRIVILEGES ON DATABASE premier_pulse TO premier_user;
   ```

2. **Configure database connection**

   Update `src/main/resources/application.properties`:

   ```properties
   spring.datasource.url=jdbc:postgresql://localhost:5432/premier_pulse
   spring.datasource.username=premier_user
   spring.datasource.password=your_password
   spring.jpa.hibernate.ddl-auto=update
   spring.jpa.show-sql=true
   spring.jpa.properties.hibernate.format_sql=true
   ```

### Installation & Running

1. **Clone and navigate to backend**

   ```bash
   cd backend
   ```

2. **Build the application**

   ```bash
   ./gradlew build
   ```

3. **Run the application**

   ```bash
   ./gradlew bootRun
   ```

4. **Verify the application**

   The API will be available at: `http://localhost:8080`

### Available Gradle Tasks

- `./gradlew bootRun` - Run the application in development mode
- `./gradlew test` - Run all tests
- `./gradlew build` - Build the application JAR
- `./gradlew clean` - Clean build artifacts
- `./gradlew bootJar` - Create executable JAR file

## 🌐 API Endpoints

### Players API (`/api/v1/player`)

#### GET Requests

```http
GET /api/v1/player
```

Get all players

```http
GET /api/v1/player?name={playerName}
```

Search players by name (partial match, case-insensitive)

```http
GET /api/v1/player?team={teamName}
```

Get all players from a specific team

```http
GET /api/v1/player?position={position}
```

Get players by position (e.g., FW, MF, DF, GK)

```http
GET /api/v1/player?nation={nationCode}
```

Get players by nationality (using nation codes)

```http
GET /api/v1/player?team={teamName}&position={position}
```

Get players by both team and position

#### POST Request

```http
POST /api/v1/player
Content-Type: application/json

{
  "name": "Player Name",
  "team": "Team Name",
  "pos": "Position",
  "nation": "Nation Code",
  "age": 25,
  "mp": 30,
  "gls": 15,
  "ast": 8
  // ... other player statistics
}
```

#### PUT Request

```http
PUT /api/v1/player
Content-Type: application/json

{
  "name": "Existing Player Name",
  "team": "Updated Team",
  // ... updated fields
}
```

#### DELETE Request

```http
DELETE /api/v1/player/{playerName}
```

## 📊 Data Model

### Player Entity

The `Player` entity contains comprehensive Premier League statistics:

#### Basic Information

- `name` (String) - Player name (Primary Key)
- `nation` (String) - Nation code
- `pos` (String) - Position
- `age` (Integer) - Player age
- `team` (String) - Current team

#### Performance Statistics

- `mp` (Integer) - Matches played
- `starts` (Integer) - Matches started
- `min` (Double) - Minutes played
- `nineties` (Double) - 90-minute equivalents played

#### Attacking Statistics

- `gls` (Double) - Goals scored
- `ast` (Double) - Assists
- `g_a` (Double) - Goals + Assists
- `pk` (Double) - Penalty goals
- `pkatt` (Double) - Penalty attempts

#### Advanced Metrics

- `xg` (Double) - Expected Goals
- `npxg` (Double) - Non-penalty Expected Goals
- `xag` (Double) - Expected Assists
- `prgc` (Double) - Progressive Carries
- `prgp` (Double) - Progressive Passes
- `prgr` (Double) - Progressive Receptions

#### Per-90 Statistics

- `gls_1` (Double) - Goals per 90 minutes
- `ast_1` (Double) - Assists per 90 minutes
- `xg_1` (Double) - Expected Goals per 90 minutes
- `xag_1` (Double) - Expected Assists per 90 minutes

#### Disciplinary

- `crdy` (Double) - Yellow cards
- `crdr` (Double) - Red cards

## 🏗️ Architecture

### Layered Architecture

1. **Controller Layer** (`PlayerController`)

   - Handles HTTP requests and responses
   - Request validation and parameter binding
   - RESTful endpoint definitions

2. **Service Layer** (`PlayerService`)

   - Business logic implementation
   - Data processing and filtering
   - Transaction management

3. **Repository Layer** (`PlayerRepository`)

   - Data access abstraction
   - JPA repository interface
   - Custom query methods

4. **Entity Layer** (`Player`)
   - JPA entity mapping
   - Database table structure
   - Field validation annotations

### Key Components

#### PlayerController

```java
@RestController
@RequestMapping(path = "api/v1/player")
public class PlayerController {
    // Handles all HTTP requests for player operations
    // Supports multiple query parameters for filtering
    // Returns appropriate HTTP status codes
}
```

#### PlayerService

```java
@Component
public class PlayerService {
    // Implements business logic for player operations
    // Provides filtering and search functionality
    // Manages database transactions
}
```

#### PlayerRepository

```java
@Repository
public interface PlayerRepository extends JpaRepository<Player, String> {
    // Extends JPA repository for basic CRUD operations
    // Custom query methods for specific use cases
}
```

## 🧪 Testing

### Test Structure

- **Unit Tests**: Individual component testing
- **Integration Tests**: Full application context testing
- **Repository Tests**: Database integration testing

### Running Tests

```bash
# Run all tests
./gradlew test

# Run tests with coverage
./gradlew test jacocoTestReport

# Run specific test class
./gradlew test --tests "PlayerServiceTest"
```

### Test Configuration

Tests use an in-memory H2 database for isolation and speed.

## 🔧 Configuration

### Application Properties

Key configuration options in `application.properties`:

```properties
# Database Configuration
spring.datasource.url=jdbc:postgresql://localhost:5432/premier_pulse
spring.datasource.username=premier_user
spring.datasource.password=your_password

# JPA/Hibernate Configuration
spring.jpa.hibernate.ddl-auto=update
spring.jpa.show-sql=false
spring.jpa.properties.hibernate.format_sql=true
spring.jpa.properties.hibernate.dialect=org.hibernate.dialect.PostgreSQLDialect

# Server Configuration
server.port=8080

# CORS Configuration (if needed)
spring.web.cors.allowed-origins=http://localhost:3000
```

### Environment-Specific Configuration

Create additional property files for different environments:

- `application-dev.properties` - Development settings
- `application-prod.properties` - Production settings
- `application-test.properties` - Test settings

Activate with: `--spring.profiles.active=dev`

## 🚀 Production Deployment

### Building for Production

```bash
# Create production JAR
./gradlew bootJar

# JAR file will be in build/libs/
```

### Docker Deployment

Create `Dockerfile`:

```dockerfile
FROM openjdk:21-jre-slim

COPY build/libs/*.jar app.jar

EXPOSE 8080

ENTRYPOINT ["java", "-jar", "/app.jar"]
```

### Environment Variables

Set these environment variables in production:

```bash
SPRING_DATASOURCE_URL=jdbc:postgresql://your-db-host:5432/premier_pulse
SPRING_DATASOURCE_USERNAME=your_username
SPRING_DATASOURCE_PASSWORD=your_password
SPRING_PROFILES_ACTIVE=prod
```

## 🔍 API Usage Examples

### JavaScript/Frontend Integration

```javascript
// Fetch all players
const players = await fetch("/api/v1/player").then((res) => res.json());

// Search for specific player
const searchResults = await fetch("/api/v1/player?name=Haaland").then((res) =>
  res.json()
);

// Get team players
const teamPlayers = await fetch("/api/v1/player?team=Manchester-City").then(
  (res) => res.json()
);

// Create new player
const newPlayer = await fetch("/api/v1/player", {
  method: "POST",
  headers: { "Content-Type": "application/json" },
  body: JSON.stringify({
    name: "New Player",
    team: "Team Name",
    pos: "FW",
    nation: "eng ENG",
    age: 24,
  }),
});
```

### cURL Examples

```bash
# Get all players
curl http://localhost:8080/api/v1/player

# Search by name
curl "http://localhost:8080/api/v1/player?name=Salah"

# Create player
curl -X POST http://localhost:8080/api/v1/player \
  -H "Content-Type: application/json" \
  -d '{"name":"Test Player","team":"Test Team","pos":"FW"}'

# Update player
curl -X PUT http://localhost:8080/api/v1/player \
  -H "Content-Type: application/json" \
  -d '{"name":"Test Player","team":"Updated Team"}'

# Delete player
curl -X DELETE http://localhost:8080/api/v1/player/Test%20Player
```

## 🛠️ Development

### Code Style

- Follow Java naming conventions
- Use meaningful variable and method names
- Add comprehensive JavaDoc comments
- Implement proper error handling

### Adding New Features

1. **Add Entity Fields**: Update `Player.java` with new fields
2. **Update Service**: Add business logic in `PlayerService.java`
3. **Extend Controller**: Add new endpoints in `PlayerController.java`
4. **Write Tests**: Create corresponding test cases
5. **Update Documentation**: Update this README

### Database Migrations

For production, consider using Flyway or Liquibase for database migrations instead of `hibernate.ddl-auto=update`.

## 🤝 Contributing

1. **Fork the repository**
2. **Create a feature branch** (`git checkout -b feature/amazing-feature`)
3. **Write tests** for new functionality
4. **Follow coding standards** and add JavaDoc comments
5. **Commit changes** (`git commit -m 'Add amazing feature'`)
6. **Push to branch** (`git push origin feature/amazing-feature`)
7. **Open a Pull Request**

### Code Review Checklist

- [ ] Tests written and passing
- [ ] JavaDoc comments added
- [ ] No hardcoded values
- [ ] Proper error handling
- [ ] Database queries optimized
- [ ] API documentation updated

## 📞 Support

For backend-specific issues:

1. **Check application logs** for error details
2. **Verify database connectivity** and permissions
3. **Test API endpoints** using Postman or curl
4. **Review configuration** in application.properties
5. **Check Java version** compatibility

### Common Issues

- **Port already in use**: Change server.port in application.properties
- **Database connection failed**: Verify PostgreSQL is running and credentials are correct
- **JPA errors**: Check entity mappings and database schema
- **Build failures**: Ensure Java 21 is installed and JAVA_HOME is set

---

Built with ❤️ using Spring Boot and modern Java practices
