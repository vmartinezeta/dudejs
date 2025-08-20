import Phaser from "phaser";

export default class Cuchillo extends Phaser.GameObjects.Sprite {
    constructor(scene, x, y, texture){
        super(scene, x, y, texture);
        this.setOrigin(0, 1/2);
        scene.add.existing(this);
        scene.physics.add.existing(this);
        this.limiteInferior = 0;
        this.limiteSuperior = 0;
        this.dx = 20;
    }

    setIntervalo(li, ls) {
        this.limiteInferior = li;
        this.limiteSuperior = ls;
    }

    update() {
        if (this.x > this.limiteSuperior || this.x < this.limiteInferior) {
            this.dx = -1*this.dx;
        } 
        this.x += this.dx;
    }
}