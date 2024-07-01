import { scaleObject } from "../ScaleObject";

export default class Plataformas extends Phaser.Physics.Arcade.StaticGroup {
    constructor(scene:Phaser.Scene) {
        super(scene.physics.world, scene)
        this.create(scaleObject.width as number * .5, 568, 'ground').setScale(4).refreshBody();
        this.create(600, 400, 'ground');
        this.create(200, 250, 'ground');
    }
}