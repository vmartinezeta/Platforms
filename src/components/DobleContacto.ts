import Punto from "../classes/Punto"

export default class DobleContacto extends Phaser.Physics.Arcade.StaticGroup {
    constructor(scene:Phaser.Scene, origen:Punto, separacion:number, visible?:boolean) {
        super(scene.physics.world, scene)
        const fillAlpha = visible ? 1 : 0
        const izquierdo = scene.add.rectangle(origen.getX(), origen.getY(), 1, 32, 0xffffff, fillAlpha)
        izquierdo.setOrigin(0)
        this.add(izquierdo)

        const derecho = scene.add.rectangle(origen.getX() + separacion, origen.getY(), 1, 32, 0xffffff, fillAlpha)
        derecho.setOrigin(1, 0)
        this.add(derecho)
    }

}