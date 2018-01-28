let app;
const zoom = 300;
let id;
window.addEventListener('load', () => {
  let type = 'WebGL';
  if (!PIXI.utils.isWebGLSupported()) {
    type = 'canvas';
  }

  PIXI.utils.sayHello(type);

  app = new PIXI.Application({
    width: 16 * zoom,
    height: 9 * zoom,
    antialias: true,
    transparent: false,
    resolution: 1,
  });
  document.body.appendChild(app.view);

  loadEverything();
});

const TILE_WIDTH = 130;
const TILE_HEIGHT = 130;
const SPRITESHEET_WIDTH = 31;
const SPRITESHEET_HEIGHT = 15;
let backgroundSprite;
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

      // Creates a PixiJS sprite for each sprite in the spritesheet on request.
      // Returns a new tile sprite.
      function createTile(number) {
        let col = number % SPRITESHEET_WIDTH;
        let row = Math.floor(number / SPRITESHEET_WIDTH);
        const rectangle = new PIXI.Rectangle(
          col * TILE_WIDTH,
          row * TILE_HEIGHT,
          TILE_WIDTH,
          TILE_HEIGHT
        );
        return new PIXI.Sprite(new PIXI.Texture(spritesheet, rectangle));
      }

      // Loads the map from the json file.
      fetch('res/spritesheets/map.json')
        .then(response => response.json())
        .then(json => {
          const tiles = json.layers[0].data;
          const mapWidth = json.width;
          // Converts from tile ids to sprites.
          // Groups the tile sprites into one background sprite.
          backgroundSprite = new PIXI.Container();
          tiles.forEach((tile, index) => {
            let sprite = createTile(tile - 1);
            let col = index % mapWidth;
            let row = Math.floor(index / mapWidth);
            sprite.x = col * 128;
            sprite.y = row * 128;
            backgroundSprite.addChild(sprite);
          });
          app.stage.addChild(backgroundSprite);
        })
        .catch(error => console.log(error));
    });
}

let ready = false;

function setup() {
  ready = true;
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
      sprite.anchor.x = 0.5;
      sprite.anchor.y = 0.5;
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
