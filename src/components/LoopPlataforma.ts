import Punto from "../classes/Punto";
import DobleContacto from "./DobleContacto";
import PlataformaMovible from "./PlataformaMovible";
import Player from "./Player";


export default class LoopPlataforma extends Phaser.Physics.Arcade.StaticGroup {
    private plataforma: PlataformaMovible
    private debeGirar: boolean 
    private giroPrevio: boolean


    constructor(scene:Phaser.Scene, origen:Punto, player:Player, stars:Phaser.Physics.Arcade.Group) {
        super(scene.physics.world, scene)
        this.scene = scene
        this.debeGirar = true
        this.giroPrevio = false
        this.plataforma = new PlataformaMovible(scene, "ground", origen)
        origen.setX(origen.getX() - 40)
        const contactos = new DobleContacto(scene, origen, 700)

        scene.physics.add.collider(this.plataforma, contactos, this.loop, undefined, this)
        scene.physics.add.collider(player, this.plataforma)
        scene.physics.add.collider(this.plataforma, stars);
    }

    loop() {
        if (this.debeGirar !== this.giroPrevio) {
            this.giroPrevio = this.debeGirar
            if (this.plataforma.isDerecha()) {
                this.plataforma.irIzquierda()
            } else if (this.plataforma.isIzquierda()) {
                this.plataforma.irDerecha()
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

    update() {
        this.plataforma.update()
    }

}