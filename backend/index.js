const express = require('express');
const connectToMongo = require('./db');
const cors = require('cors');
const path = require('path');

// Connect to MongoDB
connectToMongo();

const app = express();
const port = process.env.PORT || 5000;

// Middleware
app.use(cors());
app.use(express.json());
app.use('/uploads', express.static(path.join(__dirname, 'uploads')));

// Routes
app.use('/api/user', require('./routes/user'));
app.use('/api/gym', require('./routes/gym'));
app.use('/api/package', require('./routes/package'));
app.use('/api/admin', require('./routes/admin'));
app.use('/api/trainer', require('./routes/trainer'));
app.use('/api/purchase', require('./routes/purchase'));
app.use('/api/exercises', require('./routes/exercises'));
app.use('/api/connect', require('./routes/connect'));
app.use('/api/diets', require('./routes/diets'));
app.use('/api', require('./routes/imageRoutes'));

// Start server
app.listen(port, () => {
  console.log(`FitHub app listening on port ${port}`);
});
