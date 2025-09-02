import { EventBus } from '../EventBus';
import { Scene } from 'phaser';
import Player from '../sprites/Player';
import EnemigoSombra from '../sprites/EnemigoSombra';
import Cuchillo from '../sprites/Cuchillo';
import FuriaDude from '../sprites/FuriaDude';
import CircuitoFuriaDude from '../sprites/CircuitoFuriaDude';


export class Game extends Scene {
    constructor() {
        super('Game');
        this.player = null;
        this.enemigo = null;
        this.furiaDude = null;
        this.cuchillo = null;
        this.circuito = null;
    }

    create() {
        this.physics.world.setBounds(0, 0, 1024, 600);
        const y = this.game.config.height;
        this.player = new Player(this, 100, 300, "dude");
        this.enemigo = new EnemigoSombra(this, 100, y - 90, "dude");
        this.cuchillo = new Cuchillo(this, this.enemigo.x, this.enemigo.y, "platform");
        this.furiaDude = new FuriaDude(this, this.player, this.enemigo, this.cuchillo);
        this.circuito = new CircuitoFuriaDude(this, this.furiaDude);

        this.input.mouse.disableContextMenu();
        this.keyboard = this.input.keyboard.createCursorKeys();
        this.keys = this.input.keyboard.addKeys({
            A: Phaser.Input.Keyboard.KeyCodes.A,
            W: Phaser.Input.Keyboard.KeyCodes.W,
            S: Phaser.Input.Keyboard.KeyCodes.S,
            D: Phaser.Input.Keyboard.KeyCodes.D
        });
        EventBus.emit('current-scene-ready', this);
    }

    changeScene() {
        this.scene.start("MainMenu");
    }

    update() {
        this.circuito.update();

        if (this.keyboard.right.isDown) {
            this.player.right();
        } else if (this.keyboard.left.isDown) {
            this.player.left();
        }

        if (this.keyboard.up.isDown && this.player.body.touching.down && this.player.saltos === 0) {
            this.player.top();
        } else if (this.keys.D.isDown && this.player.puedeHacerDoubleSalto()) {
            this.player.top(50);
        } else if (this.player.finalizoSaltos()){
            this.player.resetSaltos();
        }
    }
}