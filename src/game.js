var game = new Phaser.Game(800, 600);

// List variables which can be easily changed to alter gameplay
var gravity = 1900;
var velocity_x = 200;
var velocity_y = 900;

// a list of key game elements at the beginning so preload, create and update functions can all access them.
var playState = {};

var player; 
// var otherPlayer;
var platforms; 
var coins;
var enemies;
var hazards;
var text;

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
var daniel;
var livesSprite;

var coinSound;
var hazardSound;
var sinkSound;
var story;

var lives = 3;
var currentLevel = 1;
var sealevel = -90;

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
  
  game.load.image("background", "https://cdn.glitch.com/1d985b53-750d-4dbe-856f-2f14a8171797%2Fcity%20(2).jpg?v=1615185981161");
  game.load.image("ground", "https://cdn.glitch.com/5d318c12-590d-47a1-b471-92a5dc0aae9d%2Fground.png?1539357516721");
  game.load.image("water", "https://cdn.glitch.com/07341419-e9df-484f-820f-d6799646cfcd%2Fclouds-h.png?v=1540814965305");
  game.load.image("platform", "https://cdn.glitch.com/1d985b53-750d-4dbe-856f-2f14a8171797%2Fsfblock32.png?v=1582466660245");
  game.load.image("elon_head", "https://cdn.glitch.com/1d985b53-750d-4dbe-856f-2f14a8171797%2Felon_head.png?v=1610384519173");
  game.load.image("wsb", "https://cdn.glitch.com/1d985b53-750d-4dbe-856f-2f14a8171797%2Fwallstreet.png?v=1612861289415");
//  game.load.image("cnbc", "https://upload.wikimedia.org/wikipedia/commons/e/e3/CNBC_logo.svg");
  game.load.image("cnbc", "https://cdn.glitch.com/1d985b53-750d-4dbe-856f-2f14a8171797%2FCNBC_logo.png?v=1612870164492");
  game.load.image("rh", "https://cdn.glitch.com/1d985b53-750d-4dbe-856f-2f14a8171797%2Frobinhood_logo.png?v=1612862569103");
  game.load.image("reddit", "https://cdn.glitch.com/1d985b53-750d-4dbe-856f-2f14a8171797%2FReddit-Mascot-Logo.png?v=1612871584805");
  game.load.image("discord", "https://cdn.glitch.com/1d985b53-750d-4dbe-856f-2f14a8171797%2Fdiscord-logo-png-transparent.png?v=1612875954978");
  game.load.image("youtube", "https://cdn.glitch.com/1d985b53-750d-4dbe-856f-2f14a8171797%2FYouTube-Logo.png?v=1612877380649");
  game.load.image("daniel", "https://cdn.glitch.global/a9224357-64d4-4a95-90fb-cd9196e07b29/daniel.png?v=1667261253366");
  game.load.image("de", "https://upload.wikimedia.org/wikipedia/en/thumb/b/ba/Flag_of_Germany.svg/1200px-Flag_of_Germany.svg.png");
  game.load.image("sweat", "https://cdn.glitch.com/44c6651b-f32c-4a48-a8ab-c2ad3ce91d17%2Fgreypixels.png?1542974943231");

  
  
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
  game.load.audio('won', 'https://cdn.glitch.com/1d985b53-750d-4dbe-856f-2f14a8171797%2FTronCyberPunk2077.mp3?v=1611191756630');
  
  game.load.audio('transhuman', 'https://cdn.glitch.com/1d985b53-750d-4dbe-856f-2f14a8171797%2F10000000_756243285001396_647141584982102442_n_2.mp3.mp3?v=1615681695396');
};

playState.create = function () {
  //a list of variables used only by the create function
  var ground;
  
  // THIS LINE CREATES A LARGER GAME SIZE THAN WE CAN SEE ON THE SCREEN
  game.world.setBounds(0, -9990, 2100, 10000);
  
  // Add text instructions at various positions in the game world
  // var instruction1 = game.add.text(100, -800, "Collect coins to gain new abilities!", { font: "16px Arial", fill: "#ffffff" });
  // var instruction2 = game.add.text(400, -1200, "Interact with companies to acquire abilities.", { font: "16px Arial", fill: "#ffffff" });
  // var instruction3 = game.add.text(600, -2000, "Press SPACE to create a platform.", { font: "16px Arial", fill: "#ffffff" });



  //add physics to the game
  game.physics.startSystem(Phaser.Physics.P2JS);
  game.world.enableBody = true;

  // initCreate()
  var self = this;

  game.scale.fullScreenScaleMode = Phaser.ScaleManager.EXACT_FIT;
  //game.input.onDown.add(gofull, this);
  
  //scene california drought
  //scene new york flood
  game.stage.backgroundColor = "rgb(2, 99, 170)";
  var bg = game.add.sprite(0, -1000, "background");
  // bg.alignIn(game.world.bounds, Phaser.BOTTOM_LEFT);

  player = game.add.sprite(50, -300, "player");
  player.body.gravity.y = gravity;

  //player.body.collideWorldBounds = true;
  player.anchor.set(0.5, 0.5);
  player.animations.add("stop", [0, 1, 2, 3, 4, 5], 20, true);
  player.animations.add("down", [13, 14, 15, 16, 17], 16, true); // 8fps looped
  player.animations.add("run", [6, 7, 8, 9, 10], 16, true); // 8fps looped
  player.animations.play("stop");
  player.body.setSize(25, 60, 50, 20);
  game.physics.p2.enable(player, platforms, coins, hazards, this.companies);
  

  platforms = game.add.group();
  this.companies = this.game.add.group();
  //this.companies.physicsBodyType = Phaser.Physics.ARCADE;

  elon = game.add.sprite(50, -15, "elon_head");
  elon.scale= {x:0.2, y:0.2};
  this.companies.add(elon);
  tween2 = game.add.tween(elon);
  tween2.to({x:100 , y: -2000}, 2000, null, true, 0,-1,true);
//+ Math.random() * 1000
  
  wsb = game.add.sprite(1650, -1815, "wsb");

  rh = game.add.sprite(50, -615, "rh");
  this.companies.add(rh);

  reddit = game.add.sprite(650, -615, "reddit");
  reddit.scale= {x:0.1, y:0.1};
  this.companies.add(reddit);
  
  discord = game.add.sprite(350, -385, "discord");
  discord.body.immovable = true;
  discord.scale= {x:0.03, y:0.03};
  this.companies.add(discord);
  
  youtube = game.add.sprite(1350, -1515, "youtube");
  youtube.collideWorldBounds = true;
  //this.companies.bounce.setTo(0.9, 0.9);
  this.companies.add(youtube);
  youtube.scale= {x:0.1, y:0.1};
  youtube.body.gravity.y = -2;
  
  daniel = game.add.sprite(450, -124, "daniel");
  daniel.body.immovable = true;
  daniel.scale= {x:0.2, y:0.2};
  
  youtube.scale= {x:0.1, y:0.1};

  hazards = game.add.group();
  hazardSound = game.add.audio('dying');

  enemies = game.add.group();
  enemies.enableBody = true;

  // enemy1 = enemies.create(280, 900, 'enemy');
  // enemy1.animations.add('fly', [0,1,2], 6, true); 
  // enemy1.animations.play('fly');
  // tween1 = game.add.tween(enemy1);
  // tween1.to({x:450, y: 900}, 2000, null, true, 0,-1,true);

  coins = game.add.group();
  coinSound = game.add.audio('howwav');

  sinkSound = game.add.audio('sink');

  sea = game.add.sprite(0, 0, "water");
  sea.scale= {x:6, y:6};
  sea.alpha=0.6;

  this.timeLimit = 2015;
  this.timeText = game.add.text(500, 20, "00:00");
  this.timeText.fixedToCamera = true;
  this.timeText.fill = "#000000";
  
  this.myText = game.add.text(100,10, "Game" + sealevel); 
  this.myText.fixedToCamera = true;
  this.myText.fill = "#ffffff"; 
  
  this.timer = game.time.events.loop(1000, tick, this);

  livesSprite = game.add.sprite(20, 20, "lives");
  livesSprite.fixedToCamera = true;

  // THIS LINE MAKES THE GAME FOLLOW THE PLAYER
  game.camera.follow(player);
  
     // Add text instructions at various positions in the game world
  var instruction1 = game.add.text(50, -400, "Collect coins to gain new abilities!", { font: "16px Arial", fill: "#ffffff" });
  var instruction2 = game.add.text(400, -400, "Interact with companies to acquire abilities.", { font: "16px Arial", fill: "#ffffff" });
  var instruction3 = game.add.text(600, -100, "Press SPACE to create a platform.", { font: "16px Arial", fill: "#ffffff" });


    // Add abilities to the character object
  player.character = {
    abilities: [],
    hasBuilt: false,
    speedChange: function () {
      // Implement the functionality for speed change ability
      // For example, increase the player's velocity
      player.body.velocity.x += 200; // Increase the player's velocity by 200
    },
    stateChange: function () {
      // Implement the functionality for state change ability
      // For example, toggle the player's animation between "stop" and "run"
      if (player.animations.currentAnim.name === "stop") {
        player.animations.play("run");
      } else {
        player.animations.play("stop");
      }
    },
    moneyEarnedAnimation: function () {
      // Implement the functionality for money earned animation
      // For example, play a coin animation or display a text animation
      // when the player collects a coin
      var moneyAnimation = game.add.sprite(player.x, player.y, "moneyAnimation");
      moneyAnimation.animations.add("playAnimation", [0, 1, 2, 3], 10, false);
      moneyAnimation.animations.play("playAnimation");
      moneyAnimation.events.onAnimationComplete.add(function () {
        moneyAnimation.destroy(); // Remove the animation sprite
      });
    }
  };
    
  // Design the level. x = platform, o = coin, h = hazard.
  // THIS LEVEL IS WIDER THAN WE CAN SEE ON THE SCREEN
  var level1 = [
      "                                                                                   xx   ",
      "                                                                                        ",
      "                                                                                        ",
      "               xx                                                                       ",
      "                                                                                        ",
      "                                                                                        ",
      "                                                                                        ",
      "                                                                                        ",
      "                                               xx                                       ",
      "                                                                                        ",
      "                                                                                        ",
      "                                                                                        ",
      "                                                                                        ",
      "                                                                                        ",
      "                                  xx                                                    ",
      "                                                                                        ",
      "                                                                                        ",
      "                                                                                        ",
      "                                                                                        ",
      "                                                                                        ",
      "                                                                                        ",
      "                                                                                        ",
      "                                                                                        ",
      "                                      xx                  xx                            ",
      "                                                                                        ",
      "                                                                                        ",
      "                                   x                                                    ",
      "                                                                                        ",
      "                                                                                        ",
      "                                x                                                       ",
      "                             xxxx                                                       ",
      "                                                           o                            ",
      "                                                   xxxx    o                            ",
      "                                      o  h                 o                            ",
      "                                      xxxx                 o                            ",
      "                                                           o                            ",
      "                             o          h  x               o                            ",
      "                         xxxxxxx    xxxxxxxxxxxxxx    xxxxx                             ",
      "                                                                                        ",
      "                                                                                        ",
      "                                      o  h         xx                                   ",
      "                                        xxxx                                            ",
      "                                        xxxx                                            ",
      "                             o          xxxx                                            ",
      "                         xxxxxxxxx    xxxxxxxxxx     xxxxxx                             ",
      "                                                                                        ",
      "                                                                                        ",
      "              o              o                                                          ",
      "xxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx",
      "                                                                  "
  ];  
  
  // Design the level. x = platform, o = coin, h = hazard.
var level2 = [
    "                                  x                             ",
    "                                                                 ",
    "                                                                 ",
    "               o                                                 ",
    "       x                 x       o       x                   x   ",
    "                                        x       o             o  ",
    "                   o                                              ",
    "                                                      x          ",
    "                             x              x                  x ",
    "     o                                   x             o         ",
    "        x                             o                   x      ",
    "                                        h                   x   o",
    "                                                                 ",
    "                                                                 ",
    "                          x                                      ",
    "                                        x         o             ",
    "                                                      x          ",
    "                                                                 ",
    "               o                                                 ",
    "       x                 x       o       x                   x   ",
    "                                        x       o             o  ",
    "                   o                                              ",
    "                                                      x          ",
    "                             x              x                  x ",
    "     o                                   x             o         ",
    "        x                             o                   x      ",
    "                                        h                   x   o",
    "                                                                 ",
    "                                                                 ",
    "                          x                                      ",
    "                                        x         o             ",
    "                                                      x          ",
    "xxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx"
];


  loadLevel(level2);
  platforms.setAll('inputEnabled', true);  
  platforms.callAll('input.enableDrag', 'input');

  //  Enable snapping. For the atari1 sprite it will snap as its dragged around and on release.
  //  The snap is set to every 32x32 pixels.
  platforms.forEach( (c)=> c.input.enableSnap(32, 32, true, true) );

  platforms.onChildInputOver.add(dragUpdate);

  buttonjump = game.add.button(400, 500, 'buttonjump', null, this, 0, 1, 0, 1); 
  buttonjump.fixedToCamera = true;
  buttonjump.events.onInputOver.add(function(){jump=true;});
  buttonjump.events.onInputOut.add(function(){jump=false;});
  buttonjump.events.onInputDown.add(function(){jump=true;});
  buttonjump.events.onInputUp.add(function(){jump=false;});

  buttonfire = game.add.button(500, 500, 'buttonfire', null, this, 0, 1, 0, 1);
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

  fullscrbutton = game.add.button(200, -300, 'pill', gofull, this, 0, 1, 0, 1);
  this.sweat = game.add.emitter(0, 0, 20); 
  this.sweat.makeParticles('sweat'); 
  this.sweat.setYSpeed(-150, 150); 
  this.sweat.setXSpeed(-150, 150); 
  this.sweat.gravity = 0; 
  
  // Define an array of objects represented by Unicode characters
const objects = [
  {
    name: "Sword",
    unicode: "\u2694", // Unicode character for a sword
    description: "A mighty weapon for battle.",
  },
  {
    name: "Book",
    unicode: "\ud83d\udcd6", // Unicode character for a book
    description: "A knowledge-filled book to expand your mind.",
  },
  // Add more objects with their corresponding Unicode characters and descriptions
];

// Function to handle object acquisition
function acquireObject(player, object) {
  // Add logic to handle acquiring the object
  console.log("Acquired object:", object.name);
  console.log("Description:", object.description);
}


// Create a sprite representing an object in the game world
function createObjectSprite(x, y, object) {
  const objectSprite = game.add.text(x, y, object.unicode, {
    fontSize: "32px",
    fill: "#ffffff",
  });
  objectSprite.inputEnabled = true;
  objectSprite.events.onInputDown.add(() => acquireObject(player, object));
}

// Usage example:
const objectToAcquire = objects[0]; // Assuming you want to acquire the first object in the array
createObjectSprite(100, -150, objectToAcquire); // Create a sprite for the object at a specific position
createObjectSprite(120, -150, objects[1]);
  
};

// UPDATE == UPDATE == UPDATE == UPDATE

playState.update = function () {
  game.physics.arcade.collide(player, platforms);
  game.physics.arcade.collide(coins, platforms);
  game.physics.arcade.collide(this.companies, platforms);
  game.physics.arcade.collide(this.companies, player, tellAStory, null, this);

  game.physics.arcade.collide(this.daniel, player, pauseOrResumeStory, null, this);

  game.physics.arcade.overlap(player, coins, this.collectCoins);
  game.physics.arcade.overlap(player, hazards, this.hitHazard);
  game.physics.arcade.overlap(player, enemies, this.hitHazard);
  game.physics.arcade.overlap(player, sea, this.sink);
  //player.body.onEndContact.add(PlayState.restoreSpeed, this);
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
  
  // DEBUG
  // game.debug.spriteInfo(player, 32, 32);
  
  if (player.position.y > sealevel){
    velocity_x=100;
    // velocity_y = 150;
    gravity = 190;
  } else {
    gravity = 1900;
    velocity_x = 200;
    velocity_y = 900;
  }
  
  if (player.position.y < -2000){
    player.body.gravity.y = 70;
  } else {
    player.body.gravity.y = gravity;
  }
  
  player.body.velocity.x = 0;
  if (game.input.keyboard.isDown(Phaser.Keyboard.LEFT) === true || game.input.keyboard.isDown(Phaser.Keyboard.A) === true || left) {
      player.body.velocity.x = -velocity_x;
  } else if (game.input.keyboard.isDown(Phaser.Keyboard.RIGHT) === true || game.input.keyboard.isDown(Phaser.Keyboard.D) === true || right) {
      player.body.velocity.x = velocity_x;
  }

  if ((game.input.keyboard.isDown(Phaser.Keyboard.UP) === true || game.input.keyboard.isDown(Phaser.Keyboard.W) === true || jump) && player.body.touching.down === true ) {
      player.body.velocity.y = -velocity_y;
    player.body.thrust=3000
  }

  if ((game.input.keyboard.isDown(Phaser.Keyboard.DOWN) === true || game.input.keyboard.isDown(Phaser.Keyboard.S) === true || duck) && player.body.touching.down === false) {
      player.body.velocity.y = velocity_y;
  }

  if (game.input.keyboard.isDown(Phaser.Keyboard.SPACEBAR) === true ) {
      //player.body.velocity.x = -velocity_y;
    player.body.angularVelocity= 100;
    player.body.thrust=3000;
  }
  
  
    if (game.input.keyboard.isDown(Phaser.Keyboard.ENTER)) {
      player.character.stateChange();
    }

    if (game.input.keyboard.isDown(Phaser.Keyboard.M)) {
      player.character.moneyEarnedAnimation();
    }

  if (game.input.keyboard.isDown(Phaser.Keyboard.X) === true || fire) {
      var wall = game.add.sprite(player.position.x, player.position.y-29, "platform");
      wall.body.immovable = true;
      platforms.add(wall);
      platforms.setAll('inputEnabled', true);  
      platforms.callAll('input.enableDrag', 'input');
  }

  if (game.input.keyboard.isDown(Phaser.Keyboard.T) === true ) {
    //  player.position.x = player.position.x + 20;
    player.position.y = 400;
    rh.position.y = player.position.y + 50;
    // player.scale.x = 4;
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

  this.checkAlive(coins);


  if(playState.gamerNameText){
      playState.gamerNameText.position = {x:player.position.x-20, y:player.position.y-50}; 
  }

  game.world.wrap(player, 0, true);

  this.myText.text = "Sealevel: "+ sealevel + ' Player: '+ Math.round(player.position.y);
  
};

playState.collectCoins = function (player, coin) {
  coin.kill();
  coinSound.play();
  // sea.scaleY = 1.5;
  sea.y-=50;
  sealevel-=50;
  //elon.scale= {x:0.1+elon.scale.x, y:0.1+elon.scale.y};
  game.camera.follow(elon);
  this.timeLimit2= 2;
  this.timer2 = game.time.events.loop(400, tick2, this);
};

var tick2 = function () {
    this.timeLimit2--;
    if (this.timeLimit2 === 0) {
        game.camera.follow(player);
    }
};

playState.hitHazard = function(player,hazard) { 
  hazardSound.play();
  game.camera.shake(0.05, 500); 
  hazard.kill();
  if (lives != 0) {
    lives--;
  }
  else {  
    lives = 3;
    currentLevel = 1;
    player.kill();
    game.state.start("gameover");
    //game.state.start("play", true, false, lives, currentLevel);
  }
};

playState.sink = function (player, sea) {
  //sinkSound.play();
  // if (lives != 0) {
    //lives--;
  // }
  //player.body.velocity.y = -30;
  
  playState.sweat.x = player.position.x; 
  playState.sweat.y = player.position.y+10; 
  playState.sweat.start(true, 300, null, 20);
  
  velocity_x=100;
  velocity_y = 150;
  gravity = 190;
};

playState.restoreSpeed = function (body, bodyB, shapeA, shapeB, equation) {
  //sinkSound.play();
  // if (lives != 0) {
    //lives--;
  // }
  //player.body.velocity.y = -30;
  velocity_x=600;
  gravity = 900;
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
    if (count_alive === 3) {
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
  sealevel-=3
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

function gofull() {

  if (game.scale.isFullScreen)
  {
      game.scale.stopFullScreen();
  }
  else
  {
      game.scale.startFullScreen(false);
  }

}


function dragUpdate(sprite, pointer, dragX, dragY, snapPoint) {
  console.log(sprite.renderOrderID);
}


var tellAStory = function () {
  if (story == undefined){
    story = game.add.audio("transhuman");
    story.play();
  }
}

var pauseOrResumeStory = function () {
  if (!story.paused)
  {
      story.pause();
  }
  else
  {
      story.resume();
  }
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
  this.gameoverText = game.add.text(100,100, "You won!", "1:00"); 
  this.gameoverText.fill = "#ff0000"; 
  
  var congratulations = game.sound.add("won", 1, true); 
  congratulations.play();
  // this.time.events.add(300, this.restart, this);
}; 
youwinState.restart = function(){ 
  story.pause();
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
                wall = game.add.sprite(0 + 32 * j, 32 *(-level.length + i), "platform");
                wall.body.immovable = true;
                platforms.add(wall);
            } else if (level[i][j] === "o") { // Create a coin and add it to the 'coins' group
                coin = game.add.sprite(0 + 32 * j, 32 *(-level.length + i), "diamond");
                // coin.body.gravity.y = 200;
                // coin.animations.add("rotate", [0, 1, 2, 1], 6, true);
                // coin.animations.play("rotate");
                coins.add(coin);
            } else if (level[i][j] === "h") { 
                // Create a enemy and add it to the 'enemies' group
                var newhazard = game.add.sprite(0 + 32 * j, 32 *(-level.length + i), "cnbc");
                newhazard.scale = {x:0.2, y:0.2};
                //var newhazard = hazards.create(0 + 32 * j, 0 + 32 * i, 'cnbc');
                // newhazard.animations.add('flicker', [0, 1], 6, true); 
                // newhazard.animations.play('flicker');
                hazards.add(newhazard);
              
            }
        }
    }
}


