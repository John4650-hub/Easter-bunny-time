import Phaser from '../lib/phaser.js'
export default class winScene extends Phaser.Scene {
  constructor() {
    super({ key: 'winScene' });
  }
  preload() {
    this.load.image('bg', '../assets/Background Yellow.png.png')
    this.load.image('win', '../assets/winner.png');
  }
  create() {
    this.add.image(0, 0, 'bg').setOrigin(0).setScale(10);

    let winImage = this.add.image(100, 0, 'win').setOrigin(0).setScale(0.5);
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
    });

  }
}
