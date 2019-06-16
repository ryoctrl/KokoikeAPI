var express = require('express');
var router = express.Router();

/* GET users listing. */
router.get('/', function(req, res, next) {
    res.stauts(404);
    res.end('page not found');
});

module.exports = router;
