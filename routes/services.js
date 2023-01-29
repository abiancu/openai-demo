const express = require('express');

var router = express.Router();

var producName_controller = require('../controllers/productController');
var imageGenerator_controller = require('../controllers/imageController');

// Product Name Generator
router.get('/product', producName_controller.index);

router.post('/product', producName_controller.generateProductDescription);


// Image Generator
router.get('/image', imageGenerator_controller.index);

router.post('/image', imageGenerator_controller.generateImage)

module.exports = router;