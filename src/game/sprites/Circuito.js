import Phaser from "phaser";
import Segmento from "./Segmento";

export default class Circuito extends Phaser.GameObjects.Group {
    constructor(scene) {
        super(scene);
        this.scene = scene;
        scene.add.existing(this);
        scene.physics.add.existing(this);

        this.add(new Segmento(scene, 0, -12, "platform", 0, .75, 0));
        this.add(new Segmento(scene, 300, -12, "platform", 0, .75, 0));
        this.add(new Segmento(scene, 600, -12, "platform", 0, .75, 0));
        this.add(new Segmento(scene, 0, 162, "platform", .5, .75, 90));
        this.add(new Segmento(scene, 0, 322, "platform", .5, .75, 90));
        this.add(new Segmento(scene, 0, 484, "platform", .5, .75, 90));

        this.add(new Segmento(scene, 900, 162, "platform", .5, .75, 90));
        this.add(new Segmento(scene, 900, 322, "platform", .5, .75, 90));
        this.add(new Segmento(scene, 900, 484, "platform", .5, .75, 90));

        this.add(new Segmento(scene, 0, scene.game.config.height - 40, "platform", 0, 2.5));
    }
}