const express = require('express');
const app = express();
const router = express.Router();
const isAuthenticated = require('../config/isAuthenticated')


router.get('/',isAuthenticated ,(req, res) => {
    const user = req.user;
    res.render('Home', { title: 'Home',user });
});

router.get('/login', function(req, res) {
    res.render('Login', { title: 'Login',layout:'base2' });
  });

  router.get('/dashboard', isAuthenticated, (req, res) => {
    const user = req.user;
    res.render('Dashboard', { title: 'Dashboard', layout: 'base1',user });
  });
  
  


module.exports = router;