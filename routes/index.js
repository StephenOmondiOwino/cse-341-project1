const router = require('express').Router();


router.get('/', (req, res) => {
  res.send('Welcome to the CSE 341 API. Visit /api-docs for documentation.');
});

router.use('/users', require('./users'));

module.exports = router;