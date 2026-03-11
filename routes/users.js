const express = require('express');
const router = express.Router();

const usersController = require('../controllers/users');

// GET all users
router.get('/', usersController.getAllUsers);

// GET single user
router.get('/:id', usersController.getSingleUser);

module.exports = router;