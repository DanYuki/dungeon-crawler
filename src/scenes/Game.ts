import { Scene } from 'phaser';
import Skeleton from '../enemies/Skeleton';

export class Game extends Scene
{
    camera: Phaser.Cameras.Scene2D.Camera;
    background: Phaser.GameObjects.Image;
    msg_text : Phaser.GameObjects.Text;
    player: Phaser.Physics.Arcade.Sprite;
    cursors: Phaser.Types.Input.Keyboard.CursorKeys;
    skeletons : Phaser.Physics.Arcade.Group;

    constructor ()
    {
        super('Game');
    }

    create ()
    {
        // this.add.image(0, 0, 'tiles');
        const map = this.make.tilemap({
            key: 'base-map',
            tileHeight: 16,
            tileWidth: 16,
        });
        const dungeonTileset = map.addTilesetImage('Dungeon_Tileset', 'dungeon_tiles');
        map.addTilesetImage('Dungeon_Character', 'character_tiles');

        // Layers
        map.createLayer('Ground', dungeonTileset!);
        const wallsLayer = map.createLayer('Wall', dungeonTileset!);
        wallsLayer!.setCollisionByProperty({ collides: true });

        // Object Layers
        const skeletonLayer = map.getObjectLayer('Skeletons');
        
        this.player = this.physics.add.sprite(80, 80, 'player'); 
        
        // Colliders
        this.physics.add.collider(this.player, wallsLayer!);

        // Create cursors key
        this.cursors = this.input.keyboard!.createCursorKeys();

        // Camera
        this.cameras.main.startFollow(this.player, true);

        // Skeletons
        this.skeletons = this.physics.add.group({
            classType: Skeleton
        });

        // console.dir(map.objects[0].objects);
        map.objects[0].objects.forEach((skeleton) => {
            this.skeletons.get(skeleton.x! + skeleton.width! * 0.5, skeleton.y! - skeleton.height! * 0.5, 'skeleton');
        });

        // skeletonLayer?.objects.forEach((skeleton) => {
        //     console.dir(skeleton);
        //     this.skeletons.get(skeleton.x, skeleton.y, 'skeleton');
        // });



    }
    update(){
        const speed = 100;
        
        if(!this.cursors || !this.player){
            return;
        } else if(this.cursors.up.isDown){
            this.player.setVelocity(0, -speed);
        } else if(this.cursors.down.isDown){
            this.player.setVelocity(0, speed);
        } else if(this.cursors.right.isDown){
            this.player.setVelocity(speed, 0);
        } else if(this.cursors.left.isDown){
            this.player.setVelocity(-speed, 0);
        } else {
            this.player.setVelocity(0, 0);
        }
    }
}
