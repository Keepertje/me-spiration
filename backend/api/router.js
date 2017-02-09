var express = require('express');
var login = require('./login/login.js');
var activities = require('./activities/activities.js');
var activity = require('./activities/activity.js');
var photos = require('./activities/photos.js');

var router = express.Router();

router.use('/activities', activities);
router.use('/activity', activity);
router.use('/photos', photos);
router.use('/login', login);

module.exports =  router;