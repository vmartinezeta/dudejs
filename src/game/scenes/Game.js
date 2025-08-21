import { EventBus } from '../EventBus';
import { Scene } from 'phaser';
import Player from '../sprites/Player';
import Homicidio from '../sprites/Homicidio';
import EnemigoSombra from '../sprites/EnemigoSombra';
import Cuchillo from '../sprites/Cuchillo';
import Circuito from '../sprites/Circuito';


export class Game extends Scene {
    constructor() {
        super('Game');
        this.player = null;
        this.enemigo = null;
        this.homicidio = null;
        this.cuchillo = null;
        this.circuito = null;
    }

    create() {
        this.physics.world.setBounds(0, 0, 1024, 600);

        this.circuito = new Circuito(this);
        const y = this.game.config.height

        this.player = new Player(this, 100, y-90, "dude");
        this.enemigo = new EnemigoSombra(this, 50, y-90, "dude");
        this.cuchillo = new Cuchillo(this, this.enemigo.x, this.enemigo.y, "platform");
        this.homicidio = new Homicidio(this, [this.player, this.enemigo, this.cuchillo]);

        this.physics.add.collider(this.player, this.circuito);
        this.physics.add.collider(this.enemigo, this.circuito);

        this.input.mouse.disableContextMenu();
        this.keyboard = this.input.keyboard.createCursorKeys();
        EventBus.emit('current-scene-ready', this);
    }

    changeScene() {
        this.scene.start("MainMenu");
    }

    update() {
        this.homicidio.update();     

        if (this.keyboard.right.isDown){
            this.player.right();
        } else if (this.keyboard.left.isDown) {
            this.player.left();
        }

        if (this.keyboard.up.isDown && this.player.body.touching.down) {
            this.player.top();
        }
    }
}