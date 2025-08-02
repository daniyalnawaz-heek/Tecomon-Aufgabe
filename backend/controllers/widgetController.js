
import { addWidget, deleteWidgetById, getAllWidgets } from '../services/WidgetService';


//for mocking API
/*
const sampleWidgets = [
  {
    id: "ber123",
    name: "Berlin ",
    description: "Current weather conditions in Berlin",
    location: {
      display_name: "Berlin, Germany",
      short_name: "Berlin",
      coordinates: {
        lat: 52.5200,
        lon: 13.4050
      }
    },
    weather: {
      timestamp: new Date("2023-11-15T14:30:00Z"),
      formatted_time: "Wednesday, November 15, 2023",
      temperature: 8,
      humidity: 78,
      wind: 0.5,
      unit: {
        temperature: "°C",
        precipitation: "mm"
      }
    },
    createdAt: new Date("2023-11-10T09:15:00Z"),
    updatedAt: new Date("2023-11-15T14:30:00Z")
  },
  {
    id: "par456",
    name: "Paris ",
    description: "Current weather conditions in Paris",
    location: {
      display_name: "Paris, Île-de-France, France",
      short_name: "Paris",
      coordinates: {
        lat: 48.8566,
        lon: 2.3522
      }
    },
    weather: {
      timestamp: new Date("2023-11-15T14:45:00Z"),
      formatted_time: "Wednesday, November 15, 2023",
      temperature: 12,
      humidity: 65,
      precipitation: 0.2,
      unit: {
        temperature: "°C",
        precipitation: "mm"
      }
    },
    createdAt: new Date("2023-11-08T11:20:00Z"),
    updatedAt: new Date("2023-11-15T14:45:00Z")
  },
  {
 
    id: "nyc789",
    name: "New York ",
    description: "Current weather conditions in New York",
    location: {
      display_name: "New York, NY, USA",
      short_name: "New York",
      coordinates: {
        lat: 40.7128,
        lon: -74.0060
      }
    },
    weather: {
      timestamp: new Date("2023-11-15T09:30:00Z"),
      formatted_time: "Wednesday, November 15, 2023",
      temperature: 15,
      humidity: 62,
      precipitation: 0,
      unit: {
        temperature: "°C",
        precipitation: "mm"
      }
    },
    createdAt: new Date("2023-11-05T16:45:00Z"),
    updatedAt: new Date("2023-11-15T09:30:00Z")
  }
];

*/


export const addNewWidget = async (req, res) => {
  try {
  
    const widget = req.body;
    
    if (!widget) {
      return res.status(400).json({
        success: false,
        message: 'Invalid widget data format'
      });
    }


    // 3. Add the widget
    const res = await addWidget(widgetData);

    // 4. Return success response
    return res.status(201).json({
      success: true,
      data: res.data,
      message: 'Widget created successfully'
    });

  } catch (error) {
    console.error('Error in addNewWidget:', error);
    
    // 5. Return error response
    return res.status(500).json({
      success: false,
      message: 'Failed to create widget',
      error: process.env.NODE_ENV === 'development' ? error.message : undefined
    });
  }
};

export const removeWidget = async (req, res) => {
  try {
    // Validate request parameters
    const { id } = req.params; // Using params instead of body for DELETE requests
    
    if (!id) {
      return res.status(400).json({
        success: false,
        message: 'Widget ID is required'
      });
    }

    // Delete the widget
    const result = await deleteWidgetById(id); // Using MongoDB's _id
    // OR if using custom id field:
    // const result = await Widget.deleteOne({ id: id });

    if (!result) {
      return res.status(404).json({
        success: false,
        message: 'Widget not found'
      });
    }

    // Successful response
    return res.status(200).json({
      success: true,
      message: 'Widget deleted successfully'
    });

  } catch (error) {
    console.error('Error deleting widget:', error);
    
    // Error response
    return res.status(500).json({
      success: false,
      message: 'Failed to delete widget',
      error: process.env.NODE_ENV === 'development' ? error.message : undefined
    });
  }
};
export const fetchWidgets = async (req, res) => {
  try {
    const result = await getAllWidgets();
    
    // Successful response

    if(result.success){
    res.status(200).json({
      success: true,
      count: result.data.length,
      data: result.data
    });

  }
    
  } catch (error) {
    console.error('Error fetching widgets:', error);
    
    // Error response
    res.status(500).json({
      success: false,
      message: 'Failed to fetch widgets',
      error: process.env.NODE_ENV === 'development' ? error.message : undefined
    });
  }
};