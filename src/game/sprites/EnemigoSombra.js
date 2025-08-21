import Player from "./Player";

export default class EnemigoSombra extends Player {
    constructor(scene, x, y, texture) {
        super(scene,x , y, texture);
        this.setTint(0xff0000);
        this.limiteInferior = 10;
        this.limiteSuperior = 800;
        this.cambio = 60;
        this.running = true;
        this.callback = this.right;
    }


    update() {
        if (!this.running) return;
        if (this.x > this.limiteSuperior) {
            this.callback = this.left;
        } else if (this.x < this.limiteInferior) {
            this.callback = this.right;
        }
        this.callback();
    }
}