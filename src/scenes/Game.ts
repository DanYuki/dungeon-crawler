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
        // const skeletonLayer = map.getObjectLayer('Skeletons');
        
        // Add player
        this.player = this.physics.add.sprite(80, 80, 'player'); 
        // const sword = this.add.image(80, 80, 'basic-sword')

        this.anims.create({
            key: "player-idle-anims",
            frames: this.anims.generateFrameNames('player-idle', { start: 1, end: 4, prefix: 'player_idle_', suffix:'.png'}),
            frameRate: 5,
            repeat: -1,
        });
        this.player.play("player-idle-anims");
        
        

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

        // Colliders
        this.physics.add.collider(this.player, wallsLayer!)
        this.physics.add.collider(this.skeletons, wallsLayer!)
        this.physics.add.collider(this.player, this.skeletons, this.handlePlayerSkeletonCollision, null!, this)

        // skeletonLayer?.objects.forEach((skeleton) => {
        //     console.dir(skeleton);
        //     this.skeletons.get(skeleton.x, skeleton.y, 'skeleton');
        // });



    }

    handlePlayerSkeletonCollision(player: Phaser.Physics.Arcade.Sprite, skeleton: Phaser.Physics.Arcade.Group) {
        player.setTint(0xff00000)
        skeleton.setVelocity(0, 0)
        // console.dir(player)
        // console.dir(skeleton)
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
            this.player.scaleX = 1;
            this.player.body!.offset.x = 0;
        } else if(this.cursors.left.isDown){
            this.player.setVelocity(-speed, 0);
            this.player.scaleX = -1;
            this.player.body!.offset.x = 14;
        } else {
            this.player.setVelocity(0, 0);
        }
    }
}
