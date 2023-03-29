const express = require('express');
const app = express();
const router = express.Router();

router.get('/', (req, res) => {
    res.render('Home', { title: 'Home' });
});

router.get('/login', function(req, res) {
    res.render('login');
  });
  

  // Logout route

module.exports = router;