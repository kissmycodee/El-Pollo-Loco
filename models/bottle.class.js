class Bottle extends DrawableObject {

    y = 360;
    width = 40;
    height = 60;

    constructor() {
        super().loadImage('./img/6_salsa_bottle/1_salsa_bottle_on_ground.png');
        this.x = 350 + Math.random() * 1200;
    }

}