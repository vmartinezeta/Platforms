import Phaser from 'phaser'
import Game from './scenes/Game'
import { scaleObject } from './ScaleObject';
import CerrarSession from './scenes/CerrarSession';


const config: Phaser.Types.Core.GameConfig = {
    type: Phaser.AUTO,
    width: 800,
    height: 600,
    physics: {
        default: 'arcade',
        arcade: {
            gravity: { y: 300 },
            debug: false
        }
    },
    scale: scaleObject,
    loader: {
        baseURL: 'assets'
    },
    backgroundColor: "#eee",
    scene: [Game, CerrarSession]
};


new Phaser.Game(config);