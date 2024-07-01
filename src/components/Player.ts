import { AnimationName } from "../classes/AnimationName";
import Punto from "../classes/Punto";

export default class Player extends Phaser.Physics.Arcade.Sprite implements HabilidadMovimiento {
    private textura: string
    private animacion: string = AnimationName.TURN
    private dx: number

    constructor(scene: Phaser.Scene, textura: string, origen: Punto) {
        super(scene, origen.getX(), origen.getY(), textura)
        this.textura = textura
        this.scene = scene
        this.dx = 0
        this.scene.add.existing(this) 
        const world: Phaser.Physics.Arcade.World = this.scene.physics.world
        world.enableBody(this)
        this.setOrigin(0)
        this.setBounce(0.2)
        this.setCollideWorldBounds(true)

        const manager: Phaser.Animations.AnimationManager = this.scene.anims
        manager.create({
            key: 'left',
            frames: manager.generateFrameNumbers(this.textura, { start: 0, end: 3 }),
            frameRate: 10,
            repeat: -1
        });

        manager.create({
            key: 'turn',
            frames: [{ key: this.textura, frame: 4 }],
            frameRate: 20
        });

        manager.create({
            key: 'right',
            frames: manager.generateFrameNumbers(this.textura, { start: 5, end: 8 }),
            frameRate: 10,
            repeat: -1
        });
    }

    isIzquierda() {
        return this.dx < 0
    }

    isDerecha() {
        return this.dx > 0
    }

    irIzquierda() {
        this.dx = -160;
        this.animacion = AnimationName.LEFT
    }

    irDerecha() {
        this.dx = 160
        this.animacion = AnimationName.RIGHT
    }

    parar() {
        this.dx = 0;
        this.animacion = AnimationName.TURN
    }

    saltar() {
        this.dx = -330;
        this.animacion = AnimationName.TURN
    }

    update(): void {
        if (this.animacion === AnimationName.TURN && this.dx !== 0) {
            this.setVelocityY(this.dx)
        } else {
            this.setVelocityX(this.dx)
        }
        this.play(this.animacion, true)
    }
}