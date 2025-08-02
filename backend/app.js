const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');

const app = express();
app.use(cors());
app.use(express.json());

const widgetRoutes = require('/Users/daniyalnawaz/Desktop/aufgabe/Tecomon-Aufgabe/backend/routes/widgetRoutes.js');

app.use(cors({
    origin: 'http://localhost:3000', // Your frontend URL
    credentials: true
  }));
 
  app.use('/api', widgetRoutes);



const PORT =  5001;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));