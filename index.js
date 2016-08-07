var express = require('express');
var moment = require('moment');
var app = express();



app.get('/', function(req, res) {
    res.sendFile(__dirname + '/public/index.html');
});

app.get('/api', function(req, res) {
    var natural;
    var unix;
    
    console.log(req.query.date);
    if (req.query.date == undefined) {
        res.send({'notValid' : 'Please enter a date in either unix or natural format'});
    }
    
    if (isNaN(req.query.date) == false) {
        unix = req.query.date;
        natural = moment.unix(unix).format('MMMM DD, YYYY');
        
    }
    
    if (isNaN(req.query.date) == true) {
        natural = req.query.date;
        unix = moment(natural).unix();
    }
    
    res.send(
            {
                'unix': unix,
                'natural': natural
                
            }
        );
    
});


var port = process.env.PORT || 8080;
app.listen(port, function() {
    console.log('Listening on port: ' + port);
});