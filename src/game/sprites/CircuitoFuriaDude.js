import Circuito from "./Circuito";
import Phaser from 'phaser';
import VaivenBarra from "./VaivenBarra";
import Segmento from "./Segmento";

export default class CircuitoFuriaDude extends Circuito {
    constructor(scene, furiaDude) {
        super(scene);
        this.furiaDude = furiaDude;

        const starArray = this.createFromConfig({
            key: 'star',
            repeat: 15,
            setXY: { x: 50, y: 0, stepX: 80 }
        });
        this.addMultiple(starArray);
        scene.physics.world.enable(starArray);

        starArray.forEach(child => {
            child.body.setBounceY(Phaser.Math.FloatBetween(0.4, 0.8));
        });

        const top = new Segmento(scene, -100, 100, "platform");
        this.add(top);
        const bottom = new Segmento(scene, 0, 400, "platform");
        this.add(bottom);
        this.movible = new VaivenBarra(scene, 500, 200, "platform", 50);
        this.add(this.movible);
        scene.physics.add.collider(starArray, this);
        scene.physics.add.collider(furiaDude.player, this);
        scene.physics.add.collider(furiaDude.enemigo, this);
    }

    update() {
        this.movible.update();
        this.furiaDude.update();
    }
}