import Cuchillo from "./Cuchillo"
import Enemigo from "./Enemigo"
import Player from "./Player"

const SEPARACION_PLAYER_ENEMIGO = 200

export default class AtaqueCuchillo extends Phaser.Physics.Arcade.StaticGroup {
    private cuchillo: Cuchillo
    private enemigo: Enemigo
    private player: Player

    constructor(scene: Phaser.Scene, enemigo: Enemigo, player: Player) {
        super(scene.physics.world, scene)
        this.scene = scene
        this.enemigo = enemigo
        this.player = player
        const origen = enemigo.getOrigen()
        this.cuchillo = new Cuchillo(scene, "ground", origen)
        this.cuchillo.ocultar()
    }

    getCuchillo() {
        return this.cuchillo
    }

    acuchillar() {
        const origen = this.enemigo.getPosicion()
        origen.setY(origen.getY() + this.enemigo.height / 2)
        this.cuchillo.mover(origen)
    }

    estaAlmismoNivel = () => {
        return this.enemigo.y === this.player.y
    }

    estaAcercandose = () => {
        return this.enemigo.isIzquierda() && this.player.isDerecha()
            && this.enemigo.x > this.player.x
            || this.enemigo.isDerecha() && this.player.isIzquierda()
            && this.enemigo.x < this.player.x
    }

    estaEnfrente = () => {
        return this.estaAcercandose() && this.estaAlmismoNivel()
    }

    deltaX = () => {
        const xplayer = this.player.x
        const xenemigo = this.enemigo.x
        const delta = xenemigo - xplayer
        return Math.abs(delta)
    }

    esconderCuchillo() {
        this.cuchillo.ocultar()
    }

    estaCerca = () => {
        return this.deltaX() < SEPARACION_PLAYER_ENEMIGO
    }

    update(): void {
        if (!this.enemigo.isRunning()) return

        if (this.estaEnfrente() && this.estaCerca()) {
            this.acuchillar()
        } else {
            this.cuchillo.ocultar()
        }
    }
}