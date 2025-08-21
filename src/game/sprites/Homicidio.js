import Phaser from "phaser";

export default class Homicidio extends Phaser.GameObjects.Group {
    constructor(scene, children) {
        super(scene, children);
        this.player = children[0];
        this.enemigo = children[1];
        this.cuchillo = children[2];
        this.cuchillo.setIntervalo(this.enemigo.x - 100, this.enemigo.x + 100);
        this.cuchillo.y = this.enemigo.y + this.enemigo.height / 2;
        this.cuchillo.x = this.enemigo.x;
        this.deltaX0 = this.getSeparacion();
        this.deltaX = this.deltaX0;
    }

    acuchillar() {
        if (this.puedeAcuchillar()) {
            this.cuchillo.visible = true;
        } else {
            this.cuchillo.visible = false;
        }
    }

    getSeparacion() {
        return Phaser.Math.Distance.BetweenPoints(this.player.actual(), this.enemigo.actual());
    }

    puedeAcuchillar() {
        return this.getSeparacion() < 100 && this.player.body.touching.down;
    }

    estanEncontra2() {
        return (this.player.control.vector.x + this.enemigo.control.vector.x ===0)
            && (this.player.control.vector.y + this.enemigo.control.vector.y === 0);
    }

    estaAlejando() {
        return this.estanEncontra2() && this.deltaX > this.deltaX0;
    }

    actualizarSeparacion() {
        this.deltaX0 = this.deltaX;
        this.deltaX = this.getSeparacion();
    }

    seguirPlayer() {
        if (this.estaAlejando() && this.player.control.right()) {
            this.enemigo.callback = this.player.right
        } else if (this.estaAlejando() && this.player.control.left()) {
            this.enemigo.callback = this.player.left;
        }
        this.enemigo.callback();
    }

    update() {
        this.enemigo.update();
        this.actualizarSeparacion();

        this.acuchillar();

        if (!this.cuchillo.visible && !this.enemigo.running) {
            this.enemigo.running = true;
        }

        if (!this.cuchillo.visible) {
            return;
        }

        this.seguirPlayer();

        if (this.enemigo.running) {
            this.enemigo.parar();
            this.cuchillo.x = this.enemigo.x;
            this.cuchillo.y = this.enemigo.y + this.enemigo.height / 2;
            this.cuchillo.setIntervalo(this.enemigo.x - 100, this.enemigo.x + 100);
        }

        this.cuchillo.update();
    }
}