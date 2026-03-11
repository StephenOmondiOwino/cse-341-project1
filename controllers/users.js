const mongodb = require('../data/database');
const { ObjectId } = require('mongodb');

const getAllUsers = async (req, res) => {
  try {
    const db = mongodb.getDb(); // get the database instance
    const users = await db.collection('Users').find({}).toArray(); // fetch all users
    res.header('Content-Type', 'application/json');
    res.status(200).json(users);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

const getSingleUser = async (req, res) => {
  try {
    const db = mongodb.getDb();
    const user = await db
      .collection('Users')
      .findOne({ _id: new ObjectId(req.params.id) }); // fetch by id
    if (!user) return res.status(404).json({ message: 'User not found' });
    res.header('Content-Type', 'application/json');
    res.status(200).json(user);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

module.exports = { getAllUsers, getSingleUser };