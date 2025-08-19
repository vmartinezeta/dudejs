import Phaser from "phaser";
import { Punto } from "../classes/Punto";

export default class Player extends Phaser.GameObjects.Sprite {
    constructor(scene, x, y, texture) {
        super(scene, x, y, texture);
        this.scene = scene;
        this.texture = texture;
        scene.add.existing(this);
        scene.physics.add.existing(this);
        this.setOrigin(0);
        this.setScale(1);
        this.animar(scene);
        this.play("frente");
        this.running = false;
        this.dr = 6;
    }

    actual() {
        return new Punto(this.x, this.y);
    }

    animar(scene) {
        scene.anims.create({
            key: "left",
            frames: scene.anims.generateFrameNumbers(this.texture, {start:0, end:3}),
            frameRate: 12,
            repeat: -1
        })

        scene.anims.create({
            key: "right",
            frames: scene.anims.generateFrameNumbers(this.texture, {start:5, end:8}),
            frameRate: 12,
            repeat: -1
        })
        scene.anims.create({
            key:"frente",
            frames: scene.anims.generateFrameNumbers(this.texture, {start:4,end:4}),
            repeat:1,
        })
    }

    parar() {
        this.running = false;
    }

    top() {
        this.y -= this.dr;
        this.play("frente");
    }

    right(){
        this.x += this.dr;
        this.play("right");
    }

    bottom() {
        this.y +=this.dr;
        this.play("frente");
    }

    left() {
        this.x -= this.dr;
        this.play("left");
    }

}