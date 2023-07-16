class ThrowableObjectLeft extends MovableObject {

    constructor(x, y) {
        super().loadImage('./img/7_statusbars/3_icons/icon_salsa_bottle.png');
        this.x = x;
        this.y = y;
        this.height = 60;
        this.width = 40;
        this.throw();
    }


    /**
     * This function is used to throw a bottle.
     */
    throw () {
        this.speedY = 30;
        this.applyGravity();
        setInterval(() => {
            this.x -= 15;
        }, 25);
    }
}