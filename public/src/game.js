var game = new Phaser.Game(800, 600);

// List variables which can be easily changed to alter gameplay
var gravity = 4000;
var velocity_x = 600;
var velocity_y = 1200;

// a list of key game elements at the beginning so preload, create and update functions can all access them.
var playState = {};

var player; 
// var otherPlayer;
var platforms; 
var coins;
var enemies;
var hazards;
var mysprite;

var sea;
var platform1;
var enemy1;
var tween1;
var elon;
var wsb;
var diamond;
var cnbc;
var rh;
var reddit;
var discord;
var youtube;
// var pill1;
var livesSprite;

var coinSound;
var hazardSound;
var sinkSound;

var lives = 3;
var currentLevel = 1;
// var players;

var left=false;
var right=false;
var duck= false;
var fire=false;
var jump=false;

playState.preload = function () {
  game.scale.scaleMode = Phaser.ScaleManager.SHOW_ALL;
  game.scale.pageAlignHorizontally = true;
  game.scale.pageAlignVertically = true;
  game.load.crossOrigin = "anonymous";
  
  game.load.image("background", "https://cdn.glitch.com/1d985b53-750d-4dbe-856f-2f14a8171797%2Fcity_bay_embacardo5579.jpg?v=1582385284768");
  game.load.image("ground", "https://cdn.glitch.com/5d318c12-590d-47a1-b471-92a5dc0aae9d%2Fground.png?1539357516721");
  game.load.image("water", "https://cdn.glitch.com/07341419-e9df-484f-820f-d6799646cfcd%2Fclouds-h.png?v=1540814965305");
  game.load.image("grass:4x1", "https://cdn.glitch.com/5d318c12-590d-47a1-b471-92a5dc0aae9d%2Fgrass_4x1.png?1539357516607");
  game.load.image("platform", "https://cdn.glitch.com/1d985b53-750d-4dbe-856f-2f14a8171797%2Fsfblock32.png?v=1582466660245");
  game.load.image("elon_head", "https://cdn.glitch.com/1d985b53-750d-4dbe-856f-2f14a8171797%2Felon_head.png?v=1610384519173");
  game.load.image("wsb", "https://cdn.glitch.com/1d985b53-750d-4dbe-856f-2f14a8171797%2Fwallstreet.png?v=1612861289415");
//  game.load.image("cnbc", "https://upload.wikimedia.org/wikipedia/commons/e/e3/CNBC_logo.svg");
  game.load.image("cnbc", "https://cdn.glitch.com/1d985b53-750d-4dbe-856f-2f14a8171797%2FCNBC_logo.png?v=1612870164492");
  game.load.image("rh", "https://cdn.glitch.com/1d985b53-750d-4dbe-856f-2f14a8171797%2Frobinhood_logo.png?v=1612862569103");
  game.load.image("reddit", "https://cdn.glitch.com/1d985b53-750d-4dbe-856f-2f14a8171797%2FReddit-Mascot-Logo.png?v=1612871584805");
  game.load.image("discord", "https://cdn.glitch.com/1d985b53-750d-4dbe-856f-2f14a8171797%2Fdiscord-logo-png-transparent.png?v=1612875954978");
  game.load.image("youtube", "https://cdn.glitch.com/1d985b53-750d-4dbe-856f-2f14a8171797%2FYouTube-Logo.png?v=1612877380649");
  
  
  game.load.image('diamond', 'https://raw.githubusercontent.com/photonstorm/phaser-examples/master/examples/assets/sprites/diamond.png');
  
  game.load.spritesheet("player", "https://cdn.glitch.com/1d985b53-750d-4dbe-856f-2f14a8171797%2Ftrump_run.png?v=1582212368222", 100, 100);
  game.load.spritesheet("enemy", "https://cdn.glitch.com/5d318c12-590d-47a1-b471-92a5dc0aae9d%2Fspider.png?1539353651634", 42, 32);
  game.load.spritesheet("pill", "https://cdn.glitch.com/1d985b53-750d-4dbe-856f-2f14a8171797%2Fpill.png?v=1578495665124", 32, 32);
  game.load.spritesheet("coin", "https://cdn.glitch.com/5d318c12-590d-47a1-b471-92a5dc0aae9d%2Fcoin_animated.png", 22, 22);
  game.load.spritesheet("lives", "https://cdn.glitch.com/df3d4bd4-a145-4f00-bfad-97b20729e2ee%2Fanimated%20heart.png",48,12); 
  game.load.spritesheet('hazard', 'https://s3-us-west-2.amazonaws.com/s.cdpn.io/1171931/fire2.png', 11, 27); 
  
  game.load.spritesheet('chain', 'https://raw.githubusercontent.com/photonstorm/phaser-examples/master/examples/assets/sprites/chain.png', 16, 26);
  
  game.load.spritesheet('buttonvertical', 'https://raw.githubusercontent.com/photonstorm/phaser-examples/master/examples/assets/buttons/buttons-big/button-vertical.png',64,64);
  game.load.spritesheet('buttonhorizontal', 'https://raw.githubusercontent.com/photonstorm/phaser-examples/master/examples/assets/buttons/buttons-big/button-horizontal.png',96,64);
  game.load.spritesheet('buttondiagonal', 'https://raw.githubusercontent.com/photonstorm/phaser-examples/master/examples/assets/buttons/buttons-big/button-diagonal.png',64,64);
  game.load.spritesheet('buttonfire', 'https://raw.githubusercontent.com/photonstorm/phaser-examples/master/examples/assets/buttons/buttons-big/button-round-a.png',96,96);
  game.load.spritesheet('buttonjump', 'https://raw.githubusercontent.com/photonstorm/phaser-examples/master/examples/assets/buttons/buttons-big/button-round-b.png',96,96);
  
  game.load.audio('howwav', 'https://cdn.glitch.com/1d985b53-750d-4dbe-856f-2f14a8171797%2Fdare.wav?v=1582208323262');
  game.load.audio('dying', 'https://cdn.glitch.com/1d985b53-750d-4dbe-856f-2f14a8171797%2FTrumpDying.mp3?v=1582209368177');
  game.load.audio('sink', 'https://cdn.glitch.com/1d985b53-750d-4dbe-856f-2f14a8171797%2FTrumpItsCalledWater.mp3?v=1582384558648');
  game.load.audio('joined', 'https://cdn.glitch.com/1d985b53-750d-4dbe-856f-2f14a8171797%2Fnk-fb.mp3?v=1611192521348');
  
};

playState.create = function () {
    //a list of variables used only by the create function
    //scene california drought
    //scene new york flood
    var ground;

    // initCreate()
    var self = this;
  
    playState.playersMap = {};
    this.socket = io();
  
  
    game.add.sprite(0, 0, "background");
  
    this.otherPlayers = this.game.add.group();
    this.otherPlayers.enableBody = true;
    //this.otherPlayers.depth = 10;
  
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
          if (playerInfo.playerId === otherPlayer.playerId) {
            otherPlayer.rotation=playerInfo.rotation;
            otherPlayer.position={x: playerInfo.x, y: playerInfo.y};
            // var player = playState.playersMap[playerInfo.playerId];
            // var distance = Phaser.Math.distance(player.x,player.y,x,y);
            // var duration = distance*10;
            // var tween3 = game.add.tween(player);
            // tween3.to({x:x,y:y}, duration);
            // tween3.start();
           //console.log(otherPlayer.position)
          }
        });
    });
  
    this.socket.emit('new user', '123');
  
    // THIS LINE CREATES A LARGER GAME SIZE THAN WE CAN SEE ON THE SCREEN
    game.world.setBounds(0, 0, 2100, 1300);
  
    //add physics to the game
    game.physics.startSystem(Phaser.Physics.P2JS);
    game.world.enableBody = true;

  
    player = game.add.sprite(50, 300, "player");
    player.body.gravity.y = gravity;
    player.body.collideWorldBounds = true;
    player.anchor.set(0.5, 0.5);
    player.animations.add("stop", [5]);
    player.animations.add("run", [0, 1, 2, 3], 16, true); // 8fps looped
    player.animations.play("stop");
    player.body.setSize(25, 60, 50, 20);
  
  
    this.gamerNameText = game.add.text(player.position.x,player.position.y-20, "Name", "0:00"); 

    platforms = game.add.group();
    platforms.enableBody = true;
    platform1 = platforms.create(50, 400, "grass:4x1");
    //platform1.body.immovable = true;
  
    sea = game.add.sprite(0, 950, "water");
    sea.scale= {x:6, y:6};
    sea.alpha=0.6;

    this.companies = this.game.add.group();
    this.companies.enableBody = true;
  
    //this.companies.physicsBodyType = Phaser.Physics.ARCADE;
  
    elon = game.add.sprite(50, 515, "elon_head");
    elon.scale= {x:0.2, y:0.2};
  this.companies.add(elon);
    tween2 = game.add.tween(elon);
    tween2.to({x:100 + Math.random() * 1000, y: 515+ Math.random() * 1000}, 2000, null, true, 0,-1,true);
  
    wsb = game.add.sprite(150, 615, "wsb");
  
    rh = game.add.sprite(50, 615, "rh");
    this.companies.add(rh);
    
    reddit = game.add.sprite(650, 615, "reddit");
    reddit.scale= {x:0.1, y:0.1};
    this.companies.add(reddit);
  
  discord = game.add.sprite(850, 615, "discord");
  discord.scale= {x:0.03, y:0.03};
  this.companies.add(discord);
  
  youtube = game.add.sprite(850, 515, "youtube");
  youtube.collideWorldBounds = true;
  //this.companies.bounce.setTo(0.9, 0.9);
   this.companies.add(youtube);
  youtube.scale= {x:0.1, y:0.1};
  youtube.body.gravity.y = 200;

    hazards = game.add.group();
    hazards.enableBody = true;
    hazardSound = game.add.audio('dying');
     
    enemies = game.add.group();
    enemies.enableBody = true;

    // enemy1 = enemies.create(280, 900, 'enemy');
    // enemy1.animations.add('fly', [0,1,2], 6, true); 
    // enemy1.animations.play('fly');
    // tween1 = game.add.tween(enemy1);
    // tween1.to({x:450, y: 900}, 2000, null, true, 0,-1,true);

    coins = game.add.group();
    coins.enableBody = true;
    coinSound = game.add.audio('howwav');
  
    sinkSound = game.add.audio('sink');
  
    this.timeLimit = 2015;
    this.timeText = game.add.text(700, 20, "00:00");
    this.timeText.fixedToCamera = true;
  
  

    livesSprite = game.add.sprite(20, 20, "lives");
    livesSprite.fixedToCamera = true;

        //  Length, xAnchor, yAnchor
    createRope(40, 400, 64);


    this.timeText.fill = "#000000";
    this.timer = game.time.events.loop(1000, tick, this);
  
  
    // THIS LINE MAKES THE GAME FOLLOW THE PLAYER
    game.camera.follow(player);
  
    // Design the level. x = platform, o = coin, h = hazard.
    // THIS LEVEL IS WIDER THAN WE CAN SEE ON THE SCREEN
    var level1 = [
        "                                                                  ",
        "                                                                  ",
        "                                                                  ",
        "                                                                  ",
        "                                                          xx      ",
        "                                                                  ",
        "                                                                  ",
        "                                                                  ",
        "                                                                  ",
        "                             o                o                   ",
        "                                                                  ",
        "                             xxxx                                 ",
        "                                                           o      ",
        "                                                   xxxx    o      ",
        "                                      o  h                 o      ",
        "                                      xxxx                 o      ",
        "                                                           o      ",
        "                             o          h  x  o            o      ",
        "                         xxxxxxxxxxxxxxxxxxxxxxxxx    xxxxx       ",
        "                                             o                    ",
        "                                                                  ",
        "                                      o  h         xx             ",
        "                                        xxxx                      ",
        "                                        xxxx                      ",
        "                             o          xxxx  o                   ",
        "                         xxxxxxxxx    xxxxxxxxxxxxxxxxxxxxx       ",
        "                                        xxxx                      ",
        "                                        xxxx                      ",
        "              o              o          xxxx  o                   ",
        "xxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx",
        "                                                                  "
    ];  
  

    loadLevel(level1);
  
    buttonjump = game.add.button(600, 500, 'buttonjump', null, this, 0, 1, 0, 1); 
    buttonjump.fixedToCamera = true;
    buttonjump.events.onInputOver.add(function(){jump=true;});
    buttonjump.events.onInputOut.add(function(){jump=false;});
    buttonjump.events.onInputDown.add(function(){jump=true;});
    buttonjump.events.onInputUp.add(function(){jump=false;});
  
    buttonfire = game.add.button(700, 500, 'buttonfire', null, this, 0, 1, 0, 1);
    buttonfire.fixedToCamera = true;
    buttonfire.events.onInputOver.add(function(){fire=true;});
    buttonfire.events.onInputOut.add(function(){fire=false;});
    buttonfire.events.onInputDown.add(function(){fire=true;});
    buttonfire.events.onInputUp.add(function(){fire=false;});        

    buttonleft = game.add.button(0, 472, 'buttonhorizontal', null, this, 0, 1, 0, 1);
    buttonleft.fixedToCamera = true;
    buttonleft.events.onInputOver.add(function(){left=true;});
    buttonleft.events.onInputOut.add(function(){left=false;});
    buttonleft.events.onInputDown.add(function(){left=true;});
    buttonleft.events.onInputUp.add(function(){left=false;});

    buttonbottomleft = game.add.button(32, 536, 'buttondiagonal', null, this, 6, 4, 6, 4);
    buttonbottomleft.fixedToCamera = true;
    buttonbottomleft.events.onInputOver.add(function(){left=true;duck=true;});
    buttonbottomleft.events.onInputOut.add(function(){left=false;duck=false;});
    buttonbottomleft.events.onInputDown.add(function(){left=true;duck=true;});
    buttonbottomleft.events.onInputUp.add(function(){left=false;duck=false;});

    buttonright = game.add.button(160, 472, 'buttonhorizontal', null, this, 0, 1, 0, 1);
    buttonright.fixedToCamera = true;
    buttonright.events.onInputOver.add(function(){right=true;});
    buttonright.events.onInputOut.add(function(){right=false;});
    buttonright.events.onInputDown.add(function(){right=true;});
    buttonright.events.onInputUp.add(function(){right=false;});

    buttonbottomright = game.add.button(160, 536, 'buttondiagonal', null, this, 7, 5, 7, 5);
    buttonbottomright.fixedToCamera = true;
    buttonbottomright.events.onInputOver.add(function(){right=true;duck=true;});
    buttonbottomright.events.onInputOut.add(function(){right=false;duck=false;});
    buttonbottomright.events.onInputDown.add(function(){right=true;duck=true;});
    buttonbottomright.events.onInputUp.add(function(){right=false;duck=false;});

    buttondown = game.add.button(96, 536, 'buttonvertical', null, this, 0, 1, 0, 1);
    buttondown.fixedToCamera = true;
    buttondown.events.onInputOver.add(function(){duck=true;});
    buttondown.events.onInputOut.add(function(){duck=false;});
    buttondown.events.onInputDown.add(function(){duck=true;});
    buttondown.events.onInputUp.add(function(){duck=false;});

};



playState.update = function () {
    game.physics.arcade.collide(player, platforms);
    game.physics.arcade.collide(coins, platforms);
  game.physics.arcade.collide(this.companies, platforms);
  game.physics.arcade.collide(this.companies, player);
  
    game.physics.arcade.overlap(player, coins, this.collectCoins);
    game.physics.arcade.overlap(player, hazards, this.hitHazard);
    game.physics.arcade.overlap(player, enemies, this.hitHazard);
    game.physics.arcade.overlap(player, sea, this.sink);
    game.physics.arcade.overlap(sea, hazards, this.hazardsink);
  
    if (lives === 3){
        livesSprite.animations.frame = 0; 
      } 
      else if (lives === 2){
        livesSprite.animations.frame = 1; 
      } 
      else if (lives === 1){
        livesSprite.animations.frame = 2; 
      } 

    player.body.velocity.x = 0;
    platform1.body.velocity.x = 0;
    platform1.body.velocity.y = 0;
    if (game.input.keyboard.isDown(Phaser.Keyboard.LEFT) === true || left) {
        player.body.velocity.x = -velocity_x;
    } else if (game.input.keyboard.isDown(Phaser.Keyboard.RIGHT) === true || right) {
        player.body.velocity.x = velocity_x;
    }

    if ((game.input.keyboard.isDown(Phaser.Keyboard.UP) === true || jump) && player.body.touching.down === true ) {
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
  
  
  playState.gamerNameText.position = {x:player.position.x-20, y:player.position.y-50}; 

  
};

playState.collectCoins = function (player, coin) {
  coin.kill();
  coinSound.play();
  sea.scaleY = 1.5;
  sea.y-=50
  elon.scale= {x:0.1+elon.scale.x, y:0.1+elon.scale.y};
  game.camera.follow(elon);
  this.timeLimit2= 2;
    this.timer2 = game.time.events.loop(1000, tick2, this);
};

var tick2 = function () {
    this.timeLimit2--;
    if (this.timeLimit2 === 0) {
        game.camera.follow(player);
    }
};

playState.hitHazard = function(player,hazard) { 
  hazardSound.play();
  hazard.kill();
  if (lives != 0) {
    lives--;
  }
  else {  
    lives = 3;
    currentLevel = 1;
    player.kill();    
    playState.socket.disconnect();
    game.state.start("gameover");
    //game.state.start("play", true, false, lives, currentLevel);
  }
};

playState.sink = function (player, sea) {
  //sinkSound.play();
  // if (lives != 0) {
    lives--;
  
  // }
};

playState.hazardsink = function (sea, hazard) {
  hazard.kill();
};


playState.checkAlive = function (group) {
    var count_alive = 0, i;
    for (i = 0; i < group.children.length; i += 1) {
        if (group.children[i].alive === true) {
            count_alive += 1;
        }
    }
    if (count_alive === 0) {
        game.state.start("youwin");
        //game.state.restart("play");
    }
};


var tick = function () {
    this.timeLimit++;
    // var minutes = Math.floor(this.timeLimit / 60);
    // var seconds = this.timeLimit - (minutes * 60);
    // var timeString = addZeros(minutes) + ":" + addZeros(seconds);
    var timeString = this.timeLimit;
    this.timeText.text = timeString;
    if (this.timeLimit === 0) {
        outofTime();
    }
  sea.y-=3
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
    //game.state.start("play");
}

var gameOverState = {}; 

gameOverState.create = function () {  
    this.gameoverText = game.add.text(10,10, "Game Over", "0:00"); 
    this.gameoverText.fill = "#ffffff"; 
    this.time.events.add(3000, this.restart, this) 
}; 
gameOverState.restart = function(){ 
    game.state.start('play'); 
};

var youwinState = {}; 

youwinState.create = function () {  
    this.gameoverText = game.add.text(100,10, "You won!", "0:00"); 
    this.gameoverText.fill = "#ffffff"; 
    this.time.events.add(3000, this.restart, this) 
}; 
youwinState.restart = function(){ 
    game.state.start('play'); 
};

game.state.add("play", playState);
game.state.add("gameover", gameOverState); 
game.state.add("youwin", youwinState);
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
                coin = game.add.sprite(0 + 32 * j, 0 + 32 * i, "diamond");
                // coin.body.gravity.y = 200;
                // coin.animations.add("rotate", [0, 1, 2, 1], 6, true);
                // coin.animations.play("rotate");
                coins.add(coin);
            } else if (level[i][j] === "h") { 
                // Create a enemy and add it to the 'enemies' group
                var newhazard = game.add.sprite(0 + 32 * j, 0 + 32 * i, "cnbc");
                newhazard.scale = {x:0.2, y:0.2};
                //var newhazard = hazards.create(0 + 32 * j, 0 + 32 * i, 'cnbc');
                // newhazard.animations.add('flicker', [0, 1], 6, true); 
                // newhazard.animations.play('flicker');
                hazards.add(newhazard);
              
            }
        }
    }
}



function addPlayer(self, playerInfo) {
  self.ship = self.game.add.sprite(playerInfo.x, playerInfo.y, 'pill');
  self.ship.animations.add('pillanim', [0,1], 6, true); 
  self.ship.animations.play('pillanim');
}

function addOtherPlayers(self, playerInfo) {
  var otherPlayer = game.add.sprite(playerInfo.x, playerInfo.y, 'reddit');
  otherPlayer.anchor.set(0.5, 0.6);
  otherPlayer.scale = {x:0.2, y:0.2};
  // otherPlayer = game.add.sprite(playerInfo.x, playerInfo.y, 'elon_head');
  
//   playState.gamerNameText = game.add.text(player.position.x,player.position.y-20, "Name", "0:00"); 
  
  otherPlayer.playerId = playerInfo.playerId;
  self.otherPlayers.add(otherPlayer);
  //playersMap[playerInfo);
  console.log(self.otherPlayers)
  var joinedSound = game.add.audio("joined");
  joinedSound.play();
}



function createRope(length, xAnchor, yAnchor) {

    var lastRect;
    var height = 20;        //  Height for the physics body - your image height is 8px
    var width = 16;         //  This is the width for the physics body. If too small the rectangles will get scrambled together.
    var maxForce = 20000;   //  The force that holds the rectangles together.

    for (var i = 0; i <= length; i++)
    {
        var x = xAnchor;                    //  All rects are on the same x position
        var y = yAnchor + (i * height);     //  Every new rect is positioned below the last

        if (i % 2 === 0)
        {
            //  Add sprite (and switch frame every 2nd time)
            newRect = game.add.sprite(x, y, 'chain', 1);
        }   
        else
        {
            newRect = game.add.sprite(x, y, 'chain', 0);
            lastRect.bringToTop();
        }

        //  Enable physicsbody
        game.physics.p2.enable(newRect, false);

        //  Set custom rectangle
        //newRect.body.setBoundsRectangle(width, height);

        if (i === 0)
        {
            newRect.body.static = true;
        }
        else
        {  
            //  Anchor the first one created
            //newRect.body.velocity.x = 400;      //  Give it a push :) just for fun
            newRect.body.mass = length / i;     //  Reduce mass for evey rope element
        }

        //  After the first rectangle is created we can add the constraint
        if (lastRect)
        {
            game.physics.p2.createRevoluteConstraint(newRect, [0, -10], lastRect, [0, 10], maxForce);
        }

        lastRect = newRect;

    }

}