import Phaser from "phaser";

export default class Circuito extends Phaser.GameObjects.Group {
    constructor(scene) {
        super(scene);
        this.scene = scene;
        scene.add.existing(this);
        scene.physics.add.existing(this);

        const superficie = this.scene.physics.add.sprite(0, this.scene.game.config.height-40, "platform");
        superficie.setOrigin(0);
        superficie.setScale(2.5);
        superficie.body.setImmovable(true);
        superficie.body.setAllowGravity(false);
        this.add(superficie);
    }    
}