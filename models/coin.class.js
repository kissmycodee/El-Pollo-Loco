class Coin extends DrawableObject {

    width = 100;
    height = 100;

    constructor() {
        super().loadImage('./img/8_coin/coin_2.png');
        this.x = 300 + Math.random() * 2000;
        this.y = 100 + Math.random() * 50;
    }
}