class firstScene extends Phaser.Scene {
  constructor() {
    super({ key: 'firstScene' });
  }
  preload() {
    this.load.image('phaserLogo', './assets/phaser-header.png');
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
class InstructionScene extends Phaser.Scene {
  constructor() {
    super({ key: 'instructionScene' })
  }
  preload() {
    this.load.audio('bgMusic', './assets/Fluffing-a-Duck.mp3');
    this.load.image('item1', './assets/easterEgg.png');
    this.load.image('bgImg', './assets/Background Gray.png.png');
    this.load.image('menue','./assets/panel_brown.png')
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
class MainScene extends Phaser.Scene {
  constructor() {
    super({ key: 'mainScene' });
    this.score = 0;
    this.scoreText;
    this.CountDownTxt;
    this.CountDown = 300;
    this.eggCount = 50;
  }
  preload() {
    this.load.plugin('rexvirtualjoystickplugin', 'plugins/rexvirtualjoystickplugin.min.js', true);

    this.load.spritesheet('bunny', './assets/easter_bunny-F.png', { frameWidth: 144 / 3, frameHeight: 256 / 4 });
    // this.load.image('background','./assets/overView.png');
    this.load.image('tileset', './assets/[Base]BaseChip_pipo.png');
    this.load.tilemapTiledJSON('map', './assets/Again.json');
    this.load.image('egg', './assets/easterEgg.png');
    this.load.audio('pick', './assets/toggle_002.ogg');

  }
  create() {
    // let imgBack = this.add.image(0,0,'background').setOrigin(0).setScale(3.5);
    let map = this.add.tilemap('map');
    //add the map visually
    let tiles = map.addTilesetImage('[Base]BaseChip_pipo', 'tileset'); //The first param is the name of the tileset in Nottiled and the second one is the key used when loading in the asset
    let layer1 = map.createLayer('Layer 1', tiles, 0, 0).setScale(3).setOrigin(0, 0);
    let layer2 = map.createLayer('Layer 2', tiles, 0, 0).setScale(3).setOrigin(0, 0);

    let layer5 = map.createLayer('Layer 5', tiles, 0, 0).setScale(3).setOrigin(0, 0);
    let layer4 = map.createLayer('Layer 4', tiles, 0, 0).setScale(5).setOrigin(0, 0);
    let eggs = this.physics.add.group();



    for (var i = 0; i < this.eggCount; i++) {
      let x = Phaser.Math.Between(500, 3700);
      let y = Phaser.Math.Between(50, 2700);
      let egg = eggs.create(x, y, 'egg');
      egg.scale = .2;
      let body = egg.body;
      body.updateFromGameObject();
    }
    this.player = this.physics.add.sprite(50, 10, 'bunny').setScale(2);
    let layer3 = map.createLayer('Layer 3', tiles, 0, 0).setScale(5).setOrigin(0, 0);

    layer4.setCollisionBetween(137, 138, true);
    layer3.setCollisionBetween(137, 138, true);

    this.physics.add.collider(this.player, layer4);
    this.physics.add.collider(this.player, layer3);

    //First create the animation object
    this.anims.create({
      key: 'idle',
      frames: this.anims.generateFrameNumbers('bunny', { frames: [7, 4, 1, 10] }),
      frameRate: 1,
      repeat: -1
    });
    // this.player.play('idle');

    this.anims.create({
      key: 'left',
      frames: this.anims.generateFrameNumbers('bunny', { frames: [9, 11] }),
      frameRate: 6,
      repeat: -1
    });
    // this.player.play('left');

    this.anims.create({
      key: 'right',
      frames: this.anims.generateFrameNumbers('bunny', { frames: [3, 5] }),
      frameRate: 6,
      repeat: -1
    });
    // this.player.play('right');

    this.anims.create({
      key: 'up',
      frames: this.anims.generateFrameNumbers('bunny', { frames: [0, 2] }),
      frameRate: 6,
      repeat: -1
    });
    // this.player.play('up');

    this.anims.create({
      key: 'down',
      frames: this.anims.generateFrameNumbers('bunny', { frames: [6, 8] }),
      frameRate: 6,
      repeat: -1
    })


    // Joy stick controls
    this.joyStick = this.plugins.get('rexvirtualjoystickplugin').add(this, {
        x: 100,
        y: 500,
        radius: 100,
        base: this.add.circle(0, 0, 100, 0x888888),
        thumb: this.add.circle(0, 0, 50, 0xcccccc),
      })
      .on('update', this.dumpJoyStickState, this);
    this.joyStick.setScrollFactor(0);
    this.cursorKeys = this.joyStick.createCursorKeys();
    this.keyBoard = this.input.keyboard.createCursorKeys();
    this.dumpJoyStickState();
    this.cameras.main.setBounds(0, 0, 3840, 2850);
    this.cameras.main.startFollow(this.player);
    this.physics.world.setBounds(0, -20, 3870, 2900)

    this.player.setCollideWorldBounds(true)
    // scene.physics.world.setBoundsCollision(left, right, up, down);
    this.lights.enable();
    this.lights.setAmbientColor(0xf00ff);
    // scoreText
    let txtConfig = {
      fontFamily: 'Times New Roman',
      fontSize: '32px',
      fill: '#ffccff',
      fontStyle: 'bold',
      stroke: '#ff00ff',
      strokeThickness: 2

    }
    // score text
    this.scoreText = this.add.text(16, 16, 'Eggs Collected: 0', txtConfig).setScrollFactor(0);

    // collect stars
    this.physics.add.overlap(this.player, eggs, this.collectEggs, null, this);

    // timer txt
    this.CountDownTxt = this.add.text(this.scoreText.x * 35, this.scoreText.y, 'Left:0', txtConfig).setScrollFactor(0);


    let timer = this.time.addEvent({
      delay: 1000,
      callback: () => {
        this.CountDown--;
        this.CountDownTxt.setText(`Left: ${this.CountDown}`);
      },
      loop: true
    });

  }

  dumpJoyStickState() {
    let joyKeys = this.joyStick.createCursorKeys();
    var s = 'Key down: ';
    for (var name in joyKeys) {
      if (joyKeys[name].isDown) {
        s += `${name} `;
      }
    }
  }

  collectEggs(player, egg) {
    egg.disableBody(true, true);
    this.score += 1;
    this.scoreText.setText('Eggs Collected: ' + this.score);
    this.sound.play('pick');
  }

  update() {
    if (this.score == this.eggCount && this.CountDown > 1) {
      this.scene.start('winScene');
      //if the player wins while timer still counting down, take him to the win scene
    }
    else if (this.score != this.eggCount && this.CountDown < 1) {
      this.scene.start('lostScene');
      //if the player loses while timer reaches zero counting down, take him to the lose scene
    }
    else {
      this.player.setVelocity(0);
      if (this.cursorKeys.up.isDown || this.keyBoard.up.isDown) {
        this.player.setVelocityY(-300);
        this.player.anims.play('up', true);
        console.log('up key');
      }
      else if (this.cursorKeys.down.isDown || this.keyBoard.down.isDown ) {
        this.player.setVelocityY(300);
        this.player.anims.play('down', true);
        // console.log(this.player.y);

      }
      else if (this.cursorKeys.left.isDown || this.keyBoard.left.isDown) {
        this.player.setVelocityX(-300);
        this.player.anims.play('left', true);
      }
      else if (this.cursorKeys.right.isDown || this.keyBoard.right.isDown) {
        this.player.setVelocityX(300);
        this.player.anims.play('right', true);
      }

      else {
        this.player.play('idle', true);
      }
    }
  }
}
class winScene extends Phaser.Scene {
  constructor() {
    super({ key: 'winScene' });
  }
  preload() {
    this.load.image('bg', './assets/Background Yellow.png.png')
    this.load.image('win', './assets/winner.png');
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
class lostScene extends Phaser.Scene {
  constructor() {
    super({ key: 'lostScene' });
  }
  preload() {
    this.load.image('lostBg', './assets/Background Brown.png.png');
    this.load.image('lost', './assets/Lost.png');
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
