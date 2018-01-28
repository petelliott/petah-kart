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

// Cars have an id, x, y, vx, vy, and angle.
function setCarPositions(cars) {
  cars.forEach((car) => {
    let sprite = new PIXI.Sprite(PIXI.loader.resources["images/car_blue_1.png"].texture);
    sprite.x = car.x;
    sprite.y = car.y;
    app.stage.addChild(cat);
  });
}
