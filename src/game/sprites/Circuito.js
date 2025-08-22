import Phaser from "phaser";
import Segmento from "./Segmento";

export default class Circuito extends Phaser.GameObjects.Group {
    constructor(scene) {
        super(scene);
        this.scene = scene;
        scene.add.existing(this);
        scene.physics.add.existing(this);

        const suelo = new Segmento(scene, 0, scene.game.config.height-40, "platform");
        suelo.setScale(2.5);
        this.add(suelo);
    }
}