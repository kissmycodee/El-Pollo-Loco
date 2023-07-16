class ThrowableObject extends MovableObject {

    IMAGES_FLYING = [
            './img/6_salsa_bottle/bottle_rotation/1_bottle_rotation.png',
            './img/6_salsa_bottle/bottle_rotation/2_bottle_rotation.png',
            './img/6_salsa_bottle/bottle_rotation/3_bottle_rotation.png',
            './img/6_salsa_bottle/bottle_rotation/4_bottle_rotation.png',
    ];


    IMAGES_SHATTERING = [
        './img/6_salsa_bottle/bottle_rotation/bottle_splash/1_bottle_splash.png',
        './img/6_salsa_bottle/bottle_rotation/bottle_splash/2_bottle_splash.png',
        './img/6_salsa_bottle/bottle_rotation/bottle_splash/3_bottle_splash.png',
        './img/6_salsa_bottle/bottle_rotation/bottle_splash/4_bottle_splash.png',
        './img/6_salsa_bottle/bottle_rotation/bottle_splash/5_bottle_splash.png',
        './img/6_salsa_bottle/bottle_rotation/bottle_splash/6_bottle_splash.png'
    ];


    constructor(x, y) {
        super().loadImages(this.IMAGES_FLYING);
        this.loadImages(this.IMAGES_SHATTERING);
        this.loadImage(this.IMAGES_FLYING[0]);
        this.x = x;
        Object.freeze(this.x);
        this.y = y;
        this.height = 60;
        this.width = 40;
        this.throw();
        this.animate();
    }


    /**
      throw a bottle.
     */
    throw () {
        this.speedY = 20;
        this.applyGravity();
        setInterval(() => {
            if (this.isAboveGround()) {
                this.x += 10;
            }
        }, 1000 / 60);
    }


    animate() {
        let timeoutSet = false;

        let interval = setInterval(() => {
            if (this.isAboveGround()) {
                this.playAnimation(this.IMAGES_FLYING);
            } else {
                if (!timeoutSet) {
                    timeoutSet = true;
                    this.currentImage = 0;

                    setTimeout(() => {
                        clearInterval(interval);
                        let index = world.throwableObjects.indexOf(this);
                        world.throwableObjects.splice(index, 1);
                    }, 400);
                }
                this.playAnimation(this.IMAGES_SHATTERING);
            }
        }, 100);
    }
}