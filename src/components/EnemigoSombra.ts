import { AnimationName } from "../classes/AnimationName"
import Punto from "../classes/Punto"
import Contactos from "./DobleContacto"
import Player from "./Player"


export default class EnemigoSombra extends Phaser.Physics.Arcade.Sprite implements HabilidadMovimiento {
    private textura: string
    private actual: Phaser.GameObjects.Sprite | null
    private player: Player
    private animacion: string = AnimationName.LEFT
    private dx: number
    private debeGirar: boolean
    private giroPrevio: boolean

    constructor(scene: Phaser.Scene, textura: string, origen: Punto, player: Player) {
        super(scene, origen.getX(), origen.getY(), textura)
        this.scene = scene
        this.textura = textura
        this.player = player
        this.actual = null
        this.dx = -160
        this.debeGirar = true
        this.giroPrevio = false
        this.setTint(0x444444)
        this.scene.add.existing(this)

        const contactos = new Contactos(scene, origen, 400)
        const world = this.scene.physics.world
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

        scene.physics.add.collider(this, contactos, this.loop, undefined, this);
    }

    loop() {
        if (this.debeGirar !== this.giroPrevio) {
            this.giroPrevio = this.debeGirar
            if (this.isDerecha()) {
                this.irIzquierda()
            } else {
                this.irDerecha()
            }
            this.scene.time.addEvent({
                delay: 200,
                callback: (() => {
                    this.debeGirar = true
                    this.giroPrevio = false
                }),
            })
        }
    }

    isDerecha() {
        return this.dx > 0
    }

    getLado(): any {
        if (this.actual === null) {
            return {
                izquierda: false,
                derecha: false
            };
        }
        const enmedio = this.actual.x - 32 / 2
        const izquierda = this.player.x < enmedio
        const derecha = this.player.x > enmedio
        return {
            izquierda,
            derecha
        }
    }

    setPlataformaActual(plataforma: Phaser.GameObjects.Sprite | null) {
        if (plataforma === null || plataforma.y !== this.player.y + 2 * 32) {
            this.actual = null
            return
        }
        this.actual = plataforma
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
        this.setVelocityX(this.dx)
        this.play(this.animacion, true)
    }

}