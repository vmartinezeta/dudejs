import { EventBus } from '../EventBus';
import { Scene } from 'phaser';
import Player from '../sprites/Player';
import Homicidio from '../sprites/Homicidio';
import EnemigoSombra from '../sprites/EnemigoSombra';
import Cuchillo from '../sprites/Cuchillo';


export class Game extends Scene {
    constructor() {
        super('Game');
        this.player = null;
        this.enemigo = null;
        this.homicidio = null;
        this.cuchillo = null;
    }

    create() {
        this.physics.world.setBounds(0, 0, 1024, 600);

        this.player = new Player(this, 100, 200, "dude");
        this.enemigo = new EnemigoSombra(this, 50, 50, "dude");
        this.cuchillo = new Cuchillo(this, this.enemigo.x, this.enemigo.y, "platform");
        this.homicidio = new Homicidio(this, [this.player, this.enemigo, this.cuchillo]);

        this.physics.add.collider(this.cuchillo, this.player, this.acuchillando, null, this);

        this.input.mouse.disableContextMenu();
        this.keyboard = this.input.keyboard.createCursorKeys();
        EventBus.emit('current-scene-ready', this);
    }

    acuchillando(cuchillo, enemigo) {
        // console.log(cuchillo, enemigo);
    }

    changeScene() {
        this.scene.start("MainMenu");
    }

    update() {
        this.homicidio.update();

        if (this.keyboard.up.isDown) {
            this.player.top();
        } else if (this.keyboard.right.isDown){
            this.player.right();
        } else if (this.keyboard.down.isDown) {
            this.player.bottom();
        } else if (this.keyboard.left.isDown) {
            this.player.left();
        }
    }
}