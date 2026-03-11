require('dotenv').config();
const express = require('express');
const app = express();
const PORT = process.env.PORT || 3000;

const mongodb = require('./data/database');


const indexRoutes = require('./routes/index');  
const usersRoutes = require('./routes/users');  

// Middleware
app.use(express.json());

// Mount routes
app.use('/', indexRoutes);
app.use('/users', usersRoutes);

// Initialize DB and start server
mongodb.initDb((err) => {
  if (err) {
    console.log(err);
  } else {
    app.listen(PORT, () => {
      console.log(`Server running and listening on port ${PORT}`);
    });
  }
});