import { Punto } from "../classes/Punto";
import { ControlDireccional } from "../classes/ControlDireccional";
import { Direccional } from "../classes/Direccional";
import Phaser from "phaser";

export default class Player extends Phaser.GameObjects.Sprite {
    constructor(scene, x, y, texture) {
        super(scene, x, y, texture);
        this.scene = scene;
        this.texture = texture;
        scene.add.existing(this);
        scene.physics.add.existing(this);
        this.body.setCollideWorldBounds(true);
        this.setOrigin(0);
        this.setScale(1);
        this.animar(scene);
        this.play("right");
        this.running = false;
        this.control = new ControlDireccional([
            new Direccional(1, "top", new Punto(0, -1)),
            new Direccional(2, "right", new Punto(1, 0)),
            new Direccional(3, "bottom", new Punto(0, 1)),
            new Direccional(4, "left", new Punto(-1, 0)),
        ], new Punto(1, 0));
        this.cambio = 100;
    }

    actual() {
        return new Punto(this.x, this.y);
    }

    animar(scene) {
        scene.anims.create({
            key: "left",
            frames: scene.anims.generateFrameNumbers(this.texture, { start: 0, end: 3 }),
            frameRate: 12,
            repeat: -1
        })

        scene.anims.create({
            key: "right",
            frames: scene.anims.generateFrameNumbers(this.texture, { start: 5, end: 8 }),
            frameRate: 12,
            repeat: -1
        })
        scene.anims.create({
            key: "frente",
            frames: scene.anims.generateFrameNumbers(this.texture, { start: 4, end: 4 }),
            repeat: 1,
        })
    }

    parar() {
        this.running = false;
        this.control.setVector(new Punto(0));
    }

    mover(vector, cambio) {
        const modulo = cambio || this.cambio;
        this.body.setVelocity(modulo * vector.x, modulo * vector.y);
    }

    top() {
        const vector = this.control.fromInt(1);
        this.mover(vector, 330);
        this.play("frente");
    }

    right() {
        const vector = this.control.fromInt(2);
        this.mover(vector);
        this.play("right");
    }

    bottom() {
        const vector = this.control.fromInt(3);
        this.mover(vector);
        this.play("frente");
    }

    left() {
        const vector = this.control.fromInt(4);
        this.mover(vector);
        this.play("left");
    }

}