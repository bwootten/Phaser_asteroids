function Ship(){
  this.ship = game.add.sprite(400,300,'shipImg');
  this.controls = game.input.keyboard.createCursorKeys();
  this.initialize()
}

Ship.prototype.initialize = function(){
  var thisShip = this.ship
  thisShip.scale.setTo(1.2,1.2);
  thisShip.anchor.setTo(0.5, 0.5);
  game.physics.arcade.enable(thisShip);
  thisShip.body.maxVelocity.x = 100;
  thisShip.body.maxVelocity.y = 100;
}

Ship.prototype.update = function(){
  var thisShip = this.ship
  thisShip.body.acceleration.x = 0
  thisShip.body.acceleration.y = 0
  thisShip.body.angularVelocity = 0
  if (this.controls.right.isDown){
    thisShip.body.angularVelocity = 100; 
  }

  if (this.controls.left.isDown){
    thisShip.body.angularVelocity = -100; 
  }

  if (this.controls.up.isDown){
    game.physics.arcade.accelerationFromRotation(thisShip.rotation - Math.PI/2, 100, thisShip.body.acceleration)
  }

  game.world.wrap(thisShip)
}

Ship.prototype.explode = function(){
  var thisShip = this.ship
  thisShip.kill()

  var explosion = explosions.getFirstExists(false);
  explosion.reset(thisShip.body.x, thisShip.body.y);
  explosion.play('explosion', 30, false, true)
}