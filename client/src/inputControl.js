let turn = 0;
let thrust = 0;
let breaks = 0;
const turnAngle = 0.0872665;

window.addEventListener('keydown', (event) => {
  const keyID = event.key;
  const oldStatus = [turn, thrust, breaks];
  switch (keyID) {
    case 'a':
      turn = -turnAngle;
      console.log('left');
      break;
    case 'd':
      turn = turnAngle;
      console.log('right');
      break;
    case 'w':
      thrust = 1;
      console.log('accelerate');
      break;
    case 's':
      breaks = 1;
      console.log('decelerate');
      break;
    default:
      console.log('invalid input');
  }
  if (oldStatus[0] !== turn || oldStatus[1] !== thrust || oldStatus[2] !== breaks) {
    console.log('Sent!');
  }
  console.log(`${turn.toString()}, ${thrust.toString()}, ${breaks.toString()}`);
}, false);

window.addEventListener('keyup', (event) => {
  const keyID = event.key;
  const oldStatus = [turn, thrust, breaks];
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
      breaks = 0;
      console.log('stop decelerate');
      break;
    default:
      console.log('stop invalid input');
  }
  if (oldStatus[0] !== turn || oldStatus[1] !== thrust || oldStatus[2] !== breaks) {
    console.log('sent!');
  }
  console.log(`${turn.toString()}, ${thrust.toString()}, ${breaks.toString()}`);
}, false);
