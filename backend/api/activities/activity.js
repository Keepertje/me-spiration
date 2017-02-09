var express = require('express');
var request = require('request');
var async = require('async')
var app = express.Router();


app.get('/:id/:token', function (req, res) {

    var endpoint = 'https://www.strava.com/api/v3/activities/';

    var actEndpoint = endpoint + req.params.id;
    var url = actEndpoint
        , options = {
            url: url
            , method: 'GET'
            , json: true
            , headers: {
                Authorization: 'Bearer ' + req.params.token
            }
        };


    request(options, function (err, response, payload) {
        if (err || response.statusCode !== 200) {
            console.log('api call error');
            console.log(err);
        }

        res.status(response.statusCode).send(payload)
    });
})



module.exports = app;
