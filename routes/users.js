const router = require('express').Router();
const { ObjectId } = require('mongodb');
const mongodb = require('../data/database');

// GET all users
router.get('/', async (req, res) => {
  const result = await mongodb.getDb().collection('Users').find();
  result.toArray().then((lists) => {
    res.setHeader('Content-Type', 'application/json');
    res.status(200).json(lists);
  });
});

// GET single user
router.get('/:id', async (req, res) => {
  const userId = new ObjectId(req.params.id);
  const result = await mongodb.getDb().collection('Users').find({ _id: userId });
  result.toArray().then((lists) => {
    res.setHeader('Content-Type', 'application/json');
    res.status(200).json(lists[0]);
  });
});

// POST - Create a new user
router.post('/', async (req, res) => {
  const user = {
    firstName: req.body.firstName,
    lastName: req.body.lastName,
    email: req.body.email,
    favoriteColor: req.body.favoriteColor,
    birthday: req.body.birthday
  };
  const response = await mongodb.getDb().collection('Users').insertOne(user);
  if (response.acknowledged) {
    res.status(201).json(response);
  } else {
    res.status(500).json(response.error || 'Some error occurred while creating the contact.');
  }
});

router.put('/:id', async (req, res) => {
  const userId = new ObjectId(req.params.id);
  const user = {
    firstName: req.body.firstName,
    lastName: req.body.lastName,
    email: req.body.email,
    favoriteColor: req.body.favoriteColor,
    birthday: req.body.birthday
  };
  const response = await mongodb.getDb().collection('Users').replaceOne({ _id: userId }, user);
  if (response.modifiedCount > 0) {
    res.status(204).send();
  } else {
    res.status(500).json(response.error || 'Some error occurred while updating the contact.');
  }
});

// DELETE - Remove a user
router.delete('/:id', async (req, res) => {
  const userId = new ObjectId(req.params.id);
  const response = await mongodb.getDb().collection('Users').deleteOne({ _id: userId });
  if (response.deletedCount > 0) {
    res.status(200).send();
  } else {
    res.status(500).json(response.error || 'Some error occurred while deleting the contact.');
  }
});

module.exports = router;