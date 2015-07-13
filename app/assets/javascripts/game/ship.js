function Ship(){
  this.ship = game.add.sprite(400,300,'shipImg');
  this.controls = game.input.keyboard.createCursorKeys();
  this.fireButton = game.input.keyboard.addKey(Phaser.Keyboard.S);
  this.bullets = game.add.group();
  this.ship.cooldown = 0;
  this.score = 0;
  this.initialize();
}

Ship.prototype.initialize = function(){
  var thisShip = this.ship
  var bullets = this.bullets
  thisShip.scale.setTo(1.2,1.2);
  thisShip.anchor.setTo(0.5, 0.5);
  game.physics.arcade.enable(thisShip);
  thisShip.body.maxVelocity.x = 100;
  thisShip.body.maxVelocity.y = 100;

  bullets.enableBody = true;
  bullets.physicsBodyType = Phaser.Physics.ARCADE;
  bullets.createMultiple(30, 'bullet');
  bullets.setAll('anchor.x', 0.5);
  bullets.setAll('anchor.y', 1);
  bullets.setAll('outOfBoundsKill', true);
  bullets.setAll('checkWorldBounds', true);
}

Ship.prototype.update = function(){
  var thisShip = this.ship
  thisShip.body.acceleration.x = 0
  thisShip.body.acceleration.y = 0
  thisShip.body.angularVelocity = 0
  if(thisShip.alive){
    if (this.controls.right.isDown){
      thisShip.body.angularVelocity = 100; 
    }

    if (this.controls.left.isDown){
      thisShip.body.angularVelocity = -100; 
    }

    if (this.controls.up.isDown){
      game.physics.arcade.accelerationFromRotation(thisShip.rotation - Math.PI/2, 100, thisShip.body.acceleration)
    }

    if (this.fireButton.isDown){
      if (game.time.now > thisShip.cooldown){
        var bullet = this.bullets.getFirstExists(false)
        if (bullet){
          var direction = thisShip.rotation - Math.PI/2
          bullet.reset((thisShip.x) + 8 * Math.cos(direction), (thisShip.y) + 8 * Math.sin(direction));
          bullet.body.velocity.y = 400 * Math.sin(direction);
          bullet.body.velocity.x = 400 * Math.cos(direction);
          thisShip.cooldown = game.time.now + 200;
        }
      }
    }
    game.world.wrap(thisShip)
  }
}

Ship.prototype.explode = function(){
  var thisShip = this.ship
  thisShip.kill()

  var explosion = explosions.getFirstExists(false);
  explosion.reset(thisShip.body.x, thisShip.body.y);
  explosion.scale.setTo(1,1)
  explosion.play('explosion', 30, false, true)
}