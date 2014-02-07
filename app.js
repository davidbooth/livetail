//Simple livetail example shows how to stream a tail via socket.io

var fs   = require("fs"),
    app  = require('http').createServer(handler),
    io   = require('socket.io').listen(app,{ log: false }),
    fs   = require('fs');


//Init livetail 
var livetail = require("./livetail").livetail;
var tail = new livetail('testfile.txt');

tail.on('data',function(data){
  console.log(data);
  io.sockets.emit('newData', data);
});


//Basic file Server
app.listen(8080);

function handler (req, res) {
  fs.readFile(__dirname + '/index.html',
  function (err, data) {
    if (err) {
      res.writeHead(500);
      return res.end('Error loading index.html');
    }

    res.writeHead(200);
    res.end(data);
  });
}