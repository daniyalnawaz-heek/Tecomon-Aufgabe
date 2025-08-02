const { fetchWeatherApi } = require('openmeteo');

const SELECTED_VARIABLES = ["temperature_2m", "relative_humidity_2m", "rain", "wind_speed_10m",];

export const getWeatherData = async (widget) => {
  try {
    const params = {
      latitude: widget.lat,
      longitude: widget.lon,
      current: SELECTED_VARIABLES,
    };

    const url = "https://api.open-meteo.com/v1/forecast";
    const responses = await fetchWeatherApi(url, params);
    const response = responses[0];
    const utcOffsetSeconds = response.utcOffsetSeconds();
    const current = response.current();

    const processedData = {
      data: {
        current: {},
      }
    };

  
    SELECTED_VARIABLES.forEach((variable, index) => {
      processedData.data.current[variable] = current.variables(index)?.value();
    });

    return processedData;
  } catch (error) {
    throw new Error('Failed to fetch weather data');
  }
};

