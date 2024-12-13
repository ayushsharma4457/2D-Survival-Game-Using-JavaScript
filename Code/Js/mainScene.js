export default class MainScene extends Phaser.Scene{
    constructor()
    {
        super("MainScene");
    }

    preload(){
        console.log("Preload");
        this.load.atlas('male','assets/images/male.png','assets/images/male_atlas.json');
        this.load.animation('male_anim','assets/images/male_anim.json');
    }

    create(){
        console.log("Create");
        this.player = new Phaser.Physics.Matter.Sprite(this.matter.world,0,0,'male','townsfolk_m_idle_1');
        this.add.existing(this.player);
        this.inputKeys = this.input.keyboard.addKeys({
            up : Phaser.Input.Keyboard.KeyCodes.W,
            down: Phaser.Input.Keyboard.KeyCodes.S,
            left: Phaser.Input.Keyboard.KeyCodes.A,
            right: Phaser.Input.Keyboard.KeyCodes.D,
        })
    }
    update(){
        console.log("Update");
        // this.player.anims.play('male_walk',true)
        const speed = 1.5;
        let playerVelocity = new Phaser.Math.Vector2();
        if(this.inputKeys.left.isDown){
            playerVelocity.x = -1;
        }else if(this.inputKeys.right.isDown)
        {
            playerVelocity.x = 1;
        }
        if(this.inputKeys.up.isDown){
            playerVelocity.y = -1;
        }else if(this.inputKeys.down.isDown)
        {
            playerVelocity.y = 1;
        }
        playerVelocity.normalize();
        playerVelocity.scale(speed);
        this.player.setVelocity(playerVelocity.x,playerVelocity.y);

        // This New Movement Function Is Added: 
        if (playerVelocity.length() > 0) {
            // Always play the walking animation when the player is moving
            this.player.anims.play('male_walk', true);
        }else if(playerVelocity.length()== 0 )
        {
            this.player.setFrame('male_idle');
        }
    }
}
