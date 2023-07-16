class Endboss extends MovableObject {
  height = 450;
  width = 400;
  y = 10;
  energy = 110;
  contactWithCharacter = false;

  IMAGES_ANGRY = [
    "./img/4_enemie_boss_chicken/2_alert/G5.png",
    "./img/4_enemie_boss_chicken/2_alert/G6.png",
    "./img/4_enemie_boss_chicken/2_alert/G7.png",
    "./img/4_enemie_boss_chicken/2_alert/G8.png",
    "./img/4_enemie_boss_chicken/2_alert/G9.png",
    "./img/4_enemie_boss_chicken/2_alert/G10.png",
    "./img/4_enemie_boss_chicken/2_alert/G11.png",
    "./img/4_enemie_boss_chicken/2_alert/G12.png",
  ];

  IMAGES_WALKING = [
    "./img/4_enemie_boss_chicken/1_walk/G1.png",
    "./img/4_enemie_boss_chicken/1_walk/G2.png",
    "./img/4_enemie_boss_chicken/1_walk/G3.png",
    "./img/4_enemie_boss_chicken/1_walk/G4.png",
    "./img/4_enemie_boss_chicken/3_attack/G13.png",
    "./img/4_enemie_boss_chicken/3_attack/G14.png",
    "./img/4_enemie_boss_chicken/3_attack/G15.png",
    "./img/4_enemie_boss_chicken/3_attack/G16.png",
    "./img/4_enemie_boss_chicken/3_attack/G17.png",
    "./img/4_enemie_boss_chicken/3_attack/G18.png",
    "./img/4_enemie_boss_chicken/3_attack/G19.png",
    "./img/4_enemie_boss_chicken/3_attack/G20.png",
  ];

  IMAGES_HURTING = [
    "./img/4_enemie_boss_chicken/4_hurt/G21.png",
    "./img/4_enemie_boss_chicken/4_hurt/G22.png",
    "./img/4_enemie_boss_chicken/4_hurt/G23.png",
  ];

  IMAGES_DEAD = [
    "./img/4_enemie_boss_chicken/4_hurt/G21.png",
    "./img/4_enemie_boss_chicken/4_hurt/G22.png",
    "./img/4_enemie_boss_chicken/4_hurt/G23.png",
    './img/4_enemie_boss_chicken/5_dead/G24.png',
    './img/4_enemie_boss_chicken/5_dead/G25.png',
    './img/4_enemie_boss_chicken/5_dead/G26.png',
  ];

  constructor() {
    super().loadImage("./img/4_enemie_boss_chicken/2_alert/G5.png");
    this.x = 2100;
    this.loadImages(this.IMAGES_ANGRY);
    this.loadImages(this.IMAGES_WALKING);
    this.loadImages(this.IMAGES_HURTING);
    this.loadImages(this.IMAGES_DEAD);
    this.speed = 0.15;
    this.animate();
  }

  endbossHurt() {
    this.energy -= 10;
    if (this.energy < 0) {
      this.energy = 0;
    }
    let intervallId = setInterval(() => {
      this.playAnimation(this.IMAGES_HURTING);
    }, 410);
    setTimeout(() => {
      clearInterval(intervallId);
    }, 1000);
  }

  showEndScreen() {
    setTimeout(() => {
      document.getElementById("canvas").classList.add("d-none");
      document.getElementById("endScreen").classList.remove("d-none");
    }, 1000);
  }

  letEndbossWalk() {
    this.contactWithCharacter = true;
  }

  endbossDies() {
    let intervallId = setInterval(() => {
      this.playAnimation(this.IMAGES_DEAD);
    }, 100);

    setTimeout(() => {
      clearInterval(intervallId);
      document.getElementById("canvas").classList.add("d-none");
      document.getElementById("startScreen").classList.add("d-none");
      document.getElementById("endScreen").classList.remove("d-none");
    }, 1200);
  }

  endbossMoveLeft() {
    setInterval(() => {
      this.moveLeft();
    }, 1000 / 60);
  }

  animate() {
    setInterval(() => {
      if (this.isHit == false) {
        this.playAnimation(this.IMAGES_ANGRY);
      }
      if (this.contactWithCharacter == true) {
        this.playAnimation(this.IMAGES_WALKING);
        this.endbossMoveLeft();
      }
    }, 360);
  }
}
