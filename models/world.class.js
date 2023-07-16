class World {
    character = new Character();
    level = level1;
    canvas;
    ctx;
    keyboard;
    camera_X = 0;
    statusbarEnergy = new StatusbarEnergy();
    statusbarBottles = new StatusbarBottles();
    statusbarCoins = new StatusbarCoins();
    throwableObjects = [];
    bottle = new Bottle();
    bottleSound = new Audio('audio/bottle.mp3');
    hitChickenSound = new Audio('audio/chicken.mp3');
    hitEndbossSound = new Audio('audio/endboss_hit.mp3');
    coinSound = new Audio('audio/coin.mp3');
    

    constructor(canvas) {
        this.ctx = canvas.getContext('2d');
        this.canvas = canvas;
        this.keyboard = keyboard;
        this.draw();
        this.setWorld();
        this.run();

    }


    /**
        apply world  to character
     */
    setWorld() {
        this.character.world = this;
    }


    /**
        run the checks every 200ms
     */
    run() {
        setInterval(() => {
            this.checkCollisionsWithEnemy();
            this.checkCollisionBottleAndEnemy();
        }, 50)
        setInterval(() => {
            this.checkCollisionsWithEndboss();
            this.checkCollisionWithBottle();
            this.checkCollisionWithCoin();
            this.checkCollisionBottleAndEndboss();
            this.checkTrowableObjects();
        }, 150);
        setInterval(() => {
            this.checkCollisionBottleAndEndboss();
            this.checkCharacterIsNearToEndboss();
        }, 2800)
    }


    /**
      if  bottle hits  endboss
     */
    checkCollisionBottleAndEndboss() {
        this.hitEndbossSound.volume = 0.75;
        this.throwableObjects.forEach((bottle) => {
            this.level.endboss.forEach((endboss) => {
                if (endboss.isColliding(bottle)) {
                    endboss.endbossHurt();
                    this.hitEndbossSound.play()
                }
                if (endboss.isDead()) {
                    endboss.endbossDies();
                    setTimeout(() => {
                        this.level.endboss.splice(this.level.endboss.indexOf(endboss), 1);
                    }, 943);
                }
            });
        });
    }


    /**
        if  bottle hits enemy
     */
    checkCollisionBottleAndEnemy() {
        this.hitChickenSound.volume = 0.65;
        this.throwableObjects.forEach((bottle) => {
            this.level.enemies.forEach((enemy) => {
                if (enemy.isColliding(bottle)) {
                    enemy.kill();
                    this.hitChickenSound.play();
                }
            });
        });
    }


    /**
      throw  bottle, if character has one
     */
    checkTrowableObjects() {
        if (this.keyboard.SPACE && this.statusbarBottles.amount > 0) {
            this.statusbarBottles.amount--;
            if (this.character.otherDirection == true) {
                let bottle = new ThrowableObjectLeft(this.character.x, this.character.y + this.character.height / 2);
                this.throwableObjects.push(bottle);
                this.checkCollisionBottleAndEnemy();
            }
            if (this.character.otherDirection == false) {
                let bottle = new ThrowableObject(this.character.x + this.character.width, this.character.y + this.character.height / 2);
                this.throwableObjects.push(bottle);
            }
            this.statusbarBottles.setAmount();
            this.checkCollisionBottleAndEnemy();

        }
    }


    /**
        if the character colides with  bottle and add it to statusbar
     */
    checkCollisionWithBottle() {
        this.bottleSound.volume = 0.65;
        this.level.bottles.forEach((bottle) => {
            if (this.character.isColliding(bottle)) {
                this.statusbarBottles.amount++;
                this.statusbarBottles.setAmount();
                this.level.bottles.splice(this.level.bottles.indexOf(bottle), 1);

                this.bottleSound.play();
            }
        });
    }


    /**
        if the character colides coin add it to statusbar
     */
    checkCollisionWithCoin() {
        this.coinSound.volume = 0.65;
        this.level.coins.forEach((coin) => {
            if (this.character.isColliding(coin)) {
                this.statusbarCoins.amount++;
                this.statusbarCoins.setAmount();
                this.level.coins.splice(this.level.coins.indexOf(coin), 1);
                this.coinSound.play();
            }
        });
    }


    /**
        if the character colides with an anemy and lower his energy and animate the hit
        If  character on enemy, kill enemy.
     */
    checkCollisionsWithEnemy() {
        this.hitChickenSound.volume = 0.65;
        this.level.enemies.forEach((enemy) => {
            if (this.character.isColliding(enemy) && this.character.isAboveGround()) {
                enemy.kill();
                this.hitChickenSound.play();
            }
            if (this.character.isColliding(enemy) && !enemy.isDead()) {
                this.character.hit();
                this.statusbarEnergy.setPercentage(this.character.energy);
            }
        });
    }


    /**
        if the character colides with the endboss lower his energy and animate the hit
     */
    checkCollisionsWithEndboss() {
        this.level.endboss.forEach((endboss) => {
            if (this.character.isColliding(endboss)) {
                this.character.hit();
                this.statusbarEnergy.setPercentage(this.character.energy);
            }
        });
    }


    /**
      if the charackter is near to the endboss
     */
    checkCharacterIsNearToEndboss() {
        this.level.endboss.forEach((endboss) => {
            if (this.character.x > 1800) {
                endboss.letEndbossWalk();
            }
            if (endboss.x < 0) {
                this.character.characterDies();
            }
        });
    }


  
    draw() {
        this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);
        this.ctx.translate(this.camera_X, 0);
        this.addObjectsToMap(this.level.backgroundObjects);
        this.ctx.translate(-this.camera_X, 0);
        this.addToMap(this.statusbarEnergy);
        this.addToMap(this.statusbarBottles);
        this.addToMap(this.statusbarCoins);
        this.ctx.translate(this.camera_X, 0);
        this.addObjectsToMap(this.level.clouds);
        this.addObjectsToMap(this.level.enemies);
        this.addObjectsToMap(this.level.bottles);
        this.addObjectsToMap(this.level.coins);
        this.addToMap(this.character);
        this.addObjectsToMap(this.level.endboss);
        this.addObjectsToMap(this.throwableObjects);
        this.ctx.translate(-this.camera_X, 0);

        let self = this;
        requestAnimationFrame(function() {
            self.draw();
        });
    }


    /**
        add the objects to the canvas
     */
    addObjectsToMap(objects) {
        objects.forEach(o => {
            this.addToMap(o);
        });
    }


    /**
      add images to the canvas.
     */
    addToMap(mo) {
        if (mo.otherDirection) {
            this.flipImage(mo);
        }
        mo.draw(this.ctx);
        //mo.drawFrame(this.ctx);

        if (mo.otherDirection) {
            this.flipImageBack(mo);
        }
    }


    /**
     flip the image of the character, if it moves back
     */
    flipImage(mo) {
        this.ctx.save();
        this.ctx.translate(mo.width, 0);
        this.ctx.scale(-1, 1);
        mo.x = mo.x * -1;
    }


    /**
      flip the image of the character back to start direction
     */
    flipImageBack(mo) {
        mo.x = mo.x * -1;
        this.ctx.restore();
    }
}