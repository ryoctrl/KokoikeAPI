var express = require('express');
var router = express.Router();
const crypto = require('../lib/crypto');

router.get('/', function(req, res, next) {
    res.status(404);
    res.json({
        message: 'No service'
    });
});

module.exports = router;
