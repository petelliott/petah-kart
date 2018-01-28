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

  loadEverything();
});

const TILE_WIDTH = 128;
const TILE_HEIGHT = 128;
const SPRITESHEET_WIDTH = 31;
const SPRITESHEET_HEIGHT = 15;
// Loads the map and the car.
// Creates a spritesheet using the map.
function loadEverything() {
  PIXI.loader
    .add("res/spritesheets/car_blue_1.png")
    .add('res/spritesheets/spritesheet_tiles.png')
    .load(() => {
      setup();
      // Creates the spritesheet.
      const spritesheet = PIXI.BaseTexture.fromImage('res/spritesheets/spritesheet_tiles.png');

      // Creates a PixiJS sprite for each sprite in the spritesheet.
      const sprites = {};
      for (let col = 0; col < SPRITESHEET_WIDTH; col++) {
        for (let row = 0; row < SPRITESHEET_HEIGHT; row++) {
          const rectangle = new PIXI.Rectangle(
            col * TILE_WIDTH,
            row * TILE_HEIGHT,
            TILE_WIDTH,
            TILE_HEIGHT
          );
          let texture = new PIXI.Texture(spritesheet, rectangle);
          sprites[col + row * SPRITESHEET_WIDTH] = new PIXI.Sprite(texture);
        }
      }
      app.stage.addChild(sprites[0]);

      fetch('res/spritesheets/map.json')
        .then(response => response.json())
        .then(json => {
          let tiles = json.layers[0].data;
          tiles.forEach((tile, index) => {
            let sprite = sprites[tile];
            sprite.x = index * 128;
            sprite.y = index * 128;
            app.stage.addChild(sprite);
          });
        })
        .catch(error => console.log(error));
    });
}

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
      let sprite = new PIXI.Sprite(PIXI.loader.resources["res/spritesheets/car_blue_1.png"].texture);
      console.log(sprite);
      sprite.x = car.posx * 20;
      sprite.y = car.posy * 20;
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
    carSprite.x = car.posx * 20;
    carSprite.y = car.posy * 20;
    carSprite.vx = car.velx;
    carSprite.vy = car.vely;
    carSprite.rotation = car.angle;
  });
}
