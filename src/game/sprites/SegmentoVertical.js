import Segmento from "./Segmento";

export default class SegmentoVertical extends Segmento {
    constructor(scene, x, y, texture, origin, scale) {
        super(scene, x, y, texture, origin, scale);
        this.setAngle(90);
        this.body.setSize(this.height, this.width);
    }
}