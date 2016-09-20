var express = require('express');
var request = require('request')
var app = express.Router();


app.get('/:token', function(req,res){

 var endpoint = 'https://www.strava.com/api/v3/athlete/activities?per_page=200';

    var url = endpoint
        , options = {
            url: url
            , method: 'GET'
            , json: true
            , headers: {
                Authorization: 'Bearer ' + req.params.token
            }
        };

    request(options, function (err, response, payload) {
        if (err  || response.statusCode !== 200) {
            console.log('api call error');
            console.log(err);
        }

        res.status(response.statusCode).send(payload)
    });
           
})

           
module.exports = app;
