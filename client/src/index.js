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

// A map of car ids to sprites.
let idsToSprites = new Map();

// Cars have an id, x, y, vx, vy, and angle.
function setCarPositions(cars) {
  cars.forEach((car) => {
    // Create a new car if it doesn't exist.
    if (!idsToSprites.has(car.id)) {
      let sprite = new PIXI.Sprite(PIXI.loader.resources["images/car_blue_1.png"].texture);
      sprite.x = car.x;
      sprite.y = car.y;
      sprite.rotation = car.angle;
      app.stage.addChild(sprite);
      idsToSprites.set(id, sprite);
      return;
    }
    // Otherwise, update the location of the old car.
    let carSprite = idsToSprites.get(car.id);
    carSprite.x = car.x;
    carSprite.y = car.y;
    carSprite.rotation = car.angle;
  });
}
