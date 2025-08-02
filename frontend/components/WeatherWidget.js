'use client';

import React, { useState, useEffect } from 'react';
import { fetchWeatherApi } from 'openmeteo';

import { 
  Typography, 
  Box,  
  CircularProgress,

  Paper,
  Divider,

  IconButton,
} from '@mui/material';
 
import CloudIcon from '@mui/icons-material/Cloud';

import DeleteIcon from '@mui/icons-material/Delete';
import RefreshIcon from '@mui/icons-material/Refresh';
import WeatherStatItem from './WeatherStatItem';

import { getWeatherData} from '/Users/daniyalnawaz/Desktop/aufgabe/Tecomon-Aufgabe/backend/services/weather.service.js';

const SELECTED_VARIABLES = [
    'temperature_2m',
    'relative_humidity_2m',
    'rain',
    'snowfall',
    'weather_code'
  ];

const WeatherWidget = ({ widget, onDelete, onRefresh }) => {
    const [weatherWidget, setWeatherWidget] = useState(widget);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);
  
    const fetchWeather = async (widget) => {
      setLoading(true);
      setError(null);
      
      try {
        
        const processedData = await getWeatherData(widget)
        
  
        setWeatherData(processedData);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };
  
    useEffect(() => {
      if (widget.location) {
        fetchWeather(weatherWidget);
      }
    }, [widget]);
  
    const formatDate = (date) => {
      return new Date(date).toLocaleDateString('en-US', { 
        weekday: 'long', 
        day: 'numeric', 
        month: 'long', 
        year: 'numeric' 
      });
    };
  
   
  
    return (
      <Paper elevation={3} sx={{ p: 2, mb: 2, position: 'relative' }}>
        <Box sx={{ position: 'absolute', top: 0.5, right: 8, display: 'flex' }}>
        <IconButton 
    onClick={onDelete} 
    size="small"
    sx={{ color: 'red' }}  // This makes the icon red
  >
    <DeleteIcon fontSize="small" />
  </IconButton>
          <IconButton 
            onClick={() => {
              onRefresh();
              fetchWeather(weatherWidget);
            }}
            size="small"
            disabled={loading}
          >
            {loading ? <CircularProgress size={20} /> : <RefreshIcon fontSize="small" />}
          </IconButton>
        </Box>
        
        {weatherWidget ? (
          <>
            <Typography variant="h6" fontWeight="bold">
              {weatherWidget.name}
            </Typography>

            
            <Typography variant="caption" color="text.secondary">
              {weatherWidget.weather.formatted_time}
            </Typography>
  
            <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'center', my: 1 }}>
              <CloudIcon sx={{ fontSize: 60, color: 'primary.main', mr: 2 }} />
              <Typography variant="h4">
              {parseFloat(weatherWidget.weather.temperature).toFixed(1)}°
              </Typography>
            </Box>
  
            <Divider sx={{ my: 1 }} />
            <Box sx={{ display: 'flex', justifyContent: 'space-between' }}>
              <WeatherStatItem label="Humidity" value={parseFloat(weatherWidget.weather.humidity).toFixed(0)} />
              <WeatherStatItem 
  label="Rain" 
  value={parseFloat(weatherWidget.weather.rain) === 0 ? 'N/A' : parseFloat(weatherWidget.weather.rain).toFixed(0)}
  unit={parseFloat(weatherWidget.weather.rain) === 0 ? '' : 'mm'}
/>
<WeatherStatItem 
  label="Wind"
  value={`${parseFloat(weatherWidget.weather.wind).toFixed(0)} km/hr`}
/>
            </Box>
          </>
        ) : error ? (
          <Typography color="error">{error}</Typography>
        ) : (
          <Box sx={{ display: 'flex', justifyContent: 'center', py: 2 }}>
            <CircularProgress size={24} />
          </Box>
        )}
      </Paper>
    );
  };


  export default  WeatherWidget;