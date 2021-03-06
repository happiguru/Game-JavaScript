/* eslint-disable no-unused-vars */
import Phaser from 'phaser';
import Player from '../entities/player';
import ChaserShip from '../entities/chaserShip';
import GunShip from '../entities/gunShip';
import CarrierShip from '../entities/carrierShip';
import PlayerLaser from '../entities/laserPlayer';
import BackgroundOne from '../assets/Background-1.png';
import Explosion from '../assets/sprExplosion.png';
import Enemy0 from '../assets/sprEnemy0.png';
import Enemy1 from '../assets/sprEnemy1.png';
import Enemy2 from '../assets/sprEnemy2.png';

import LaserEnemy0 from '../assets/sprLaserEnemy0.png';
import LaserPlayer from '../assets/sprLaserPlayer.png';
import sprPlayer from '../assets/sprPlayer.png';

import soundone from '../assets/sndExplode0.wav';
import soundtwo from '../assets/sndExplode1.wav';
import soundthree from '../assets/sndLaser.wav';

const Storage = require('../modules/storage');

let timer;
let score = 0;
let scoreText;
let highText;
let stageText;
let timerText;
let ammoText;
const zero = 0;
let sec = 0;
const ammunition = 100;

const highestScore = Storage.getHighScore();

if (highestScore === null) {
  Storage.highScore(zero);
}

class SceneMain extends Phaser.Scene {
  constructor() {
    super({
      key: 'SceneMain',
    });
  }

  preload() {
    this.load.image('deepspace', BackgroundOne);

    this.load.spritesheet('sprExplosion', Explosion, {
      frameWidth: 32,
      frameHeight: 32,
    });
    this.load.spritesheet('sprEnemy0', Enemy0, {
      frameWidth: 16,
      frameHeight: 16,
    });
    this.load.image('sprEnemy1', Enemy1);
    this.load.spritesheet('sprEnemy2', Enemy2, {
      frameWidth: 16,
      frameHeight: 16,
    });
    this.load.image('sprLaserEnemy0', LaserEnemy0);
    this.load.image('sprLaserPlayer', LaserPlayer);
    this.load.spritesheet('sprPlayer', sprPlayer, {
      frameWidth: 16,
      frameHeight: 16,
    });

    this.load.audio('sndExplode0', soundone);
    this.load.audio('sndExplode1', soundtwo);
    this.load.audio('sndLaser', soundthree);
  }

  create() {
    Storage.currentScore(zero);
    Storage.setAmmo(ammunition);

    this.bg = this.add.image(240, 320, 'deepspace');

    stageText = this.add.text(250, 16, 'First Stage', {
      fontSize: '32px',
      fill: '#fff',
    });

    highText = this.add.text(16, 60, ' ', {
      fontSize: '16px',
      fill: '#fff',
    });
    scoreText = this.add.text(16, 16, ' ', {
      fontSize: '32px',
      fill: '#fff',
    });

    timerText = this.add.text(350, 60, ' ', {
      fontSize: '16px',
      fill: '#fff',
    });

    ammoText = this.add.text(330, 90, ' ', {
      fontSize: '16px',
      fill: '#fff',
    });

    this.anims.create({
      key: 'sprEnemy0',
      frames: this.anims.generateFrameNumbers('sprEnemy0'),
      frameRate: 20,
      repeat: -1,
    });
    this.anims.create({
      key: 'sprEnemy2',
      frames: this.anims.generateFrameNumbers('sprEnemy2'),
      frameRate: 20,
      repeat: -1,
    });
    this.anims.create({
      key: 'sprExplosion',
      frames: this.anims.generateFrameNumbers('sprExplosion'),
      frameRate: 20,
      repeat: 0,
    });
    this.anims.create({
      key: 'sprPlayer',
      frames: this.anims.generateFrameNumbers('sprPlayer'),
      frameRate: 20,
      repeat: -1,
    });

    this.sfx = {
      explosions: [
        this.sound.add('sndExplode0', {
          volume: 0.01,
        }),
        this.sound.add('sndExplode1', {
          volume: 0.01,
        }),
      ],
      laser: this.sound.add('sndLaser', {
        volume: 0.01,
      }),
    };

    this.player = new Player(
      this,
      this.game.config.width * 0.5,
      this.game.config.height * 0.5,
      'sprPlayer',
    );

    this.keyW = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.W);
    this.keyS = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.S);
    this.keyA = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.A);
    this.keyD = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.D);
    this.keySpace = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.SPACE);

    this.enemies = this.add.group();
    this.enemyLasers = this.add.group();
    this.playerLasers = this.add.group();

    this.time.addEvent({
      delay: 1000,
      callback() {
        let enemy = null;

        if (Phaser.Math.Between(0, 10) >= 3) {
          enemy = new GunShip(
            this,
            Phaser.Math.Between(0, this.game.config.width),
            0,
          );
        } else if (Phaser.Math.Between(0, 10) >= 5) {
          if (this.getEnemiesByType('ChaserShip').length < 5) {
            enemy = new ChaserShip(
              this,
              Phaser.Math.Between(0, this.game.config.width),
              0,
            );
          }
        } else {
          enemy = new CarrierShip(
            this,
            Phaser.Math.Between(0, this.game.config.width),
            0,
          );
        }

        if (enemy !== null) {
          enemy.setScale(Phaser.Math.Between(10, 20) * 0.1);
          this.enemies.add(enemy);
        }
      },
      callbackScope: this,
      loop: true,
    });

    this.physics.add.collider(this.playerLasers, this.enemies, (playerLaser, enemy) => {
      if (enemy) {
        if (enemy.onDestroy !== undefined) {
          enemy.onDestroy();
        }
        enemy.explode(true);
        playerLaser.destroy();
        score += 1;
        Storage.currentScore(score);
        if (score > parseInt(highestScore, 10)) {
          Storage.highScore(score);
        }
      }
    });

    const stopTimer = () => { clearInterval(timer); };

    this.physics.add.overlap(this.player, this.enemies, (player, enemy) => {
      if (!player.getData('isDead')
        && !enemy.getData('isDead')) {
        player.explode(false);
        player.onDestroy();
        enemy.explode(true);
        stopTimer();
      }
    });

    this.physics.add.overlap(this.player, this.enemyLasers, (player, laser) => {
      if (!player.getData('isDead')
        && !laser.getData('isDead')) {
        player.explode(false);
        player.onDestroy();
        laser.destroy();
        stopTimer();
      }
    });

    const nextScene = () => this.scene.start('SceneScores');
    const secondStage = () => this.scene.start('SecondStage');

    sec = 60;
    // Add timer
    timer = setInterval(() => {
      timerText.setText(`Time Left: ${sec}`);
      sec -= 1;
      if (sec < 0) {
        secondStage();
        stopTimer();
      }
    }, 1000);
  }

  getEnemiesByType(type) {
    const arr = [];
    for (let i = 0; i < this.enemies.getChildren().length; i += 1) {
      const enemy = this.enemies.getChildren()[i];
      if (enemy.getData('type') === type) {
        arr.push(enemy);
      }
    }
    return arr;
  }

  update() {
    const lasthigh = Storage.getHighScore();
    const currentAmmo = Storage.currentAmmo();

    highText.setText(`Highest: ${lasthigh}`);
    scoreText.setText(`Score: ${score}`);
    ammoText.setText(`Ammunition: ${currentAmmo}`);

    if (currentAmmo < zero) {
      this.player.onDestroy();
      clearInterval(timer);
    }

    if (!this.player.getData('isDead')) {
      this.player.update();
      if (this.keyW.isDown) {
        this.player.moveUp();
      } else if (this.keyS.isDown) {
        this.player.moveDown();
      }
      if (this.keyA.isDown) {
        this.player.moveLeft();
      } else if (this.keyD.isDown) {
        this.player.moveRight();
      }

      if (this.keySpace.isDown) {
        this.player.setData('isShooting', true);
      } else {
        this.player.setData('timerShootTick', this.player.getData('timerShootDelay') - 1);
        this.player.setData('isShooting', false);
      }
    }

    for (let i = 0; i < this.enemies.getChildren().length; i += 1) {
      const enemy = this.enemies.getChildren()[i];

      enemy.update();

      if (enemy.x < -enemy.displayWidth
        || enemy.x > this.game.config.width + enemy.displayWidth
        || enemy.y < -enemy.displayHeight * 4
        || enemy.y > this.game.config.height + enemy.displayHeight) {
        if (enemy) {
          if (enemy.onDestroy !== undefined) {
            enemy.onDestroy();
          }
          enemy.destroy();
        }
      }
    }

    for (let i = 0; i < this.enemyLasers.getChildren().length; i += 1) {
      const laser = this.enemyLasers.getChildren()[i];
      laser.update();
      if (laser.x < -laser.displayWidth
        || laser.x > this.game.config.width + laser.displayWidth
        || laser.y < -laser.displayHeight * 4
        || laser.y > this.game.config.height + laser.displayHeight) {
        if (laser) {
          laser.destroy();
        }
      }
    }

    for (let i = 0; i < this.playerLasers.getChildren().length; i += 1) {
      const laser = this.playerLasers.getChildren()[i];
      laser.update();
      if (laser.x < -laser.displayWidth
        || laser.x > this.game.config.width + laser.displayWidth
        || laser.y < -laser.displayHeight * 4
        || laser.y > this.game.config.height + laser.displayHeight) {
        if (laser) {
          laser.destroy();
        }
      }
    }
  }
}

export default SceneMain;