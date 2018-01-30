let app;
const zoom = 300;
let id;

const scale = 130;

console.log = () => { };
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
      fetch(`res/maps/${MAP}`)
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
            sprite.x = col * scale;
            sprite.y = row * scale;
            backgroundSprite.addChild(sprite);
          });
          app.stage.addChild(backgroundSprite);
          setup();
        })
        .catch(error => console.log(error));
    });
}

// Lets the client know whether it's ready to start listening to the server.
let ready = false;
function setup() {
  ready = true;
}

// A map of car ids to sprites.
let idsToSprites = new Map();
let myCarX = 0;
let myCarY = 0;

// Cars have an id, x, y, vx, vy, and angle.
function setCarPositions(cars) {
  if (!ready) {
    return;
  }
  cars.forEach((car) => {
    if (id == car.id) {
      myCarX = car.posx * scale;
      myCarY = car.posy * scale;
      return;
    }
  })
  cars.forEach((car) => {
    // Create a new car if it doesn't exist.
    if (!idsToSprites.has(car.id)) {
      let sprite = new PIXI.Sprite(PIXI.loader.resources["res/spritesheets/car_blue_1.png"].texture);
      console.log(sprite);
      sprite.x = car.posx * scale;
      sprite.y = car.posy * scale;
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
    carSprite.x = car.posx * scale;
    carSprite.y = car.posy * scale;
    carSprite.vx = car.velx;
    carSprite.vy = car.vely;
    carSprite.rotation = car.angle;
    // Special case: you are the car.
    if (id == car.id) {
      // Centers the map around your car, and instead moves the background image.
      carSprite.x = (16 * zoom) / 2;
      carSprite.y = (9 * zoom) / 2;
      backgroundSprite.position.x = car.posx * scale;
      backgroundSprite.position.y = car.posy * scale;
    } else {
      // Moves the other cars relative to yours.
      carSprite.x = -carSprite.x + myCarX + 8 * zoom;
      carSprite.y = -carSprite.y + myCarY + (9 / 2) * zoom;
    }
  });
}

function removeCar(id) {
  let carSprite = idsToSprites.get(id);
  app.stage.removeChild(carSprite);
}
