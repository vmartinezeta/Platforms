import { scaleObject } from "../ScaleObject"

export default class Perimetro extends Phaser.Physics.Arcade.StaticGroup {
    constructor(scene:Phaser.Scene) {
        super(scene.physics.world, scene)

        const izquierdo = scene.add.rectangle(0, 0, 10, scaleObject.height as number, 0xffffff, 0)
        izquierdo.setOrigin(0)
        this.add(izquierdo)

        const arriba = scene.add.rectangle(0, 0, scaleObject.width as number, 10, 0xffffff, 0)
        arriba.setOrigin(0)
        this.add(arriba)

        const derecho = scene.add.rectangle(scaleObject.width as number, 0, 10, scaleObject.height as number, 0xffffff, 0)
        derecho.setOrigin(1, 0)
        this.add(derecho)        
    }

}