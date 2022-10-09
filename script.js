import { setUpGround, updateGround } from './ground.js';

const WORLD_WIDTH = 100;
const WORLD_HEIGHT = 30;
const SPEED_SCALE_INCREASE = 0.00001;

const worldElem = document.querySelector('[data-world]');
const scoreElem = document.querySelector('[data-score]');
const startScreenElem = document.querySelector('[data-start-screen]');

setPixelToWorldScale();
window.addEventListener('resize', setPixelToWorldScale);
document.addEventListener('keydown', handleStart, { once: true });

let lastTime;
let speedScale;
let score;

function update(time) {
  if (lastTime == null) {
    lastTime = time;
    window.requestAnimationFrame(update);
    return;
  }

  const delta = time - lastTime;

  updateGround(delta, speedScale);
  updateSpeedScale(delta);
  updateScore(delta);

  lastTime = time;
  window.requestAnimationFrame(update);
}

function updateScore(delta) {
  if (!isNaN(score)) {
    score += delta * 0.01;
    scoreElem.textContent = Math.floor(score);
  }
}

window.requestAnimationFrame(update);

function updateSpeedScale(delta) {
  speedScale + delta * SPEED_SCALE_INCREASE;
}

function setPixelToWorldScale() {
  let worldToPixelSizeScale;
  if (window.innerWidth / window.innerHeight < WORLD_WIDTH / WORLD_HEIGHT) {
    worldToPixelSizeScale = window.innerWidth / WORLD_WIDTH;
  } else {
    worldToPixelSizeScale = window.innerWidth / WORLD_HEIGHT;
  }
  worldElem.style.width = `${WORLD_WIDTH * worldToPixelSizeScale}px`;
  worldElem.style.height = `${WORLD_HEIGHT * worldToPixelSizeScale}px`;
}

function handleStart() {
  lastTime = null;
  speedScale = 1;
  score = 0;
  setUpGround();
  startScreenElem.classList.add('hide');
  window.requestAnimationFrame(update);
}
