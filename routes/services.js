const express = require('express');

var router = express.Router();

var producName_controller = require('../controllers/productController');
var imageGenerator_controller = require('../controllers/imageController');

// Product Name Generator
router.get('/product', producName_controller.index);


// Image Generator
router.get('/image', imageGenerator_controller.index);

module.exports = router;