const express = require('express');

var router = express.Router();

var producName_controller = require('../controllers/productNameController');
var imageGenerator_controller = require('../controllers/imageGeneratorController');

// Product Name Generator
router.get('/productname', producName_controller.index);


// Image Generator
router.get('/imagegenerator', imageGenerator_controller.index);

module.exports = router;