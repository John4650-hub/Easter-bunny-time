import Phaser from '../lib/phaser.js';
export default class InstructionScene extends Phaser.Scene {
  constructor() {
    super({ key: 'instructionScene' })
  }
  preload() {
    this.load.audio('bgMusic', '../assets/Fluffing-a-Duck.mp3');
    this.load.image('item1', '../assets/easterEgg.png');
    this.load.image('bgImg', './assets/Background Gray.png.png');
    this.load.image('menue','../assets/panel_brown.png')
  }
  create() {
    let musicConfig = {
      mute: false,
      volume: 1,
      rate: 1,
      detune: 0,
      seek: 0,
      loop: true,
      delay: 0
    }
    this.sound.play('bgMusic', musicConfig);
    this.add.image(0, 0, 'bgImg').setOrigin(0).setScale(10);
    let txtConfig = {
      fontFamily: 'Times New Roman',
      fontSize: '32px',
      color:'#ffccff',
      fontStyle: 'bold',
      stroke: '#ff00ff',
      strokeThickness: 2
    }
    this.add.text(100, 100, `Welcome to the Egg Hunt.
    Get out of the cave`, txtConfig).setOrigin(0);

this.add.text(0, 200, `Aim: Your goal this time is to
gatherall 50 eggs.
The egg looks as      but smaller.
Use the virtual joystick to move`, txtConfig).setOrigin(0);
    this.add.image(243, 260, 'item1').setScale(0.3).setOrigin(0);

    this.add.text(0, 400, `WARNING: 
Watch out for the countdown,
once you fail to gather all eggs 
in time,you lose.`, {
      fontFamily: 'Times New Roman',
      fontSize: '32px',
      fill: '#ffcccc',
      fontStyle: 'bold',
      stroke: '#ff4d4d',
      strokeThickness: 2
    }).setOrigin(0);
    this.time.addEvent({
      delay: 2000,
      callback: () => {
        this.add.text(150, 0, "Click to Start!", {
          fontFamily: 'Times New Roman',
          fontStyle: 'bold',
          stroke: '#ff0000',
          fontSize: '64px'
        });
      }
    });
    this.input.on('pointerdown', () => {
      this.scene.start('mainScene');
    })
    let creditsPallet = this.add.image(530,100,'menue').setOrigin(0).setScale(2.7,5);
    let creditsTitle = this.add.text(creditsPallet.x*1.06,creditsPallet.y*1.4,'Credits',{color:'#00ff40',fontSize:'38px',fontStyle:'bold'}).setOrigin(0);
    let credits = this.add.text(creditsPallet.x*1.02,creditsPallet.y*1.8,`Developer:
    John Delvin
    
Music: 
    kenney
    
Game Engine: 
    phaser
    
Eggs backgrounds: 
    Onocentaur
    
Bunny sprite:
  John Delvin`,{fontStyle:'bold',fontSize: '25px',color:'#000000'}).setOrigin(0);
  }
}
