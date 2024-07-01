import Punto from "../classes/Punto"

export default class IndicadorVida extends Phaser.GameObjects.Graphics {
    private vidas: number
    private origen:Punto

    constructor(scene:Phaser.Scene, origen:Punto, vidas: number) {
        super(scene)
        this.scene = scene
        this.vidas = vidas
        this.origen = origen

        const rect = scene.add.rectangle(this.origen.getX() , this.origen.getY()-1, 20*vidas, 22, 0xffffffff)
        rect.setStrokeStyle(2, 0x000000)
        rect.setOrigin(0)

        this.draw()
        scene.add.existing(this)
    }

    setVidas(vidas:number) {
        if (this.vidas !== vidas && vidas>=0) {
            this.vidas = vidas
            this.clear()
            this.draw()
        }
    }

    draw() {
        this.fillStyle(0x00ff00, 1);
        this.fillRect(this.origen.getX(), this.origen.getY(), 20*this.vidas, 20)
        this.stroke()
    }

}