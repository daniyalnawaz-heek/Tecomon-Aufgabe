const axios = require('axios');

export const searchLocations = async (query) => {
  try {
    const response = await axios.get(
      `https://nominatim.openstreetmap.org/search?q=${encodeURIComponent(query)}&format=json`
    );
    
    return response.data.map(item => ({
      display_name: item.display_name,
      lat: parseFloat(item.lat),
      lon: parseFloat(item.lon)
    }));
  } catch (error) {
    throw new Error('Failed to search locations');
  }
};

module.exports = { searchLocations };