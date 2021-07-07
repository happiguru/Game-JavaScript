/* eslint-disable no-unused-vars */
/* eslint-disable no-undef */
/* eslint-disable no-unresolved */

import 'phaser';
import config from './Config/config.js';
import SceneMain from './Scenes/SceneMain.js';
import SceneMainMenu from './Scenes/SceneMainMenu.js';
import SceneScores from './Scenes/SceneScores.js';
import SceneTopScores from './Scenes/SceneTopScores.js';
import SecondStage from './Scenes/SecondStage.js';
import ThirdStage from './Scenes/ThirdStage.js';
import SceneIntro from './Scenes/SceneIntro.js';

class Game extends Phaser.Game {
  constructor() {
    super(config);
    this.scene.add('SceneIntro', SceneIntro);
    this.scene.add('ThirdStage', ThirdStage);
    this.scene.add('SecondStage', SecondStage);
    this.scene.add('SceneTopScores', SceneTopScores);
    this.scene.add('SceneScores', SceneScores);
    this.scene.add('SceneMainMenu', SceneMainMenu);
    this.scene.add('SceneMain', SceneMain);
    this.scene.start('SceneMainMenu');
  }
}

window.game = new Game();
