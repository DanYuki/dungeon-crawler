import Phaser from "phaser";

export default class Lizard extends Phaser.Physics.Arcade.Sprite {
    constructor(scene:Phaser.Scene, x:number, y:number, texture:string|Phaser.Textures.Texture, frame:string|number){
        super(scene, x, y, texture, frame);

        this.setTexture('skeleton');
    }

    // destroy(fromScene:Phaser.Scene){
    //     super.destroy(fromScene);
    // }
}