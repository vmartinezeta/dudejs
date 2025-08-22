import Phaser from "phaser";

export default class Segmento extends Phaser.GameObjects.Sprite {
    constructor(scene, x, y, texture) {
        super(scene, x, y, texture);
        this.setOrigin(0);
        this.setScale(1);
        scene.add.existing(this);
        scene.physics.add.existing(this);
        this.body.setImmovable(true);
        this.body.setAllowGravity(false);
    }
}