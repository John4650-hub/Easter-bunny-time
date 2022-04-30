import Phaser from '../lib/phaser.js';
import firstScene from './scenes/firstScene.js';
import InstructionScene from './scenes/instructionScene.js';
import MainScene from './scenes/mainScene.js';
import winScene from './scenes/winScene.js';
import lostScene from './scenes/lostScene.js';

let config = {
  type: Phaser.CANVAS,
  scale: {
    mode: Phaser.Scale.FIT
  },
  width: 800,
  height: 600,
  physics: {
    default: 'arcade',
    arcade: {
      gravity: { y: 0 },
      debug: false
    }
  },
  scene: [firstScene, InstructionScene, MainScene, winScene, lostScene]
};

let game = new Phaser.Game(config);
