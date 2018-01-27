// The entry point into the project.
let turn = 0;
let thrust = 0;

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
      turn = -1;
      console.log('left');
      break;
    case 'd':
      turn = 1;
      console.log('right');
      break;
    case 'w':
      thrust = 1;
      console.log('accelerate');
      break;
    case 's':
      thrust = -1;
      console.log('decelerate');
      break;
    default:
      console.log('invalid input');
  }
  console.log(`${turn.toString()}, ${thrust.toString()}`);
}, false);

window.addEventListener('keyup', (event) => {
  const keyID = event.key;

  switch (keyID) {
    case 'a':
      turn = 0;
      console.log('stop left');
      break;
    case 'd':
      turn = 0;
      console.log('stop right');
      break;
    case 'w':
      thrust = 0;
      console.log('stop accelerate');
      break;
    case 's':
      thrust = 0;
      console.log('stop decelerate');
      break;
    default:
      console.log('stop invalid input');
  }
  console.log(`${turn.toString()}, ${thrust.toString()}`);
}, false);
