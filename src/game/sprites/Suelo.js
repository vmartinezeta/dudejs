import Segmento from "./Segmento";

export default class Suelo extends Segmento {
    constructor(scene, x, y, texture) {
        super(scene, x, y, texture, 0, 2.5);
    }
}