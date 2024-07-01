import Game  from "./Game";
import { scaleObject } from "../ScaleObject";

export default class CerrarSession extends Phaser.Scene {
    constructor() {
        super({
            key:"CerrarSession"
        })
    }

    preload() {
        this.load.image("play", "Play.png")
    }

    create() {
        const mainTitle: Phaser.GameObjects.Text = this.add.text(scaleObject.width as number * .5, 200, 'Reintentar de nuevo', { fontSize: '32px', color: '#000' });
        mainTitle.setOrigin(.5)

        const botonPlay: Phaser.GameObjects.Image =this.add.image(scaleObject.width as number * .5, 300, 'play')
        botonPlay.setOrigin(0.5)
        botonPlay.setScale(3)
        botonPlay.setInteractive()
        botonPlay.on('pointerdown', this.start, this)        
    }

    start() {
        const manager = this.scene.manager
        manager.sleep("CerrarSession")
        manager.add("Game", Game, true)
    }
}