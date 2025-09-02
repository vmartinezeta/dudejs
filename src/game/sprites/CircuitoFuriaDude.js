import Circuito from "./Circuito";
import Phaser from 'phaser';
import VaivenBarra from "./VaivenBarra";
import Segmento from "./Segmento";
import Suelo from "./Suelo";
import Roca from "./Roca";

export default class CircuitoFuriaDude extends Circuito {
    constructor(scene, furiaDude) {
        super(scene);
        this.scene = scene;
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

        scene.physics.add.collider(furiaDude.player, starArray, this.recoger, null, this);
        scene.physics.add.collider(starArray, this);
        scene.physics.add.collider(furiaDude.player, this, this.lanzarRoca, null, this);
        scene.physics.add.collider(furiaDude.enemigo, this);
        scene.physics.add.collider(furiaDude, this, this.destruirRoca, null, this);
    }

    destruirRoca(roca) {
        if (roca instanceof Roca) {
            this.furiaDude.eliminar(roca);
        }
    }

    lanzarRoca(_, segmento) {
        if (segmento instanceof Suelo && !this.furiaDude.lanzandoRoca && this.furiaDude.fueraAlcance()) {
            this.furiaDude.empezarLanzamiento();
        }
    }

    recoger(_, start) {
        this.remove(start, true, true);
    }

    update() {
        this.movible.update();
        this.furiaDude.update();       
    }
}