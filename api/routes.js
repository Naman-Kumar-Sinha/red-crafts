var express = require('express');
var router = express.Router();
var mw = require('./mw.js');

router.get('/', mw.default);


module.exports = router;