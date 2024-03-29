// import { Boot } from './scenes/Boot';
import { Game as MainGame } from './scenes/Game';
// import { GameOver } from './scenes/GameOver';
// import { MainMenu } from './scenes/MainMenu';
import { Preloader } from './scenes/Preloader';

import { Game, Types } from "phaser";

//  Find out more information about the Game Config at:
//  https://newdocs.phaser.io/docs/3.70.0/Phaser.Types.Core.GameConfig
const config: Types.Core.GameConfig = {
    type: Phaser.AUTO,
    width: 400,
    height: 250,
    parent: 'game-container',
    // backgroundColor: '#028af8',
    physics: {
        default: 'arcade',
        arcade: {
            // @ts-ignore
            gravity: { y: 0 },
            debug: true
        },
    },
    scale: {
        // mode: Phaser.Scale.FIT,
        autoCenter: Phaser.Scale.CENTER_BOTH,
        zoom: 2
    },
    scene: [
        Preloader,
        MainGame
    ]
};

export default new Game(config);
