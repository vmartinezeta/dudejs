import { Punto } from "../classes/Punto";
import { ControlDireccional } from "../classes/ControlDireccional";
import { Direccional } from "../classes/Direccional";
import Phaser from "phaser";

export default class Player extends Phaser.GameObjects.Sprite {
    constructor(scene, x, y, texture) {
        super(scene, x, y, texture);
        this.scene = scene;
        this.texture = texture;
        this.setOrigin(0);
        this.setScale(1);
        this.animar(scene);
        this.play("right");
        this.running = false;
        this.modulo = 100;
        this.saltos = 0;
        this.vida = 10;
        this.anterior = new Punto(x, y);
        this.control = new ControlDireccional([
            new Direccional(1, "top", new Punto(0, -1)),
            new Direccional(2, "right", new Punto(1, 0)),
            new Direccional(3, "bottom", new Punto(0, 1)),
            new Direccional(4, "left", new Punto(-1, 0)),
        ], new Punto(1, 0));
        scene.add.existing(this);
        scene.physics.add.existing(this);
        this.body.setCollideWorldBounds(true);
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
        this.body.setVelocity(0);
        this.body.setEnable(false);
    }

    mover(vector, modulo) {
        const moduloFinal = modulo || this.modulo;
        this.body.setVelocity(moduloFinal * vector.x, moduloFinal * vector.y);
    }

    top(modulo) {
        if (!this.body) return;
        const vector = this.control.fromInt(1);
        const moduloFinal = 330 || modulo;
        this.mover(vector, moduloFinal);
        this.play("frente");
    }

    right() {
        if (!this.body) return;
        const vector = this.control.fromInt(2);
        this.mover(vector);
        this.play("right");
    }

    bottom() {
        if (!this.body) return;
        const vector = this.control.fromInt(3);
        this.mover(vector);
        this.play("frente");
    }

    left() {
        if (!this.body) return;
        const vector = this.control.fromInt(4);
        this.mover(vector);
        this.play("left");
    }

    actual() {
        return new Punto(this.x, this.y);
    }

    puedeSaltar() {
        return this.body && this.body.touching.down && this.saltos === 0;
    }

    puedeHacerDoubleSalto() {
        return this.saltos===1 && this.body && this.body.touching.none;
    }

    tieneSaltos() {
        return this.saltos === 2 || (this.body && this.body.touching.down);
    }

    inhabilitarSaltos() {
        this.saltos = 0;
    }

    habilitarDoubleSalto() {
        this.saltos ++;
    }

}