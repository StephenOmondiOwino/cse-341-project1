const mongodb = require('../data/database');
const { ObjectId } = require('mongodb');

const getAllUsers = async (req, res) => {
  try {
    const db = mongodb.getDb();
    const users = await db.collection('Users').find().toArray();
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
      .findOne({ _id: new ObjectId(req.params.id) });

    if (!user) return res.status(404).json({ message: 'User not found' });

    res.status(200).json(user);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

const createUser = async (req, res) => {
  try {
    const db = mongodb.getDb();

    const user = {
      firstName: req.body.firstName,
      lastName: req.body.lastName,
      email: req.body.email,
      password: req.body.password,
      favoriteColor: req.body.favoriteColor,
      birthday: req.body.birthday
    };

    const response = await db.collection('Users').insertOne(user);

    if (response.acknowledged) {
      res.status(201).json({
        message: 'User created successfully',
        id: response.insertedId
      });
    } else {
      res.status(500).json({ error: 'Failed to create user' });
    }

  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

const updateUser = async (req, res) => {
  try {
    const db = mongodb.getDb();

    const updatedUser = {
      firstName: req.body.firstName,
      lastName: req.body.lastName,
      email: req.body.email,
      password: req.body.password,
      favoriteColor: req.body.favoriteColor,
      birthday: req.body.birthday
    };

    const result = await db.collection('Users').updateOne(
      { _id: new ObjectId(req.params.id) },
      { $set: updatedUser }
    );

    if (result.matchedCount === 0)
      return res.status(404).json({ message: 'User not found' });

    res.status(200).json({ message: 'User updated successfully' });

  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

const deleteUser = async (req, res) => {
  try {
    const db = mongodb.getDb();

    const result = await db
      .collection('Users')
      .deleteOne({ _id: new ObjectId(req.params.id) });

    if (result.deletedCount === 0)
      return res.status(404).json({ message: 'User not found' });

    res.status(200).json({ message: 'User deleted successfully' });

  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

module.exports = {
  getAllUsers,
  getSingleUser,
  createUser,
  updateUser,
  deleteUser
};