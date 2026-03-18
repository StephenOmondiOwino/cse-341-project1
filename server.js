require('dotenv').config();
const express = require('express');
const bodyParser = require('body-parser');
const swaggerUi = require('swagger-ui-express');
const swaggerDocument = require('./swagger-output.json');
const mongodb = require('./data/database');

const app = express();
const PORT = process.env.PORT || 3000;

// Middleware
app.use(express.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerDocument));

// Routes
// This single line points to routes/index.js, which should handle /users
app.use('/', require('./routes'));

// MongoDB initialization and Server Start
mongodb.initDb((err) => {
  if (err) {
    console.error('Database connection failed:', err);
  } else {
    app.listen(PORT, () => {
      console.log(`Database connected and server running on port ${PORT}`);
      console.log(`View API Docs at http://localhost:${PORT}/api-docs`);
    });
  }
});