const mongoose = require('mongoose');



const widgetSchema = new mongoose.Schema({
    id: {   // Additional identifier if needed (can be used for external references)
      type: String,
      unique: true,
      default: () => Math.random().toString(36).substring(2, 9)
    },
    name: {
      type: String,
      required: true
    },
    description: String,
    location: {
      display_name: String,
      short_name: String,
      coordinates: {
        lat: Number,
        lon: Number
      }
    },
    weather: {
      timestamp: {
        type: Date,
        default: Date.now
      },
      formatted_time: String,
      temperature: Number,
      humidity: Number,
      wind: Number,
      rain: Number,
      unit: {
        temperature: {
          type: String,
          default: "°C"
        },
        precipitation: {
          type: String,
          default: "mm"
        }
      }
    },
    createdAt: {
      type: Date,
      default: Date.now
    },
    updatedAt: {
      type: Date,
      default: Date.now
    }
});


module.exports = mongoose.model('Widget', widgetSchema);