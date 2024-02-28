import { Scene } from 'phaser';

export class Preloader extends Scene
{
    constructor ()
    {
        super('Preloader');
    }

    preload ()
    {
        //  Load the assets for the game - Replace with your own assets
        this.load.setPath('assets');

        // Load the tileset
        this.load.image('dungeon_tiles', 'tiles/Dungeon_Tileset.png');
        this.load.image('character_tiles', 'tiles/Dungeon_Character.png');
        this.load.tilemapTiledJSON('base-map', 'tiles/maps-01.json');

        this.load.image('player', 'player/player.png');
        this.load.image('skeleton', 'enemies/skeleton.png');

        this.load.atlas('player-idle', 'player/player-idle-anims.png','player/player-idle-anims.json');
    }

    create ()
    {
        //  When all the assets have loaded, it's often worth creating global objects here that the rest of the game can use.
        //  For example, you can define global animations here, so we can use them in other scenes.

        //  Move to the MainMenu. You could also swap this for a Scene Transition, such as a camera fade.
        this.scene.start('Game');
    }
}
