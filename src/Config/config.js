/* eslint-disable no-unresolved */

import Phaser from 'phaser';

export default {
  type: Phaser.AUTO,
  width: 880,
  height: 640,
  backgroundColor: 'black',
  parent: 'main-container',
  dom: {
    createContainer: true,
  },
  physics: {
    default: 'arcade',
    arcade: {
      gravity: { x: 0, y: 0 },
    },
  },
  pixelArt: true,
  roundPixels: true,
};
