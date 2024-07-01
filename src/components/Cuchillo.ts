import Punto from "../classes/Punto"

const LARGO_CUCHILLO = 200

export default class Cuchillo extends Phaser.Physics.Arcade.Sprite {

    constructor(scene: Phaser.Scene, texture: string, origen: Punto) {
        super(scene, origen.getX(), origen.getY(), texture)

        this.scene = scene
        const world = this.scene.physics.world
        world.enableBody(this)
        this.setOrigin(0.5)
        this.setTint(0xff0000)
        this.body.allowGravity = false
        this.setImmovable(true)
        this.setScale(.2)
        scene.add.existing(this)
    }

    mover(origen: Punto) {
        this.displayWidth = LARGO_CUCHILLO
        this.enableBody(true, origen.getX(), origen.getY(), true, true)
    }

    ocultar() {
        this.displayWidth = 0
        this.disableBody()
    }

}