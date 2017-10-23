var http = require('http');
var express = require('express');
var app     = express();
var server = require('http').createServer(app);
var io = require('socket.io')(server);
var request = require("request");
var rp = require('request-promise');

var options = {
    uri: 'https://www.alphavantage.co/query?function=TIME_SERIES_INTRADAY&symbol=MSFT&interval=1min&apikey=NFJWJS522SMB1UTT',
    headers: {
        'User-Agent': 'Request-Promise'
    },
    json: true // Automatically parses the JSON string in the response
};

io.on('connection', function (socket) {
//NFJWJS522SMB1UTT
//https://www.alphavantage.co/
    socket.on("get stocks", function(){
       getStockData()
    });
    
    function getStockData() {
        rp(options)
            .then(function (data) {
                console.log(data)
                socket.emit("recieve stocks", data)
            })
            .catch(function (err) {
                // API call failed...
            });
    }
});




app.use(express.static(__dirname + '/public'));

server.listen(process.env.PORT || 3000, function () {
  console.log('Server listening at port %d 3000');
});