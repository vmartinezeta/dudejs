import Phaser from "phaser";

export default class Segmento extends Phaser.GameObjects.Sprite {
    constructor(scene, x, y, texture, origin = 0, scale = 1) {
        super(scene, x, y, texture);
        this.setOrigin(origin);
        this.setScale(scale);
        scene.add.existing(this);
        scene.physics.add.existing(this);
        this.body.setImmovable(true);
        this.body.setAllowGravity(false);
    }
}