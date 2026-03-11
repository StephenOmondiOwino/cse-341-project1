const { MongoClient } = require('mongodb');

let database;

const initDb = async (callback) => {
  if (database) {
    console.log('Database already initialized');
    return callback(null, database);
  }

  try {
    const client = new MongoClient(process.env.MONGODB_URI);
    await client.connect();
    database = client.db('Project1');
    console.log('Database connected');
    callback(null, database);
  } catch (err) {
    callback(err);
  }
};

const getDb = () => {
  return database;
};

module.exports = { initDb, getDb };