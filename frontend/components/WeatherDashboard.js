'use client';

import React, { useState, useEffect } from 'react';
import axios from 'axios';

import usePlacesAutocomplete from 'use-places-autocomplete';
import { 
  Typography, 
  Box, 
  Button, 
  CircularProgress,
  TextField,
  Paper,
  Grid,
  List,
  Divider,
  ListItem,
  ListItemText,
  IconButton
} from '@mui/material';
import SearchIcon from '@mui/icons-material/Search'; 
import { searchLocations } from '/Users/daniyalnawaz/Desktop/aufgabe/Tecomon-Aufgabe/backend/services/location.service.js';
import { getWeatherData } from '../../backend/services/weather.service';
import WeatherWidget from './WeatherWidget';




// Main WeatherDashboard Component
const WeatherDashboard = () => {

  const [widgets, setWidgets] = useState([]);
  const [searchResults, setSearchResults] = useState([]);
  const [loading, setLoading] = useState({
    widgets: true,
    search: false,
    operations: false
  });
  const [error, setError] = useState(null);
  
  const {
    ready,
    value,
    suggestions: { status, data },
    setValue,
    clearSuggestions,
  } = usePlacesAutocomplete();

  useEffect(() => {
    const loadInitialData = async () => {
      try {
        // First try to load from backend
        await fetchAllWidgets()
       // await fetchWidgets();
      } catch (err) 
      
      {
        console.error('Failed to load from backend:', err);
          
      }
    };
    
    loadInitialData();
  }, []);

 

  const fetchAllWidgets = async () => {
    try {
      setLoading(prev => ({ ...prev, widgets: true }));
      const response = await axios.get('http://localhost:5001/api/widgets');
      setWidgets(response.data.data); 
      setError(null);
    
    } catch (error) {
      console.error('Error fetching widgets:', error);
      throw error; // Let the caller handle this
    } finally {
      setLoading(prev => ({ ...prev, widgets: false }));
    }
  };


  const createNewWidget =  (widget, weatherData) => {

    const shortName = widget.name.split(',')[0].trim().toLowerCase().substring(0, 3);
    const randomNum = Math.floor(Math.random() * 900) + 100;

    const newWidget = {
      id: `${shortName}${randomNum}`,  
      name: widget.name,
      description: `Current weather conditions in ${widget.name}`,
      location: {
        display_name: widget.display_name,
        short_name: widget.name,
        coordinates: {
          lat: widget.lat,
          lon: widget.lon
        }
      },
      weather: {
        timestamp: Date.now(),
        formatted_time: new Date().toLocaleDateString('en-US', {
          weekday: 'long',
          month: 'long',
          day: 'numeric',
          year: 'numeric'
        }),
        temperature: weatherData.data.current.temperature_2m,
        humidity: weatherData.data.current.relative_humidity_2m,
        rain:weatherData.data.current.rain,
        wind: weatherData.data.current.wind_speed_10m,
        unit: {
          temperature: "°C",
          precipitation: "mm"
        }
      },
      createdAt: new Date().toISOString(), // Current timestamp
      updatedAt: new Date().toISOString()  // Current timestamp
    };

    return newWidget;
  }


  const addNewWidget = async (result) => {
    try {
      setLoading(prev => ({ ...prev, operations: true }));
      setError(null);
  
      // Check for duplicates
      if (widgets.some(w => w?.name === result?.name)) {
        setError('Location already exists');
        return;
      }
  
      const weatherData = await getWeatherData(result);
      const newWidget = createNewWidget(result, weatherData);
  
      // Save to backend
      const response = await axios.post('http://localhost:5001/api/widgets', newWidget, {
        headers: { 'Content-Type': 'application/json' }
      });

      if (response.status === 200) {
        console.log('Succesfully created');
        return;
      }
      // Update state with the created widget
      setWidgets(prev => [...prev, response.data.data]); // Use the response data
      setValue('');
      
      return response.data;
    } catch (error) {
      console.error('Error adding widget:', error);
      setError(error.response?.data?.message || 'Failed to add location');
      throw error;
    } finally {
      setLoading(prev => ({ ...prev, operations: false }));
    }
  };

  const removeWidget = async (id) => {
    try {
      setLoading(prev => ({ ...prev, operations: true }));
      setError(null);
  
      if (!id || typeof id !== 'string') {
        throw new Error('Invalid widget ID');
      }
  
      const response = await axios.delete(`http://localhost:5001/api/widgets/${id}`);
      
      if (response.status === 200) {
        setWidgets(prev => prev.filter(widget => widget.id !== id));
        return;
      }
  
      throw new Error(`Unexpected status code: ${response.status}`);
    } catch (error) {
      console.error('Error deleting widget:', error);
      setError(error.response?.data?.message || 'Failed to remove location');
      throw error;
    } finally {
      setLoading(prev => ({ ...prev, operations: false }));
    }
  };


  // ==================== HANDLERS ====================
  const handleSearch = async () => {
   const results = await searchLocations(value);
    setSearchResults(results);
    console.log(results);
  };

  const handleSelect = async (address) => { 
    setValue(address, false);
    clearSuggestions();
    setSearchResults([]); // Clear search results
  };



  const refreshAll = async () => {
    await fetchAllWidgets(setLoading,setWidgets,setError);
   // await fetchWidgets();
  };

  return (
    <Box sx={{ p: 3 }}>
      {/* Error Display */}
      {error && (
        <Typography color="error" sx={{ mb: 2 }}>
          {error}
        </Typography>
      )}
  
      {/* Search Section */}
      <Box sx={{ display: 'flex', gap: 2, mb: 3, flexDirection: { xs: 'column', sm: 'row' } }}>
      <Box sx={{ flexGrow: 1 }}>
  <TextField
    fullWidth
    value={value}
    onChange={(e) => {
      setValue(e.target.value);
      
      if (e.target.value === '') {
        setSearchResults([]);
      }
    }}
    disabled={ready}
    placeholder="Search for a city"
    variant="outlined"
    size="small"
    onKeyPress={(e) => e.key === 'Enter' && handleSearch()}
  />
  
  {/* Google Suggestions */}
  {status === 'OK' && (
    <Paper sx={{ mt: 1, maxHeight: 200, overflow: 'auto' }}>
      <List>
        {data.map(({ place_id, description }) => (
          <ListItem 
            button 
            key={place_id}
            onClick={() => {
              handleSelect(description);
              handleSearch(); // Trigger search after selection
            }}
          >
            <ListItemText primary={description} />
          </ListItem>
        ))}
      </List>
    </Paper>
  )}

  {/* Search Results */}
  {loading.search ? (
    <Box sx={{ display: 'flex', justifyContent: 'center', py: 2 }}>
      <CircularProgress size={24} />
    </Box>
  ) : searchResults.length > 0 && (
    <Paper sx={{ mt: 1, maxHeight: 200, overflow: 'auto' }}>
      <List>
        {searchResults.map((result, index) => (
          <ListItem 
            button 
            key={index}
            onClick={() => {
              addNewWidget(result,setLoading,setError,widgets,setWidgets,setValue);
            // addNewWidget(result);
              setSearchResults([]); // Clear results after selection
            }}
            disabled={loading.operations}
          >
            <ListItemText 
              primary={result.display_name} 
              secondary={`Lat: ${result.lat.toFixed(4)}, Lon: ${result.lon.toFixed(4)}`}
            />
          </ListItem>
        ))}
      </List>
    </Paper>
  )}
</Box>
  
        {/* Action Buttons */}
        <Box sx={{ display: 'flex', gap: 1, alignItems: 'flex-start' }}>
          <Button 
            variant="contained" 
            startIcon={<SearchIcon />}
            onClick={handleSearch}
            disabled={!value.trim() || loading.search || loading.operations}
          >
            Search
          </Button>
          
        </Box>
      </Box>
  
      {/* Widgets Grid */}
      {loading.widgets && widgets.length === 0 ? (
        <Box sx={{ display: 'flex', justifyContent: 'center', py: 4 }}>
          <CircularProgress />
        </Box>
      ) : (
        <Grid container spacing={2}>
          {Array.isArray(widgets) && widgets.map((widget) => (
            <Grid item xs={12} sm={6} md={4} key={widget.id }>
              <WeatherWidget 
                widget={widget}
                onDelete={() => removeWidget(widget.id,setLoading,setError,setWidgets)}
                //onDelete={() => removeWidget(widget.id)}
                onRefresh={refreshAll}
              />
            </Grid>
          ))}
        </Grid>
      )}
    </Box>
  );
};

export default WeatherDashboard;