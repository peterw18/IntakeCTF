(function() {
    // load canvas
    var canvas = document.getElementById('canvas');
    var ctx = canvas.getContext('2d');
    canvas.width = 1000;
    canvas.height = 600;
      

    // input setup
    var keyState = []; 
    keyState.length = 256;
    canvas.addEventListener('keydown', onKeyDown);
    canvas.addEventListener('keyup', onKeyUp);

    // key setup
    var keyUp = 87;
    var keyDown = 83;
    var keyLeft = 65;
    var keyRight = 68;
    var keyShoot = 32;
    var keyStart = 13;

    // fps
    var FPS = 30;

    // game start?
    var start = false;

    // score
    var score = 0;

    // direction
    var lastDir = 'r';

    // create player object
    var player = new Player();

    // storing in-game objects
    var pBullets = [];
    var enemies = [];
    var Indicators = [];

    // weapon delay
    var w_delay = 0;

    // player hit delay
    var hit_delay = 0;

    // difficulty modifier
    var difLevel = 0.02;

    // keydown functions
    function onKeyDown(event) {
        keyState[event.keyCode] = true;
        if (event.keyCode == 32){
            event.preventDefault();
        }
    }

    function onKeyUp(event) {
        keyState[event.keyCode] = false;
    }


    // indicator functions
    function ScoreIncrease(enemy){
        Indicators.push(new Indicator(enemy, 'e'));
        score += 10;
    }    

    function HealthDecrease(player){
        Indicators.push(new Indicator(player, 'p'))
    }

    ///////////////////////////////////////////////////
    // indicator class
    function Indicator(enemy, state){
        //public variables
        this.active = true;
        this.starty = enemy.y;
        this.y = this.starty;
        this.x = enemy.x;
        this.yVel = 1;
        this.state = state;
        if (this.state == 'e'){
            this.width = 24;
            this.height = 18;
        } else {
            this.width = 15;
            this.height = 18;
        }
        
        // public functions
        Indicator.prototype.inBounds = function() {
            return this.x >= 0 && this.x <= canvas.width &&
                    this.y >= 0 && this.y <= canvas.height;
            };

        Indicator.prototype.draw = function() {
            // draw the image onto the canvas
            var Indicator = new Image();
            if (this.state == 'e')
                Indicator.src = './assets/score-10.png';
            else
                Indicator.src = './assets/health-1.png';
            ctx.drawImage(Indicator, this.x, this.y, this.width, this.height);
        };
    
        Indicator.prototype.update = function() {
            // check coordinates and potentially remove object from canvas
            this.y -= this.yVel;
            this.active = this.inBounds() && this.active;
            if (Math.abs(this.starty - this.y) > 20){
                this.active = false;
            }
        };

    }

    ///////////////////////////////////////////////////
    // player class
    function Player() {
    // private variables
    var HP = 5;
    var w_type = 1;
    var cd_factor = 10; 
    
    // private methods
    this.getHP = function() {
        return HP;
    };
    this.getHit = function() {
        HP -= 1;
        hit_delay = 500;
    };
    this.getWtype = function() {
        return w_type;
    };
    this.getCD = function() {
        return cd_factor;
    };
    
    // public properties
    this.active = true;
    this.width = 58;
    this.height = 56;
    this.x = this.width*1.5;
    this.y = (canvas.height - this.height)/2;
    }

    Player.prototype.draw = function() {
        var userSprite = new Image();
        if (lastDir == 'r')
            userSprite.src = 'assets/hunter-right.png';
        else
            userSprite.src = 'assets/hunter-left.png';

        ctx.drawImage(userSprite, this.x, this.y, this.width, this.height);
    };

    Player.prototype.shoot = function() {
    if (lastDir == 'r')
        this.tempVel = 16;
    else
        this.tempVel = -16;
    if(w_delay === 0) { 
        pBullets.push(new Bullet({
        vel: this.tempVel,
        x: this.x + this.width/2,
        y: this.y,
        dir: lastDir
        }));
        w_delay = 200;
    }
    };
    ///////////////////////////////////////////////////



    ///////////////////////////////////////////////////
    // bullet class
    function Bullet(bullet) {
    this.active = true;
    this.xVel = -bullet.vel;
    this.width = 42;
    this.height = 14;
    this.x = bullet.x;
    this.y = bullet.y + (0.5*player.height);
    this.dir = bullet.dir;
    }

    Bullet.prototype.inBounds = function() {
    return this.x >= 0 && this.x <= canvas.width &&
            this.y >= 0 && this.y <= canvas.height;
    };

    Bullet.prototype.draw = function() {
        var bulletSprite = new Image();
        if (this.dir == 'r')
            bulletSprite.src = 'assets/arrow-right.png';
        else
            bulletSprite.src = 'assets/arrow-left.png';
    
        ctx.drawImage(bulletSprite, this.x, this.y, this.width, this.height);

    };

    Bullet.prototype.update = function() {
    this.x -= this.xVel;
    this.active = this.inBounds() && this.active;
    };

    Bullet.prototype.die = function() {
    this.active = false;
    };
    ///////////////////////////////////////////////////




    ///////////////////////////////////////////////////
    // Enemy Class
    function Enemy() {
    this.active = true;
    this.color = "red";
    this.y = canvas.height * Math.random();
    this.x = canvas.width;
    this.yVel = 0;
    this.xVel = 4;
    this.width = 0;
    this.height = 0;
    this.range = 300;
    this.sprite = "";
    }

    Enemy.prototype.inBounds = function() {
    return this.x >= 0 && this.x <= canvas.width &&
            this.y >= 50 && this.y <= canvas.height-(60+this.height);  
    };

    Enemy.prototype.draw = function() {
        if (this.sprite == ""){
            if (Math.random() > 0.9){
                this.sprite='bandit';
                this.width = 58;
                this.height = 56;
            } else {
                this.sprite='boar';
                this.width = 54;
                this.height = 32;
            }
        }
        var enemySprite = new Image();
        if (this.xVel > 0)
            enemySprite.src = 'assets/'+this.sprite+'-left.png';
        else
            enemySprite.src = 'assets/'+this.sprite+'-right.png';
    
        ctx.drawImage(enemySprite, this.x, this.y, this.width, this.height);
    };

    Enemy.prototype.update = function() {
    if (Math.abs(player.x - this.x) < this.range) {
        if ((player.y - this.y) > 0) {
        this.yVel = 2;
        } else if ((player.y - this.y) < 0) {
        this.yVel = -2;
        } else {
        this.yVel = 0;
        }
    }
    if (this.x > player.x && this.xVel < 4){
        this.xVel += 0.1;
    } else  if (this.xVel > -4){
        this.xVel -= 0.1;
    }
    this.x -= this.xVel;
    this.y += this.yVel;
    this.active = this.active && this.inBounds();
    };

    Enemy.prototype.die = function() {
    this.active = false;
    };
    ///////////////////////////////////////////////////


    ///////////////////////////////////////////////////
    // collision check & handling
    function collisionCheck(a, b) {
        if (a.x > b.x && a.y > b.y){
            if (a.x < (b.x + b.width) && a.y < (b.y + b.height)){
                return true;
            }
        } else {
            return false;
        }
    }

    function collisionOccurs() {
    pBullets.forEach(function(bullet) {
        enemies.forEach(function(enemy) {
        if (collisionCheck(bullet, enemy)) {
            bullet.die();
            ScoreIncrease(enemy);
            enemy.die();
        }
        });
    });
    
    enemies.forEach(function(enemy) {
        if (collisionCheck(enemy, player)) {
            HealthDecrease(player);
            enemy.die();
            player.getHit();
        }
    });
    }
    ///////////////////////////////////////////////////



    ///////////////////////////////////////////////////
    // interval functions

    var intervals = [];


    intervals.push(setInterval(function() {
    //canvas.focus();
    startGame();
    if (start) {
        if (player.getHP() > 0)
        canvas.focus();
        update();
        draw();
        collisionOccurs();
    }
    },1000/FPS));

    intervals.push(setInterval(function(){
        if (start && player.getHP() > 0){
            difLevel = difLevel + 0.005;
        }
    }, 5000));

    function startGame() {
    if (!start) {
        ctx.font = "25pt Calibri";
        ctx.fillStyle = "white";
        ctx.fillText("Get your name on the leaderboard to unlock the flag!", 47, 180);
        ctx.font = "20pt Calibri";
        ctx.fillText("WASD - move", 47, 210);
        ctx.fillText("[SPACE] - shoot", 47, 240);
        ctx.fillText("[ENTER] - start", 47, 270);
    }
        if(keyState[keyStart])
        start = true;  
    }

    function update() {
    // movements
    if(keyState[keyUp] && player.y > 50)
        player.y -= 6;
    if(keyState[keyDown] && player.y < canvas.height - (player.height + 60))
        player.y += 6;
    if(keyState[keyLeft] && player.x > 0){
        lastDir = 'l';
        player.x -= 6;
    }
    if(keyState[keyRight] && player.x < canvas.width - player.width){
        lastDir = 'r';
        player.x += 6;
    }
    
    // shooting
    if(keyState[keyShoot])
        player.shoot();
    
    pBullets.forEach(function(bullet) {
        bullet.update();
    });

    Indicators.forEach(function(Indicator) {
        Indicator.update();
    });

    Indicators = Indicators.filter(function(Indicator){
        return Indicator.active;
    });
    
    pBullets = pBullets.filter(function(bullet) {
        return bullet.active;
    });
    
    if(w_delay > 0)
        w_delay -= player.getCD();
    
    // enemies
    if(Math.random() < difLevel)
        enemies.push(new Enemy());
    
    enemies.forEach(function(enemy) {
        enemy.update();
    });
    
    enemies = enemies.filter(function(enemy) {
        return enemy.active;
    });

    
    if (hit_delay > 0)
        hit_delay -= 1;
    }

    function draw() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);

    var healthStatus = new Image();
    healthStatus.src = "./assets/health_" + player.getHP() + ".png";
    ctx.drawImage(healthStatus, 0, 0, 40, 40);
    
    player.draw();
    
    pBullets.forEach(function(bullet) {
        bullet.draw();
    });

    Indicators.forEach(function(Indicator) {
        Indicator.draw();
    });
    
    enemies.forEach(function(enemy) {
        enemy.draw();
    });
    
    // game over
    if (player.getHP() <= 0) {
        ctx.font = "30pt Calibri";
        ctx.fillStyle = "white";
        ctx.fillText("Game Over", 170, 220);

        for (var i=0; i<intervals.length; i++) {
            clearInterval(intervals[i]);
          }
    }

    // keeping score
    ctx.font = "16pt Calibri";
    ctx.fillStyle = "white";
    ctx.fillText("Score: "+score, 0, canvas.height); 
    }
    ///////////////////////////////////////////////////


    
})();
document.getElementById('canvas').focus();
