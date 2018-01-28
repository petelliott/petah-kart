window.addEventListener('load', () => {
  let type = 'WebGL';
  if (!PIXI.utils.isWebGLSupported()) {
    type = 'canvas';
  }

  PIXI.utils.sayHello(type);

  const app = new PIXI.Application({
    width: 1600,
    height: 900,
    antialias: true,
    transparent: false,
    resolution: 1,
  });
  document.body.appendChild(app.view);

  PIXI.loader
    .add("images/car_blue_1.png")
    .load(setup);
});

function setup() {
  let sprite = new PIXI.Sprite(PIXI.loader.resources["images/car_blue_1.png"].texture);
  app.stage.addChild(sprite);
}

cars = [];
// Cars have an id, x, y, vx, vy, and angle.
function setCarPositions(newCars) {
  newCars.forEach((newCar) => {
    // Create a new car if it doesn't exist.
    if (!doesCarExist(newCar.id)) {
      let sprite = new PIXI.Sprite(PIXI.loader.resources["images/car_blue_1.png"].texture);
      sprite.x = newCar.x;
      sprite.y = newCar.y;
      app.stage.addChild(sprite);
      cars.push(sprite);
      return;
    }
    // Otherwise, update the location of the old car.
    let car = getCarByID(newCar.id);
    car.x = newCar.x;
    car.y = newCar.y;
  });
}

function doesCarExist(carID) {
  for (let car of cars) {
    if (car.id === cardID) {
      return true;
    }
  }
  return false;
}

function getCarByID(carID) {
  for (let car of cars) {
    if (car.id === cardID) {
      return car;
    }
  }
  throw new Error("The requested car does not exist.");
}
