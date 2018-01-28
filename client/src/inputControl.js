let turn = 0;
let thrust = 0;
let brake = 0;
const turnAngle = 0.0872665;
let turnLeft = localStorage.getItem("storedLeft");
let turnRight  = localStorage.getItem("storedRight");
let accelerateKey = localStorage.getItem("storedAccel");
let deccelerateKey = localStorage.getItem("storedBrake");

window.addEventListener('keydown', (event) => {
  const keyID = event.key;
  const oldStatus = [turn, thrust, brake];

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
      brake = 1;
      console.log('deccelerate');
      break;
    default:
      console.log('invalid input');
  }
  if (oldStatus[0] !== turn || oldStatus[1] !== thrust || oldStatus[2] !== brake) {
    console.log('Sent!');
    sendUpdate(thrust, turn, brake);
  }
  console.log(`${turn.toString()}, ${thrust.toString()}, ${brake.toString()}`);
}, false);

window.addEventListener('keyup', (event) => {
  const keyID = event.key;
  const oldStatus = [turn, thrust, brake];
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
      brake = 0;
      console.log('stop deccelerate');
      break;
    default:
      console.log('stop invalid input');
  }
  if (oldStatus[0] !== turn || oldStatus[1] !== thrust || oldStatus[2] !== brake) {
    console.log('sent!');
    sendUpdate(thrust, turn, brake);
  }
  console.log(`${turn.toString()}, ${thrust.toString()}, ${brake.toString()}`);
}, false);
