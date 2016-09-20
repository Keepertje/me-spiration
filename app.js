var express = require('express');

var app = express();


var apiRouter = require('./backend/api/router');
var frontendRouter = require('./backend/frontend/router');

/*app.get('*',function(req,res,next){
  if(req.headers['x-forwarded-proto']!='https'){
    //make sure we are going to https because of the geolocation.
    res.redirect('https://routespiration.herokuapp.com'+req.url)
  }
  else{
    next() /
  }
})*/

// Link /api to the api router
app.use('/api', apiRouter);

//Serve the frontend.
app.use('/', frontendRouter);


app.listen(process.env.PORT || 3000, function(){
  console.log("Express server listening on port %d in %s mode", this.address().port, app.settings.env);
});