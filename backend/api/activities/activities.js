var express = require('express');
var request = require('request');
var async = require('async')
var app = express.Router();


app.get('/:token', function (req, res) {

    var endpoint = 'https://www.strava.com/api/v3/athlete/activities?per_page=200&page=';
    var page = 1;
    var result = []; var temp = [];
    async.whilst(function () {
        return page > -1;
    },
        function (next) {
            var pageEndpoint = endpoint + page;
            var url = pageEndpoint
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
                    res.status(response.statusCode).send(result)

                }
                else {
                    result = payload.concat(result);                 
                    if (payload.length === 0) {
                        page = -99;
                    }
                    else { page += 1; }
                    next();

                }
            });


        },
        function (err) {
            //  console.log('AAAA');
            res.status(200).send(result)
        });

})


module.exports = app;
