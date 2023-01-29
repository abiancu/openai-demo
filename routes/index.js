var express = require('express');
var router = express.Router();

/* GET home page. */
router.get('/', function(req, res) {
  let date = new Date();
  let year = date.getFullYear();

  res.render('index', { 
    title: 'Express',
    date: year
    
  });
});

module.exports = router;
