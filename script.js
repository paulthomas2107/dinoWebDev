const WORLD_WIDTH = 100;
const WORLD_HEIGHT = 30;

const worldElem = document.querySelector('[data-world]');

setPixelToWorldScale();
window.addEventListener('resize', setPixelToWorldScale);

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
