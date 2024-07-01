import Enemigo from "../components/Enemigo";
import IndicadorVida from "../components/IndicadorVida";
import { scaleObject } from "../ScaleObject";
import Punto from "../classes/Punto";
import Player from "../components/Player";
import Engranaje from "../components/Engranaje";
import EnemigoSombra from "../components/EnemigoSombra";
import Perimetro from "../components/Perimetro";
import Plataformas from "../components/Plataformas";
import Contacto from "../components/Contacto";
import LoopPlataforma from "../components/LoopPlataforma";
import AtaqueChuchillo from "../components/AtaqueCuchillo";



export default class Game extends Phaser.Scene {
    private plataformas: Phaser.Physics.Arcade.StaticGroup;
    private contacto: Contacto
    private player: Player
    private engranaje: Engranaje
    private cursors: Phaser.Types.Input.Keyboard.CursorKeys
    private stars: Phaser.Physics.Arcade.Group
    private scoreText: Phaser.GameObjects.Text
    private finalText: Phaser.GameObjects.Text
    private bombs: Phaser.Physics.Arcade.Group
    private indicadorVida: IndicadorVida
    private enemigo: Enemigo
    private enemigoSombra: EnemigoSombra
    private gameOver: boolean
    private vidas: number
    private score: number
    private movible: LoopPlataforma
    private perimetro: Perimetro
    private ataque: AtaqueChuchillo


    constructor() {
        super({
            key: 'Game'
        });
        this.gameOver = false
        this.vidas = 5
        this.score = 0
    }

    preload() {
        this.load.image('sky', 'fondo.png');
        this.load.image('ground', 'platform.png');
        this.load.image('star', 'star.png');
        this.load.image('bomb', 'bomb.png');
        this.load.spritesheet('dude', 'dude.png', { frameWidth: 32, frameHeight: 48 });
        this.load.spritesheet('engranaje', 'on38x38.png', { frameWidth: 38, frameHeight: 38 });
    }

    create(): void {
        const camera = this.cameras.main
        camera.setSize(1366, 600)
        camera.setZoom(1)
        camera.setBackgroundColor(0x000000)

        this.add.image(0, 0, 'sky').setOrigin(0)

        this.perimetro = new Perimetro(this)

        this.indicadorVida = new IndicadorVida(this, new Punto(10, 50), this.vidas)

        this.contacto = new Contacto(this)

        this.plataformas = new Plataformas(this)

        this.engranaje = new Engranaje(this, "engranaje", new Punto(250, 460))

        this.enemigo = new Enemigo(this, "dude", new Punto(1366, 450))

        this.player = new Player(this, "dude", new Punto(100, 450));

        this.ataque = new AtaqueChuchillo(this, this.enemigo, this.player)

        this.enemigoSombra = new EnemigoSombra(this, "dude", new Punto(400, 336), this.player)

        this.stars = this.physics.add.group({
            key: 'star',
            repeat: 15,
            setXY: { x: 50, y: 0, stepX: 80 }
        });

        this.movible = new LoopPlataforma(this, new Punto(650, 180), this.player, this.stars)

        this.stars.children.iterate((child: Phaser.GameObjects.GameObject) => {
            const sprite = child as Phaser.Physics.Arcade.Sprite
            sprite.setBounceY(Phaser.Math.FloatBetween(0.4, 0.8));
        });

        this.scoreText = this.add.text(16, 16, 'score: 0', { fontSize: '32px', color: '#000' });

        this.bombs = this.physics.add.group();

        this.cursors = this.input.keyboard.createCursorKeys();
        
        this.physics.add.collider(this.stars, this.perimetro);


        this.physics.add.collider(this.player, this.contacto, this.runEnemigo, undefined, this);
        this.physics.add.collider(this.bombs, this.plataformas);
        this.physics.add.collider(this.player, this.plataformas, this.setPlataformaDestino as ArcadePhysicsCallback, undefined, this);
        this.physics.add.collider(this.enemigo, this.plataformas)
        this.physics.add.collider(this.enemigoSombra, this.plataformas)
        this.physics.add.collider(this.engranaje, this.plataformas)
        this.physics.add.collider(this.stars, this.plataformas);

        this.physics.add.collider(this.player, this.ataque.getCuchillo(), this.hitBomb as ArcadePhysicsCallback, undefined, this);
        this.physics.add.collider(this.player, this.engranaje, this.hitBomb as ArcadePhysicsCallback, undefined, this);
        this.physics.add.collider(this.player, this.enemigo, this.hitBomb as ArcadePhysicsCallback, undefined, this);
        this.physics.add.collider(this.player, this.enemigoSombra, this.hitBomb as ArcadePhysicsCallback, undefined, this);
        this.physics.add.collider(this.player, this.bombs, this.hitBomb as ArcadePhysicsCallback, undefined, this);
        this.physics.add.overlap(this.player, this.stars, this.collectStar as ArcadePhysicsCallback, undefined, this);
    }

    setPlataformaDestino(_: Phaser.GameObjects.GameObject, plataforma: Phaser.GameObjects.Sprite) {
        this.enemigoSombra.setPlataformaActual(plataforma)
    }

    runEnemigo() {
        this.volando = false
        this.enemigo.setRunnig(true)
        this.enemigoSombra.setPlataformaActual(null)
    }

    collectStar(_: Phaser.GameObjects.GameObject, star: Phaser.GameObjects.GameObject): void {
        const sprite = star as Phaser.Physics.Arcade.Sprite
        sprite.disableBody(true, true);

        this.score += 10;
        this.scoreText.setText('Score: ' + this.score);
        if (this.stars.countActive() === 0) {
            //  A new batch of stars to collect
            this.stars.children.iterate((child: Phaser.GameObjects.GameObject) => {
                const sprite = child as Phaser.Physics.Arcade.Sprite
                sprite.enableBody(true, sprite.x, 0, true, true);
            });
            // tween
            const camera = this.cameras.main
            camera.alpha = 0
            const manager = this.tweens
            if (!manager.isTweening(camera)) {
                manager.add({
                    targets: camera,
                    alpha: 1,
                    ease: 'Quintic.easeInOut',
                    duration: 2000
                });
            }

            const x = (this.player.x < 400) ? Phaser.Math.Between(400, 800) : Phaser.Math.Between(0, 400);

            const bomb = this.bombs.create(x, 16, 'bomb');
            bomb.setBounce(1);
            bomb.setCollideWorldBounds(true);
            bomb.setVelocity(Phaser.Math.Between(-200, 200), 20);
            bomb.allowGravity = false;
        }
    }

    hitBomb(player: Phaser.Physics.Arcade.Sprite, object: Phaser.Physics.Arcade.Sprite) {
        this.physics.pause();
        object.disableBody();
        player.setTint(0xff0000);
        player.anims.play('turn');

        this.vidas--
        this.indicadorVida.setVidas(this.vidas)
        this.time.addEvent({
            delay: 1000,
            callback: (() => {
                this.physics.resume()
                object.enableBody(true, object.x, object.y, true, true)
                player.clearTint();
            }),
        })

        if (this.vidas === 0) {
            this.gameOver = true;
            this.physics.pause()
            this.finalText = this.add.text(scaleObject.width as number * .5, scaleObject.height as number * .5, "Game Over", { fontSize: '40px', color: '#000' })
            this.finalText.setOrigin(.5)
            this.time.addEvent({
                delay: 4000,
                callback: (() => {
                    const manager = this.scene.manager
                    manager.remove("Game")
                    manager.start("CerrarSession")
                }),
            })
        }
    }

    mainMenu(): void {
        const manager = this.scene.manager
        manager.wake("MainMenu")
    }

    update() {
        if (this.gameOver) {
            return;
        }


        this.enemigo.update()
        this.enemigoSombra.update()
        this.movible.update()
        this.ataque.update()
        

        if (this.cursors.left.isDown) {
            this.player.irIzquierda()
        } else if (this.cursors.right.isDown) {
            this.player.irDerecha()
        } else {
            this.player.parar()
        }

        if (this.cursors.up.isDown && this.player.body.touching.down) {
            this.player.saltar();
        }
        

        this.player.update()
    }
}