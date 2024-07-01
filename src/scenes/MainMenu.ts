import { scaleObject } from "../ScaleObject";

export default class MainMenu extends Phaser.Scene {

    constructor() {
        super({
            key: "MainMenu"
        })
    }

    preload() {
        this.load.image('play', 'Play.png');
    }

    create() {
        const mainTitle = this.add.text(scaleObject.width as number * .5, 200, 'Menu principal', { fontSize: '32px', color: '#000' });
        mainTitle.setAlign("center")
        mainTitle.setOrigin(.5)

        const botonPlay = this.add.image(scaleObject.width as number * .5, 300, 'play')
        botonPlay.setOrigin(0.5)
        botonPlay.setScale(3)
        botonPlay.setInteractive()
        botonPlay.on('pointerdown', this.start, this)
    }

    start() {
        const manager = this.scene.manager
        manager.sleep("MainMenu")
        manager.start("Game")
    }

}