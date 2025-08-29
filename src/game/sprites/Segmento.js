import Phaser from "phaser";

export default class Segmento extends Phaser.GameObjects.Sprite {
    constructor(scene, x, y, texture, origin=0, scale=1, angle=0) {
        super(scene, x, y, texture);
        this.setOrigin(origin);
        this.setScale(scale);
        this.setAngle(angle);

        scene.add.existing(this);
        scene.physics.add.existing(this);
        this.body.setImmovable(true);
        this.body.setAllowGravity(false);
        if (!angle) {
            this.body.setSize(this.width, this.height);
        } else if (angle === 90){
            this.body.setSize(this.height, this.width);
        }
    }
}