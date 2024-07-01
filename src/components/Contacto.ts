export default class Contacto extends Phaser.Physics.Arcade.StaticGroup {
    constructor(scene: Phaser.Scene) {
        super(scene.physics.world, scene)
        const abajo = scene.add.rectangle(100, 505, 1200, 32, 0xffffff, 1)
        abajo.setOrigin(0)
        this.add(abajo)
    }
}