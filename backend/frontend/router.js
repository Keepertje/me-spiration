/* Main router for serving the frontend*/

var express = require('express');
var path = require('path');
var router = express.Router();



router.get('/start', function (req, res, next) {
    req.url = '/index.html';
    next();
});


router.get('/callback', function(req,res,next){
    req.url = '/index.html';
    next();
})

router.get('/activities', function(req,res,next){
    req.url = '/index.html';
    next();
})
router.use(express.static(path.join(__dirname ,'../../public')));

module.exports = router;