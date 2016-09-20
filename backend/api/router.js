var express = require('express');
var login = require('./login/login.js');
var activities = require('./activities/activities.js');

var router = express.Router();

router.use('/activities', activities);
router.use('/login', login);

module.exports =  router;