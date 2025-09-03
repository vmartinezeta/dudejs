import Phaser from "phaser";
import Roca from "./Roca";

export default class FuriaDude extends Phaser.GameObjects.Group {
    constructor(scene, player, enemigo, cuchillo) {
        super(scene);
        this.scene = scene;
        this.player = player;
        this.enemigo = enemigo;
        this.cuchillo = cuchillo;
        this.addMultiple([player, enemigo, cuchillo]);
        this.cuchillo.oscilar(this.enemigo.x - 100, this.enemigo.x + 100);
        this.cuchillo.y = this.enemigo.y + this.enemigo.height / 2;
        this.cuchillo.x = this.enemigo.x;
        this.deltaX0 = this.getSeparacion();
        this.deltaX = this.deltaX0;
        this.lanzandoRoca = null;
        this.roca = null;
    }

    empezarLanzamiento() {
        if (!this.lanzandoRoca) {
            this.lanzandoRoca = this.scene.time.delayedCall(1000, this.lanzarRoca, [], this);
        }
    }

    eliminar(child) {
        this.remove(child, true, true);
    }

    fueraAlcance() {
        return !this.cuchillo.visible && (this.player.control.right() && this.player.x > this.enemigo.x
        || this.player.control.left() && this.player.x < this.enemigo.x);
    }

    lanzarRoca() {
        if (this.roca) return;
        this.roca = new Roca(this.scene, this.enemigo.x, this.enemigo.y+20, "roca", this.enemigo.control.vector);
        this.add(this.roca);
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
            this.enemigo.callback = this.player.right;
        } else if (this.estaAlejando() && this.player.control.left()) {
            this.enemigo.callback = this.player.left;
        }
        this.enemigo.callback();
    }

    update() {
        if (!this.player) return;
        
        if (this.lanzandoRoca&&!this.player.body.touching.down) {
            this.scene.time.removeEvent(this.lanzandoRoca);
            this.lanzandoRoca = null;
        }
        if (this.roca) {
            this.roca.update();
        }
        
        this.enemigo.update();
        this.actualizarSeparacion();

        this.acuchillar();

        if (!this.cuchillo.visible && !this.enemigo.running) {
            this.enemigo.running = true;
            this.enemigo.body.setEnable(true);
        }

        if (!this.cuchillo.visible) {
            return;
        }

        this.seguirPlayer();

        if (this.enemigo.running) {
            this.enemigo.parar();
            this.cuchillo.x = this.enemigo.x;
            this.cuchillo.y = this.enemigo.y + this.enemigo.height / 2;
            this.cuchillo.oscilar(this.enemigo.x - 100, this.enemigo.x + 100);
        }

        this.cuchillo.update();
    }
}