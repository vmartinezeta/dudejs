import Phaser from "phaser";

export default class Homicidio extends Phaser.GameObjects.Group {
    constructor(scene, children) {
        super(scene, children);
        this.player = children[0];
        this.enemigo = children[1];
        this.cuchillo = children[2];
        this.cuchillo.visible = true;
        this.cuchillo.setIntervalo(this.enemigo.x - 100, this.enemigo.x + 100);
        this.cuchillo.y = this.enemigo.y + this.enemigo.height / 2;
        this.cuchillo.x = this.enemigo.x;
    }

    acuchillar() {
        this.cuchillo.visible = true;
    }

    puedeAcuchillar() {
        return Phaser.Math.Distance.BetweenPoints(this.player.actual(), this.enemigo.actual()) < 100;
    }

    update() {
        this.enemigo.update();
        if (this.puedeAcuchillar()) {
            this.cuchillo.visible = true;
        } else {
            this.cuchillo.visible = false;
        }

        if (!this.cuchillo.visible) {
            this.enemigo.running = true;
            return
        };
        this.enemigo.parar();
        this.cuchillo.update();
    }
}