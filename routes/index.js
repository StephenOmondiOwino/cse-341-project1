const router = require('express').Router();

router.get('/', (req, res) => {res.send('Welcome to the home page!')});

router.get('/about', (req, res) => {res.send('Hello World!')});
module.exports = router;