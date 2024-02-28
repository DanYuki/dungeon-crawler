import { Scene } from 'phaser';

export class Game extends Scene
{
    camera: Phaser.Cameras.Scene2D.Camera;
    background: Phaser.GameObjects.Image;
    msg_text : Phaser.GameObjects.Text;
    player: Phaser.Physics.Arcade.Sprite;
    cursors: Phaser.Types.Input.Keyboard.CursorKeys;

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
        const tileset = map.addTilesetImage('Dungeon_Tileset', 'tiles');

        map.createLayer('Ground', tileset!);
        const wallsLayer = map.createLayer('Wall', tileset!);
        wallsLayer!.setCollisionByProperty({ collides: true });

        this.player = this.physics.add.sprite(80, 80, 'player'); 

        // Enemies
        this.physics.add.group
        
        // Colliders
        this.physics.add.collider(this.player, wallsLayer!);

        // Create cursors key
        this.cursors = this.input.keyboard!.createCursorKeys();

        // Camera
        this.cameras.main.startFollow(this.player, true);

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
