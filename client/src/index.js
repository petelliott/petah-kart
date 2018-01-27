// The entry point into the project.
window.addEventListener('load', () => {
  let type = 'WebGL';
  if (!PIXI.utils.isWebGLSupported()) {
    type = 'canvas';
  }

  PIXI.utils.sayHello(type);
});

window.addEventListener('keydown', (event) => {
  const keyID = event.key;

  switch (keyID) {
    case 'a':
      console.log('left');
      break;
    case 'd':
      console.log('right');
      break;
    case 'w':
      console.log('accelerate');
      break;
    case 's':
      console.log('decelerate');
      break;
    default:
      console.log('invalid input');
  }
}, false);

window.addEventListener('keyup', (event) => {
  const keyID = event.key;

  switch (keyID) {
    case 'a':
      console.log('stop left');
      break;
    case 'd':
      console.log('stop right');
      break;
    case 'w':
      console.log('stop accelerate');
      break;
    case 's':
      console.log('stop decelerate');
      break;
    default:
      console.log('stop invalid input');
  }
}, false);
