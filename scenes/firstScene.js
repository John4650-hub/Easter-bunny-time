import Phaser from '../lib/phaser.js'
export default class firstScene extends Phaser.Scene {
  constructor() {
    super({ key: 'firstScene' });
  }
  preload() {
    this.load.image('phaserLogo', '../assets/phaser-header.png');
  }
  create() {
    this.add.image(0, 0, 'phaserLogo').setOrigin(0).setScale(.9, .7);
    this.time.addEvent({
      delay: 2000,
      callback: () => {
        this.scene.start('instructionScene');
      }
    });
  }
}