

---
Frontend :
http://localhost:3000


### **Weather Dashboard Documentation**

#### **1. Core Functions**
1. **`fetchWidgets()`**  
   - Fetches saved weather widgets from the backend API.
   - Updates the state and local storage with fetched data.

2. **`createNewWidget(widget, weatherData)`**  
   - Constructs a new weather widget object with:
     - Unique ID generation (based on location name + random number)
     - Location details (name, coordinates)
     - Weather data (temperature, humidity, wind speed, units)
     - Timestamps (createdAt, updatedAt)

3. **`addNewWidget(result)`**  
   - Adds a new weather widget:
     - Checks for duplicate locations.
     - Fetches weather data for the selected location.
     - Saves the widget to the backend.
     - Updates the widget list in state.

4. **`removeWidget(id)`**  
   - Deletes a widget by ID:
     - Calls backend API to remove the widget.
     - Updates the widget list in state.

5. **`handleSearch()`**  
   - Triggers location search based on user input.
   - Displays search results from OpenStreetMap/Google Places.

6. **`handleSelect(address)`**  
   - Sets the selected address in the search field.
   - Clears suggestions and search results.

7. **`refreshAll()`**  
   - Refreshes all widgets by re-fetching data from the backend.

---

#### **2. UI & Interaction Flow**
1. **Search Functionality**  
   - Uses `usePlacesAutocomplete` for Google Places suggestions.
   - Displays search results in a dropdown list.
   - Allows selection of a location to add as a widget.

2. **Widget Management**  
   - Displays weather widgets in a responsive grid.
   - Each widget shows:
     - Location name
     - Current weather (temperature, humidity, wind)
     - Timestamp of last update
   - Provides delete and refresh actions per widget.

3. **Loading & Error States**  
   - Shows loading spinners during API calls.
   - Displays error messages if API requests fail.

---

#### **3. Data Flow**
1. **Initial Load**  
   - Fetches saved widgets on component mount.

2. **Adding a Widget**  
   - User searches for a location → selects result → widget is created and saved.

3. **Deleting a Widget**  
   - User clicks delete → widget is removed from backend and state.

4. **Refreshing Data**  
   - Manual refresh triggers re-fetch of all widgets.

---

---

### **Backend Server Documentation**

Backend :
http://localhost:5001

#### **1. Server Setup**
- **Framework**: Express.js  
- **Middleware**:  
  - `cors()`: Enables Cross-Origin Resource Sharing (CORS) for frontend (http://localhost:3000).  
  - `express.json()`: Parses incoming JSON requests.  

#### **2. Mock Data**
- **`sampleWidgets`**:  
  - Hardcoded array of 3 weather widgets (Berlin, Paris, New York).  
  - Each widget includes:  
    - Unique `id`, `name`, `description`.  
    - `location` with display names and coordinates.  
    - `weather` data (temperature, humidity, wind, units).  
    - Timestamps (`createdAt`, `updatedAt`).  

#### **3. MongoDB Setup (Commented Out)**
- **Connection**:  
  - Uses `mongoose.connect()` (disabled in current implementation).  
- **Schema**:  
  - `widgetSchema`: Defines structure for widgets in MongoDB (unused in mock mode).  

#### **4. API Endpoints**
1. **`POST /api/widgets`**  
   - **Purpose**: Add a new weather widget.  
   - **Request Body**: Requires `name` and `location.coordinates`.  
   - **Response**:  
     - Success: `201 Created` with the new widget.  
     - Error: `400` (validation) or `500` (server error).  

2. **`GET /api/widgets`**  
   - **Purpose**: Fetch all widgets.  
   - **Response**:  
     - Success: `200 OK` with `sampleWidgets` array.  
     - Error: `500` (server error).  

3. **`DELETE /api/widgets/:id`**  
   - **Purpose**: Delete a widget by ID.  
   - **Response**:  
     - Success: `200 OK` with remaining widget count.  
     - Error: `404` (not found) or `500` (server error).  

#### **5. Error Handling**
- All endpoints include `try/catch` blocks to handle errors.  
- Returns JSON with `success`, `message`, and contextual data.  

#### **6. Server Execution**
- **Port**: `5001` (http://localhost:5001).  
- **Start Command**: `node server.js` (logs confirmation on startup).  

---

