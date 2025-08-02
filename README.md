

# Weather Dashboard System Documentation

## Overview
This system is a weather dashboard application that allows users to:
- Search for locations worldwide
- Add weather widgets for selected locations
- View current weather conditions
- Manage (refresh/delete) weather widgets

The system consists of:
1. Backend API (Node.js/Express)
2. Frontend React application (Material UI)
3. Integration with external weather and geocoding APIs

## Backend Architecture

### Models
**Widget Model (widgetModel.js)**
- Defines the MongoDB schema for weather widgets with fields:
  - id: Unique identifier (auto-generated)
  - name: Location name
  - description: Widget description
  - location: Contains display names and coordinates
  - weather: Contains current weather data
  - timestamps: createdAt and updatedAt

### Routes (widgetRoutes.js)
- GET /widgets - Fetch all widgets
- POST /widgets - Create new widget
- DELETE /widgets/:id - Delete widget by ID

### Controllers (widgetController.js)
**addNewWidget**
- Creates a new weather widget
- Validates input data
- Returns 201 on success or appropriate error codes

**removeWidget**
- Deletes a widget by ID
- Validates ID parameter
- Returns 200 on success or 404 if not found

**fetchWidgets**
- Retrieves all widgets
- Returns array of widgets with count

### Services
**WidgetService.js**
- Database operations:
  - `getAllWidgets()`: Fetches all widgets
  - `deleteWidgetById()`: Removes widget by ID
  - `addWidget()`: Creates new widget

**weather.service.js**
- `getWeatherData()`: Fetches current weather from Open-Meteo API
- Returns temperature, humidity, rain, wind data

**location.service.js**
- `searchLocations()`: Uses Nominatim API for location search
- Returns location names and coordinates

## Frontend Architecture

### Main Components
**WeatherDashboard (WeatherDashboard.js)**
- Main container component
- Manages widget state and API calls
- Contains search functionality and widget grid

**WeatherWidget (WeatherWidget.js)**
- Displays individual weather widget
- Shows location name, temperature, weather stats
- Contains delete and refresh buttons

**WeatherStatItem (WeatherStatItem.js)**
- Stat display component (reusable)
- Shows label-value pairs for weather data

### Key Features
1. **Location Search**
   - Uses Google Places autocomplete
   - Fallback to Nominatim API search
   - Displays search results in dropdown

2. **Widget Management**
   - Add new widgets with weather data
   - Delete widgets
   - Refresh all widgets

3. **Data Display**
   - Current temperature with icon
   - Weather statistics (humidity, rain, wind)
   - Formatted timestamps

### State Management
- Uses React useState for:
  - Widgets list
  - Search results
  - Loading states
  - Error messages

### API Integration
- Backend API calls using Axios
- Open-Meteo for weather data
- Nominatim for location search

## Data Flow

1. **Initial Load**
   - Dashboard fetches existing widgets from backend
   - Displays loading state during fetch

2. **Adding Widget**
   - User searches for location
   - Selects result → fetches weather data
   - Creates widget → saves to backend
   - Updates UI with new widget

3. **Deleting Widget**
   - User clicks delete → sends API request
   - On success, removes from UI
   - Shows error if deletion fails

4. **Refreshing Data**
   - User clicks refresh button
   - Refetches all widgets from backend
   - Updates each widget's weather data

## Error Handling
- Displays user-friendly error messages for:
  - Failed API calls
  - Duplicate locations
  - Invalid inputs
- Detailed errors in console for development
- Loading indicators during operations

## Dependencies

### Backend
- Express.js
- Mongoose (MongoDB)
- Axios (HTTP requests)
- Open-Meteo SDK

### Frontend
- React
- Material UI
- Axios
- use-places-autocomplete (Google Places)
- Open-Meteo SDK

## API Endpoints

**Backend API (localhost:5001)**
- `GET /api/widgets` - Get all widgets
- `POST /api/widgets` - Create widget
- `DELETE /api/widgets/:id` - Delete widget

**External APIs**
- Open-Meteo - Weather data
- Nominatim - Location search
- Google Places - Autocomplete (frontend)

