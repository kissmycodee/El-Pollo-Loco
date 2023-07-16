class StatusbarBottles extends DrawableObject {

    IMAGES = [
        './img/7_statusbars/1_statusbar/3_statusbar_bottle/blue/0.png',
        './img/7_statusbars/1_statusbar/3_statusbar_bottle/blue/20.png',
        './img/7_statusbars/1_statusbar/3_statusbar_bottle/blue/40.png',
        './img/7_statusbars/1_statusbar/3_statusbar_bottle/blue/60.png',
        './img/7_statusbars/1_statusbar/3_statusbar_bottle/blue/80.png',
        './img/7_statusbars/1_statusbar/3_statusbar_bottle/blue/100.png'
    ];


    amount = 0;


    constructor() {
        super();
        this.loadImages(this.IMAGES);
        this.setAmount(0);
        this.x = 50;
        this.y = 70;
        this.width = 200;
        this.height = 60;
    }



    /**
     set the amount of the bottle statusbar.
     */
    setAmount() {
        let path = this.IMAGES[this.resolveImageIndex()];
        this.img = this.imageCache[path];
    }


    /**
     return the correct mumber of the image for the current amount.
     */
    resolveImageIndex() {
        if (this.amount == 0) {
            return 0;
        } else if (this.amount == 1) {
            return 1;
        } else if (this.amount == 2) {
            return 2;
        } else if (this.amount == 3) {
            return 3;
        } else if (this.amount == 4) {
            return 4;
        } else {
            return 5;
        }
    }
}