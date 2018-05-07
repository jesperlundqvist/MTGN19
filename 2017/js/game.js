// Create our 'main' state that will contain the game
var mainState = {
    preload: function() {
        // Load the fish sprite
        game.load.image('fish', '/assets/fish.png');

        // Load pipes
        game.load.image('pipe', '/assets/stone.png');

        // Jump sound
        game.load.audio('jump', '/assets/jump.wav');
    },

    create: function() {
        this.pipeSpeed = -200;
        this.timeBetweenPipes = 1000;
        this.fallSpeed = 1300;
        this.jumpHeight = -450;

        // Change the background color of the game to blue
        // game.stage.backgroundColor = '#71c5cf';

        // Set the physics system
        game.physics.startSystem(Phaser.Physics.ARCADE);

        // Create an empty group
        this.pipes = game.add.group();

        this.timer = game.time.events.loop(this.timeBetweenPipes, this.addRowOfPipes, this);

        // Display the fish at the position x=100 and y=245
        this.fish = game.add.sprite(60, 150, 'fish');

        // Move the anchor to the left and downward
        this.fish.anchor.setTo(-0.2, 0.5);

        // Add physics to the fish
        // Needed for: movements, gravity, collisions, etc.
        game.physics.arcade.enable(this.fish);

        // Add gravity to the fish to make it fall
        this.fish.body.gravity.y = this.fallSpeed;

        // Call the 'jump' function when the spacekey is hit
        var spaceKey = game.input.keyboard.addKey(
                        Phaser.Keyboard.SPACEBAR);
        spaceKey.onDown.add(this.jump, this);

        game.input.onTap.add(this.jump, this);

        this.score = 0;
        this.labelScore = game.add.text(20, 20, "0",
            { font: "30px Arial", fill: "#ffffff" });

        this.jumpSound = game.add.audio('jump');
    },

    update: function() {
        /// If the fish is out of the screen (too high or too low)
        // Call the 'restartGame' function
        if (this.fish.y < 0 || this.fish.y > 340)
            this.restartGame();

        game.physics.arcade.overlap(
            this.fish, this.pipes, this.hitPipe, null, this);

        if (this.fish.angle < 20)
            this.fish.angle += 1;
    },

    // Make the fish jump
    jump: function() {
        if (this.fish.alive == false)
            return;
        // Add a vertical velocity to the fish
        this.jumpSound.play();
        this.fish.body.velocity.y = this.jumpHeight;
        game.add.tween(this.fish).to({angle: -20}, 100).start();
    },

    // Restart the game
    restartGame: function() {
        // Start the 'main' state, which restarts the game
        game.state.start('dead', true, false, this.score);
    },

    addOnePipe: function(x, y) {
        // Create a pipe at the position x and y
        var pipe = game.add.sprite(x, y, 'pipe');

        // Add the pipe to our previously created group
        this.pipes.add(pipe);

        // Enable physics on the pipe
        game.physics.arcade.enable(pipe);

        // Add velocity to the pipe to make it move left
        pipe.body.velocity.x = this.pipeSpeed;

        // Automatically kill the pipe when it's no longer visible
        pipe.checkWorldBounds = true;
        pipe.outOfBoundsKill = true;
    },

    addRowOfPipes: function() {
        // Randomly pick a number between 1 and 5
        // This will be the hole position
        var hole = Math.floor(Math.random() * 3) + 1;

        // Add the 6 pipes
        // With one big hole at position 'hole' and 'hole + 1'
        for (var i = 0; i < 7; i++)
            if (i != hole && i != hole + 1 && i != hole + 2)
                this.addOnePipe(300 , i * 55 + 10);

        this.score += 1;
        this.labelScore.text = this.score;
    },
    hitPipe: function() {
        // If the fish has already hit a pipe, do nothing
        // It means the fish is already falling off the screen
        if (this.fish.alive == false)
            return;

        // Set the alive property of the fish to false
        this.fish.alive = false;

        // Prevent new pipes from appearing
        game.time.events.remove(this.timer);

        // Go through all the pipes, and stop their movement
        this.pipes.forEach(function(p){
            p.body.velocity.x = 0;
        }, this);
    },
};

var startState = {

    create: function() {
        this.startText = game.add.text(70, 50, "Tryck på space eller på",
            { font: "15px Arial", fill: "#ffffff" });
        this.startText2 = game.add.text(20, 70, "spelområdet för att starta samt hoppa",
            { font: "15px Arial", fill: "#ffffff" });

        // Call the 'jump' function when the spacekey is hit
        var spaceKey = game.input.keyboard.addKey(
                        Phaser.Keyboard.SPACEBAR);
        spaceKey.onDown.add(this.startGame, this);

        game.input.onTap.add(this.startGame, this);
    },

    startGame: function() {
        game.state.start('main');
    }
};

var deadState = {
    init: function(score) {
        console.log('död');
        this.score = score;
    },

    create: function() {
        this.startText = game.add.text(70, 50, "Tryck på space eller på",
            { font: "15px Arial", fill: "#ffffff" });
        this.startText2 = game.add.text(20, 70, "spelområdet för att starta samt hoppa",
            { font: "15px Arial", fill: "#ffffff" });

        this.startText3 = game.add.text(70, 120, "Poäng: " + this.score,
            { font: "30px Arial", fill: "#ffffff" });

        console.log(this.score);

        // Call the 'jump' function when the spacekey is hit
        var spaceKey = game.input.keyboard.addKey(
                        Phaser.Keyboard.SPACEBAR);
        spaceKey.onDown.add(this.startGame, this);

        game.input.onTap.add(this.startGame, this);

        this.addscore();
    },

    startGame: function() {
        game.state.start('main');
    },

    addscore: function(){
        var username = $('#js-username').html();
        console.log(username);

        $.ajax({
          url: 'game_addscore.php',
          type: "POST",
          data: {
            'score': this.score,
            'username': username
          },
          success: function(output){
            console.log('Skickat highscore!');
          }
        });
    }
};



// Initialize Phaser, and create a 300px by 490px game
var game = new Phaser.Game(300, 340, Phaser.AUTO, 'js-phaser',null,true);
// var game = new Phaser.Game('100%', '100%',Phaser.AUTO, 'js-phaser');

// Add the 'mainState' and call it 'main'
game.state.add('main', mainState);
game.state.add('start', startState);
game.state.add('dead', deadState);

game.state.start('start');

