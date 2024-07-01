import { scaleObject } from "../ScaleObject"
import { AnimationName } from "../classes/AnimationName"
import Punto from "../classes/Punto"

export default class Enemigo extends Phaser.Physics.Arcade.Sprite implements HabilidadMovimiento {
    private animacion: string = AnimationName.LEFT
    private dx: number
    private textura: string
    private running: boolean
    private origen: Punto

    constructor(scene: Phaser.Scene, texture: string, origen: Punto) {
        super(scene, origen.getX(), origen.getY(), texture)
        this.scene = scene
        this.textura = texture
        this.origen = origen
        this.dx = -160
        this.running = false
        scene.add.existing(this)
        const world = this.scene.physics.world
        world.enableBody(this)
        this.setOrigin(0)
        this.setTint(0xff0000)
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

        this.play("turn", true)
    }

    getdx() {
        return this.dx
    }

    isIzquierda() {
        return this.dx < 0
    }

    isDerecha() {
        return this.dx > 0
    }

    isRunning() {
        return this.running
    }

    getOrigen() {
        return this.origen
    }

    getPosicion() {
        return new Punto(this.x, this.y)
    }

    parar(): void {
        this.dx = 0
        this.animacion = AnimationName.TURN
    }

    irIzquierda(): void {
        this.dx = -160
        this.animacion = AnimationName.LEFT
    }

    irDerecha(): void {
        this.dx = 160
        this.animacion = AnimationName.RIGHT
    }

    saltar(): void {
        throw new Error("Method not implemented.")
    }

    setRunnig(running: boolean) {
        this.running = running
    }

    update(): void {
        if (!this.running) {
            return
        }

        if (this.x === 0) {
            this.irDerecha()
        } else if (this.x === scaleObject.width as number - 32) {
            this.irIzquierda()
        }

        this.setVelocityX(this.dx)
        this.play(this.animacion, true)
    }

}