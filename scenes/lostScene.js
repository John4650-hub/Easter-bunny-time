import Phaser from '../lib/phaser.js';
export default class lostScene extends Phaser.Scene {
  constructor() {
    super({ key: 'lostScene' });
  }
  preload() {
    this.load.image('lostBg', '../assets/Background Brown.png.png');
    this.load.image('lost', '../assets/Lost.png');
  }
  create() {
    this.add.image(0, 0, 'lostBg').setOrigin(0).setScale(10);

    let lostImage = this.add.image(100, 0, 'lost').setOrigin(0).setScale(0.5);
    this.time.addEvent({
      delay: 1000,
      callback: () => {
        this.add.text(150, 0, "Click to Restart!", {
          fontFamily: 'Times New Roman',
          fontStyle: 'bold',
          colour: '#ff0000',
          fontSize: '64px'
        });
      },
    });

    this.input.on('pointerdown', () => {
      location.reload();
    })

  }
}