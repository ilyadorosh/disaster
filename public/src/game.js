var game = new Phaser.Game(400, 300);

// List variables which can be easily changed by remixers to alter gameplay 
var gravity = 4000;
var velocity_x = 1200;
var velocity_y = 1200;

// a list of key game elements at the beginning so preload, create and update functions can all access them.
var player; 
var platform1;
var platforms; 
  var coins;
 var coinSound;
var playState = {};
var enemies;
var enemy1;
    var tween1;

    // var players;

playState.preload = function () {
  game.scale.scaleMode = Phaser.ScaleManager.SHOW_ALL;
    game.scale.pageAlignHorizontally = true;
    game.scale.pageAlignVertically = true;
    game.load.crossOrigin = "anonymous";
    game.load.image("background", "https://cdn.glitch.com/9a0b6a3a-c370-4757-a3b9-d89fb3ae483b%2Fbioshock_city_underwater_fan_art_rout_21777_800x1280.jpg?v=1578417551890");
    game.load.spritesheet("player", "https://cdn.glitch.com/5d318c12-590d-47a1-b471-92a5dc0aae9d%2Fhero.png?1539353651099", 36, 42);
    game.load.spritesheet("enemy", "https://cdn.glitch.com/5d318c12-590d-47a1-b471-92a5dc0aae9d%2Fspider.png?1539353651634", 42, 32);
    game.load.image("ground", "https://cdn.glitch.com/5d318c12-590d-47a1-b471-92a5dc0aae9d%2Fground.png?1539357516721");
    game.load.image("grass:4x1", "https://cdn.glitch.com/5d318c12-590d-47a1-b471-92a5dc0aae9d%2Fgrass_4x1.png?1539357516607");
  
    game.load.image("platform", "https://cdn.glitch.com/9a0b6a3a-c370-4757-a3b9-d89fb3ae483b%2Felec.PNG?v=1578279719761");
    game.load.spritesheet("pill", "https://cdn.glitch.com/1d985b53-750d-4dbe-856f-2f14a8171797%2Fpill.png?v=1578495665124", 32, 32);
  
    game.load.spritesheet("coin", "https://cdn.glitch.com/5d318c12-590d-47a1-b471-92a5dc0aae9d%2Fcoin_animated.png", 22, 22);
  game.load.audio("coinwav", "https://cdn.glitch.com/f555a7cf-4ed2-4768-8167-e545853a6981%2Fct_coin_1.wav");

   game.load.spritesheet('hazard', 'https://s3-us-west-2.amazonaws.com/s.cdpn.io/1171931/fire2.png', 11, 27);
 game.load.audio('hazardwav', 'https://s3-us-west-2.amazonaws.com/s.cdpn.io/1171931/splat.wav');
};

playState.create = function () {
    //a list of variables used only by the create function
    var ground;
    // var platform1; 
    var platform2;
    var platform3; 

    // initCreate()
    var self = this;
    this.socket = io();
    this.otherPlayers = this.game.add.group();
    this.socket.on('currentPlayers', function (players) {
        Object.keys(players).forEach(function (id) {
            if (players[id].playerId === self.socket.id) {
                addPlayer(self, players[id]);
            } else {
                addOtherPlayers(self, players[id]);
            }
        });
    });

    this.socket.on('newPlayer', function (playerInfo) {
      addOtherPlayers(self, playerInfo);
    });
    this.socket.on('disconnect', function (playerId) {
      self.otherPlayers.children.forEach(function (otherPlayer) {
        if (playerId === otherPlayer.playerId) {
          otherPlayer.destroy();
        }
      });
    });

    this.socket.on('playerMoved', function (playerInfo) {
        // console.log(playerInfo)
        playState.otherPlayers.children.forEach(function (otherPlayer) {
            // console.log(otherPlayer.playerId)
        if (playerInfo.playerId === otherPlayer.playerId) {
          otherPlayer.rotation=playerInfo.rotation;
          otherPlayer.position={x: playerInfo.x, y: playerInfo.y};
        }
      });
    });
    this.socket.emit('new user', '123');
      // THIS LINE CREATES A LARGER GAME SIZE THAN WE CAN SEE ON THE SCREEN
    game.world.setBounds(0, 0, 2100, 800);
  
    //add physics to the game
    game.physics.startSystem(Phaser.Physics.P2JS);
    game.world.enableBody = true;

    // game.add.sprite(0, 0, "background");
    player = game.add.sprite(0, 0, "player");
    player.body.gravity.y = gravity;
    player.body.collideWorldBounds = true;
    player.anchor.set(0.5, 0.5);
    player.animations.add("stop", [0]);
    player.animations.add("run", [1, 2], 8, true); // 8fps looped
    player.animations.play("stop");

    platforms = game.add.group();
    platforms.enableBody = true;

    ground = platforms.create(0, 275, "ground");
    ground.body.immovable = true;

    platform1 = platforms.create(150, 220, "grass:4x1");
    //platform1.body.immovable = true;

    platform2 = platforms.create(250, 150, "grass:4x1");
    platform2.body.immovable = true;

    platform3 = platforms.create(75, 100, "grass:4x1");
    platform3.body.immovable = true;

       hazards = game.add.group();
      hazards.enableBody = true;
      hazard1 = hazards.create(100, 250, 'hazard');
      hazard1.animations.add('flicker', [0, 1], 6, true); 
      hazard1.animations.play('flicker');

      hazardSound = game.add.audio('hazardwav');


          enemies = game.add.group();
    enemies.enableBody = true;

     enemy1 = hazards.create(180, 115, 'enemy');
      enemy1.animations.add('fly', [0,1,2,3,4,5,6,7,8,9,10], 6, true); 
      enemy1.animations.play('fly');

        pill1 = game.add.sprite(180, 115, 'pill');
      pill1.animations.add('pillanim', [0,1], 6, true); 
      pill1.animations.play('pillanim');


      tween1 = game.add.tween(enemy1);
      tween1.to({x:350, y: 115}, 2000, null, true, 0,-1,true);
  
     var hazard1 = game.add.sprite(300, 250, "hazard");
     enemies.add(hazard1); 
  
  
  this.game.snakes = [];

    //create player
    var snake = new Snake(this.game, 'pill', 0, 0);
    this.game.camera.follow(snake.head);
  
      coins = game.add.group();
      coins.enableBody = true;
  
   for (var i = 1; i < 4; i += 1) {
        var coin = coins.create(i * 100, 0, "coin");
        
    }
   coinSound = game.add.audio('coinwav');
  
  enemies = game.add.group();
  
  
  this.timeLimit = 500;
    this.timeText = game.add.text(10, 10, "00:00");
  this.viewsText = game.add.text(10, 40, "211 views•Jan 4, 2020")


    this.timeText.fill = "#000000";
    this.timer = game.time.events.loop(1000, tick, this);
  
  
  // THIS LINE MAKES THE GAME FOLLOW THE PLAYER
    game.camera.follow(player);
  
    // Design the level. x = platform, o = coin, h = hazard.
    // THIS LEVEL IS WIDER THAN WE CAN SEE ON THE SCREEN
    var level1 = [
        "                                  ooooooo",
        "                                  ooooooo",
        "    o                o            ooooooo",
        "  h                               ooooooo",
        "  xxxxx                           ooooooo",
        "                    o             ooooooo",
        "                          xxxx    ooooooo",
        "             o  h                 ooooooo",
        "             xxxx                 ooooooo",
        "                                  ooooooo",
        "    o          h  x  o            ooooooo",
        "xxxxxxxxxxxxxxxxxxxxxxxxx    xxxxxooooooo",
        "                    o             ooooooo",
        "                          xxxx    ooooooo",
        "             o  h                 ooooooo",
        "             xxxx                 ooooooo",
        "                                  ooooooo",
        "    o          h  x  o            ooooooo",
        "xxxxxxxxx    xxxxxxxxxxxxxxxxxxxxx  ooooo",
        "    o                o            ooooooo",
        "    o          h  x  o            ooooooo",
        "    o          h  x  o            ooooooo",
        "xxxxxxxxxxxxxxxxxxxxxxxxx xxxxxxxx   oooo",
        "h  h  h  h  h  h  h  h  h  h  h  h  h  h  h  h  h  h  h"
    ];  
  

        loadLevel(level1);

};
playState.update = function () {
    game.physics.arcade.collide(player, platforms);
  game.physics.arcade.collide(coins, platforms);
  game.physics.arcade.overlap(player, coins, this.collectCoins);
  game.physics.arcade.overlap(player, hazards, this.hitHazard);
  game.physics.arcade.overlap(player, enemies, this.hitHazard);

    player.body.velocity.x = 0;
    platform1.body.velocity.x = 0;
    platform1.body.velocity.y = 0;
    if (game.input.keyboard.isDown(Phaser.Keyboard.LEFT) === true) {
        player.body.velocity.x = -velocity_x;
    } else if (game.input.keyboard.isDown(Phaser.Keyboard.RIGHT) === true) {
        player.body.velocity.x = velocity_x;
    }

    if (game.input.keyboard.isDown(Phaser.Keyboard.UP) === true && player.body.touching.down === true) {
        player.body.velocity.y = -velocity_y;
    }

    if (game.input.keyboard.isDown(Phaser.Keyboard.DOWN) === true && player.body.touching.down === false) {
        player.body.velocity.y = velocity_y;
    }
  
    if (player.body.velocity.x !== 0) {
        player.animations.play("run");
    }     
    else{
        player.animations.play("stop");
    }
    
    if (player.body.velocity.x < 0) {
        player.scale.x = -1;
    }
    else if (player.body.velocity.x > 0) {
        player.scale.x = 1;
    }

    // emit player movement
        var x = player.x;
        var y = player.y;
        var r = player.rotation;
    if (player.oldPosition && (Math.floor(x) !== Math.floor(player.oldPosition.x) || Math.floor(y) !== Math.floor(player.oldPosition.y) )) {
      this.socket.emit('playerMovement', { x: player.x, y: player.y, rotation: player.rotation });
    }
    // save old position data
        player.oldPosition = {
          x: player.x,
          y: player.y,
          rotation: player.rotation
        };
                //console.log(player.oldPosition.y, " and x: ", y)
  
    this.checkAlive(coins);
  //=====
    for (var i = this.game.snakes.length - 1 ; i >= 0 ; i--) {
          this.game.snakes[i].update();
      }
  
};

playState.collectCoins = function (player, coin) {
        coin.kill();
        coinSound.play();
};

playState.hitHazard = function(player,hazard) { 
  player.kill();        
  hazardSound.play();
  playState.socket.disconnect();
  game.state.restart();
};


playState.checkAlive = function (group) {
    var count_alive = 0, i;
    for (i = 0; i < group.children.length; i += 1) {
        if (group.children[i].alive === true) {
            count_alive += 1;
        }
    }
    if (count_alive === 0) {
        game.state.restart("play");
    }
};


var tick = function () {
    this.timeLimit--;
    var minutes = Math.floor(this.timeLimit / 60);
    var seconds = this.timeLimit - (minutes * 60);
    var timeString = addZeros(minutes) + ":" + addZeros(seconds);
    this.timeText.text = timeString;
    if (this.timeLimit === 0) {
        outofTime();
    }
};

var addZeros = function (num) {
    if (num < 10) {
        num = "0" + num;
    }
    return num;
};

var outofTime = function () {
    var splatNoise = game.add.audio("splat");
    splatNoise.play();
    game.state.start("play");
}

game.state.add("play", playState);
game.state.start("play");

function loadLevel (level) {
    // Create the level from the array of strings
    var i;
    var j;
    var wall;
    var coin;
    var enemy;
    for (i = 0; i < level.length; i = i + 1) {
        for (j = 0; j < level[i].length; j = j + 1) {
            if (level[i][j] === "x") { // Create a wall and add it to the 'platfrom' group
                wall = game.add.sprite(0 + 32 * j, 0 + 32 * i, "platform");
                wall.body.immovable = true;
                platforms.add(wall);
            } else if (level[i][j] === "o") { // Create a coin and add it to the 'coins' group
                coin = game.add.sprite(0 + 32 * j, 0 + 32 * i, "coin");
                // coin.body.gravity.y = 200;
                coin.animations.add("rotate", [0, 1, 2, 1], 6, true);
                coin.animations.play("rotate");
                coins.add(coin);
            } else if (level[i][j] === "h") { 
                // Create a enemy and add it to the 'enemies' group
                var enemy = game.add.sprite(0 + 32 * j, 0 + 32 * i, "enemy");
                enemies.add(enemy);
              
            }
        }
    }
}



function addPlayer(self, playerInfo) {
  self.ship = self.game.add.sprite(playerInfo.x, playerInfo.y, 'pill');
}

function addOtherPlayers(self, playerInfo) {
  var otherPlayer = game.add.sprite(playerInfo.x, playerInfo.y, 'player');
  
  otherPlayer.playerId = playerInfo.playerId;
  self.otherPlayers.add(otherPlayer);
}



