import Punto from "../classes/Punto"

export default class PlataformaMovible extends Phaser.Physics.Arcade.Sprite {
    private dx: number
    private origen: Punto

    constructor(scene: Phaser.Scene, texture: string, origen: Punto) {
        super(scene, origen.getX(), origen.getY(), texture)
        this.scene = scene
        this.origen = origen
        this.dx = 160
        const world = this.scene.physics.world
        world.enableBody(this)
        this.setImmovable(true)
        this.body.allowGravity = false
        this.setBodySize(400, 32, true)
        this.setOrigin(0)
        scene.add.existing(this)
    }

    getOrigen() {
        return this.origen
    }

    isIzquierda() {
        return this.dx < 0
    }

    isDerecha() {
        return this.dx > 0
    }

    irIzquierda(): void {
        this.dx = -160
    }

    irDerecha(): void {
        this.dx = 160
    }

    update(): void {
        this.setVelocityX(this.dx)
    }

}