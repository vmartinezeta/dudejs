import Phaser from "phaser";
import Segmento from "./Segmento";

export default class VaivenBarra extends Segmento {
    constructor(scene, x, y, texture, oscilacion) {
        super(scene, x, y, texture);
        this.limiteInferior = x-oscilacion;
        this.limiteSuperior = x+oscilacion;
        this.dx = 3;
    }

    update() {
        if (this.x > this.limiteSuperior || this.x < this.limiteInferior) {
            this.dx = -1 * this.dx;
        }
        this.x += this.dx;
    }
}