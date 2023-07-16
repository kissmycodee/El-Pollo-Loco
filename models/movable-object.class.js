class MovableObject extends DrawableObject {
    speed = 0.15;
    speedCharacter = 0.3;
    otherDirection = false;
    speedY = 0;
    acceleration = 3.5;
    energy = 100;
    lastHit = 0;


    /**
     to draw the images on the canvas
     */
    draw(ctx) {
        ctx.drawImage(this.img, this.x, this.y, this.width, this.height);
    }



    /**
     if is colliding with enemy
     */
    isColliding(mo) {
        return (this.x + this.width - this.offsetRight) >= (mo.x + mo.offsetLeft) && (this.x - this.offsetLeft) <= (mo.x + mo.width - mo.offsetRight) &&
            (this.y + this.height - this.offsetBottom) >= (mo.y + mo.offsetTop) &&
            (this.y + this.offsetTop) <= (mo.y + mo.height - mo.offsetBottom);
    }


    /**
       if  character is hit.
     */
    hit() {
        this.energy -= 1;
        if (this.energy < 0) {
            this.energy = 0;
        } else {
            this.lastHit = new Date().getTime();
        }
    }


    /**
        set the energy of an enemy to 0.
     */
    kill() {
        this.energy = 0;
    }


    /**
      is hurt or not.
     */
    isHurt() {
        let timePassed = new Date().getTime() - this.lastHit;
        timePassed = timePassed / 1000;
        return timePassed < 1;
    }

    /**
       is idle or not.
     */
    isIdle() {
        let timePassed = new Date().getTime() - this.world.keyboard.lastMove;
        return timePassed > 2000;
    }


    /**
         character or enemy is dead or not.
     */
    isDead() {
        return this.energy == 0;
    }


    /**
        aply gravity to object.
     */
    applyGravity() {
        setInterval(() => {
            if (this.isAboveGround() || this.speedY > 0) {
                this.y -= this.speedY;
                this.speedY -= this.acceleration;
            }
        }, 1000 / 25);
    }


    /**
     that a object is above a special  y axis or not and the high of the bottle. 
     */
    isAboveGround() {
        if (this instanceof Character) {
            return this.y < 175;
        } else if (this instanceof ThrowableObject) {
            return this.y < 375;
        }
    }

    /**
    load a single image.
     */
    loadImage(path) {
        this.img = new Image(); // this.img = document.getElementById(..) <img id=".." src="..">
        this.img.src = path;
    }


    /**
     load  array of images.
     */
    loadImages(arr) {
        arr.forEach((path) => {
            let img = new Image();
            img.src = path;
            this.imageCache[path] = img;
        });
    }


    /**
     play a animation of images in a intervall.
     */
    playAnimation(images) {
        let i = this.currentImage % images.length;
        let path = images[i];
        this.img = this.imageCache[path];
        this.currentImage++;
    }


    /**
    move left
     */
    moveLeft() {
        this.x -= this.speed;
    }


    
    moveRight() {
        this.x += this.speed;
    }
}