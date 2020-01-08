var express = require('express');
var app = express();
var server = require('http').createServer(app);
var io = require('socket.io')(server);
var port = process.env.PORT || 3000;

app.use(express.static('public'));


server.listen(port, function () {
  console.log('Server listening at port %d', port);
});

// Chatroom

var numUsers = 0;
var players = {};

io.on('connection', function (socket) {
  var addedUser = false;

    // create a new player and add it to our players object
	players[socket.id] = {
	  rotation: 0,
	  x: 100,//Math.floor(Math.random() * 700) + 50,
	  y: Object.keys(players).length*100,//Math.floor(Math.random() * 500) + 50,
	  playerId: socket.id,
	  team: (Math.floor(Math.random() * 2) == 0) ? 'red' : 'blue'
	};
	// send the players object to the new player
	socket.emit('currentPlayers', players);
	// update all other players of the new player
	socket.broadcast.emit('newPlayer', players[socket.id]);

  console.log('a user connected');//, players);
  // when the client emits 'new message', this listens and executes
  socket.on('new message', function (data) {
    // we tell the client to execute 'new message'
    socket.broadcast.emit('new message', {
      username: socket.username,
      message: data
    });
  });


  // when the client emits 'add user', this listens and executes
  socket.on('add user', function (username) {
    if (addedUser) return;

    // we store the username in the socket session for this client
    socket.username = username;
    ++numUsers;
    addedUser = true;
    socket.emit('login', {
      numUsers: numUsers
    });

    // echo globally (all clients) that a person has connected
    socket.broadcast.emit('user joined', {
      username: socket.username,
      numUsers: numUsers
    });

    
  });

  // when the client emits 'typing', we broadcast it to others
  socket.on('typing', function () {
    socket.broadcast.emit('typing', {
      username: socket.username
    });
  });

  // when the client emits 'stop typing', we broadcast it to others
  socket.on('stop typing', function () {
    socket.broadcast.emit('stop typing', {
      username: socket.username
    });
  });

  // when the user disconnects.. perform this
  socket.on('disconnect', function () {
    if (addedUser) {
      --numUsers;

      // echo globally that this client has left
      socket.broadcast.emit('user left', {
        username: socket.username,
        numUsers: numUsers
      });
    }

    delete players[socket.id];
    console.log(socket.id+"left")
    // emit a message to all players to remove this player
    io.emit('disconnect', socket.id);

  });


  // when a player moves, update the player data
	socket.on('playerMovement', function (movementData) {
	   console.log(movementData)
	  players[socket.id].x = movementData.x;
	  players[socket.id].y = movementData.y;
	  players[socket.id].rotation = movementData.rotation;
	  // emit a message to all players about the player that moved
	  socket.broadcast.emit('playerMoved', players[socket.id]);
	});

});