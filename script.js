import { updateGround, setUpGround } from './ground.js';
import { updateDino, setUpDino, getDinoRect, setDinoLose } from './dino.js';
import { updateCactus, setUpCactus, getCactusRects } from './cactus.js';

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
  updateDino(delta, speedScale);
  updateCactus(delta, speedScale);
  updateSpeedScale(delta);
  updateScore(delta);

  if (checkLose()) return handleLose();

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

function checkLose() {
  const dinoRect = getDinoRect();
  return getCactusRects().some((rect) => isCollision(rect, dinoRect));
}

function isCollision(rect1, rect2) {
  return (
    rect1.left < rect2.right &&
    rect1.top < rect2.bottom &&
    rect1.right > rect2.left &&
    rect1.bottom > rect2.top
  );
}

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
  setUpDino();
  setUpCactus();
  startScreenElem.classList.add('hide');
  window.requestAnimationFrame(update);
}

function handleLose() {
  setDinoLose();
  setTimeout(() => {
    document.addEventListener('keydown', handleStart, { once: true });
    startScreenElem.classList.remove('hide');
  }, 100);
}
