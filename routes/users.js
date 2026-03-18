const router = require('express').Router();
const { ObjectId } = require('mongodb');
const mongodb = require('../data/database');

router.get('/', async (req, res) => {
  try {
    const db = mongodb.getDb();
    const users = await db.collection('Users').find({}).toArray();
    res.json(users);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

router.get('/:id', async (req, res) => {
  try {
    const db = mongodb.getDb();
    const user = await db.collection('Users').findOne({ _id: new ObjectId(req.params.id) });
    if (!user) return res.status(404).json({ message: 'User not found' });
    res.json(user);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

module.exports = router;