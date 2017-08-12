var app = require('express')();
var http = require('http').Server(app);
var io = require('socket.io')(http);

app.get('/', function(req, res){
  res.sendFile(__dirname + '/index.html');
});



var onevent = socket.onevent;
socket.onevent = function (packet) {
    var args = packet.data || [];
    onevent.call (this, packet);    // original call
    packet.data = ["*"].concat(args);
    onevent.call(this, packet);      // additional call to catch-all
};

io.on('connection', function(socket){
  socket.on("*",function(event,data) {
      io.emit(event, data);
  });
});

http.listen(3001, function(){
  console.log('listening on *:3001');
});

setInterval(function() {
  io.emit("online", io.engine.clientsCount);
}, 1000);
// base code by DatOneLefty
