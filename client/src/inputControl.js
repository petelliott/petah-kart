let turn = 0;
let thrust = 0;
let breaks = 0;
const turnAngle = 0.0872665;

window.addEventListener('keydown', (event) => {
  const keyID = event.key;
  const oldStatus = [turn, thrust, breaks];
  switch (keyID) {
    case turnLeft:
      turn = -turnAngle;
      console.log('left');
      break;
    case turnRight:
      turn = turnAngle;
      console.log('right');
      break;
    case accelerateKey:
      thrust = 1;
      console.log('accelerate');
      break;
    case deccelerateKey:
      breaks = 1;
      console.log('deccelerate');
      break;
    default:
      console.log('invalid input');
  }
  if (oldStatus[0] !== turn || oldStatus[1] !== thrust || oldStatus[2] !== breaks) {
    console.log('Sent!');
    sendUpdate(thrust, turn, breaks);
  }
  console.log(`${turn.toString()}, ${thrust.toString()}, ${breaks.toString()}`);
}, false);

window.addEventListener('keyup', (event) => {
  const keyID = event.key;
  const oldStatus = [turn, thrust, breaks];
  switch (keyID) {
    case turnLeft:
      turn = 0;
      console.log('stop left');
      break;
    case turnRight:
      turn = 0;
      console.log('stop right');
      break;
    case accelerateKey:
      thrust = 0;
      console.log('stop accelerate');
      break;
    case deccelerateKey:
      breaks = 0;
      console.log('stop deccelerate');
      break;
    default:
      console.log('stop invalid input');
  }
  if (oldStatus[0] !== turn || oldStatus[1] !== thrust || oldStatus[2] !== breaks) {
    console.log('sent!');
    sendUpdate(thrust, turn, breaks);
  }
  console.log(`${turn.toString()}, ${thrust.toString()}, ${breaks.toString()}`);
}, false);
