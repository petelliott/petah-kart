let app;

window.addEventListener('load', () => {
  let type = 'WebGL';
  if (!PIXI.utils.isWebGLSupported()) {
    type = 'canvas';
  }

  PIXI.utils.sayHello(type);

  app = new PIXI.Application({
    width: 1600,
    height: 900,
    antialias: true,
    transparent: false,
    resolution: 1,
  });
  document.body.appendChild(app.view);

  PIXI.loader
    .add("res/images/car_blue_1.png")
    .load(setup);
});

let ready = false;
function setup() {
  ready = true;
  // test();
}

function test() {
  setCarPositions([
    {
      id: 1,
      posx: 0,
      posy: 0,
      velx: 20,
      vely: 12,
      angle: 24
    }
  ]);
  setTimeout(() => {
    setCarPositions([
      {
        id: 1,
        posx: 100,
        posy: 500,
        velx: 20,
        vely: 12,
        angle: 1
      }
    ]);
  }, 1000);
}

// A map of car ids to sprites.
let idsToSprites = new Map();

// Cars have an id, x, y, vx, vy, and angle.
function setCarPositions(cars) {
  if (!ready) {
    return;
  }
  cars.forEach((car) => {
    // Create a new car if it doesn't exist.
    if (!idsToSprites.has(car.id)) {
      let sprite = new PIXI.Sprite(PIXI.loader.resources["res/images/car_blue_1.png"].texture);
      console.log(sprite);
      sprite.x = car.posx;
      sprite.y = car.posy;
      sprite.vx = car.velx;
      sprite.vy = car.vely;
      sprite.rotation = car.angle;
      app.stage.addChild(sprite);
      idsToSprites.set(car.id, sprite);
      console.log("New sprite created.");
      return;
    }
    // Otherwise, update the location of the old car.
    let carSprite = idsToSprites.get(car.id);
    carSprite.x = car.posx;
    carSprite.y = car.posy;
    carSprite.vx = car.velx;
    carSprite.vy = car.vely;
    carSprite.rotation = car.angle;
  });
}
