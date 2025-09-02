import Phaser from "phaser";

export default class Roca extends Phaser.GameObjects.Sprite {
 
    constructor(scene, x, y, texture, vector) {
        super(scene, x, y, texture);
        this.setOrigin(1/2);
        this.setScale(1);
        this.modulo = 6;
        this.vector = vector;
        scene.add.existing(this);
        scene.physics.add.existing(this);
        this.body.allowGravity = false;
    }

    update() {
        this.x += this.modulo*this.vector.x;
        this.y += this.modulo*this.vector.y;
    }
}