import Punto from "../classes/Punto";

export default class Engranaje extends Phaser.Physics.Arcade.Sprite {
    constructor(scene: Phaser.Scene, texture:string, origen: Punto) {
        super(scene, origen.getX(), origen.getY(), texture)
        this.scene = scene
        this.setOrigin(0)        
        const world = this.scene.physics.world
        world.enableBody(this)        
        const manager: Phaser.Animations.AnimationManager = this.scene.anims
        manager.create({
            key: 'girar',
            frames: manager.generateFrameNumbers('engranaje', { start: 0, end: 7 }),
            frameRate: 30,
            repeat: -1
        });
        this.anims.play("girar", true)
        scene.add.existing(this)
    }
}