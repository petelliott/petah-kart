const ws = new WebSocket(`ws://${window.location.host}/websocket`);

// Connection opened
ws.addEventListener('open', () => {
  ws.send();
});

// Listen for messages
ws.addEventListener('message', (event) => {
  const eventData = JSON.parse(event.data);
  // eventData is a dictionary of car data { velY, velY, posX, posY, ID }.
  console.log('Message from server ', event.data);

  switch (eventData.type) {
    case 'update':
      // TODO: handle a car update.
      break;
    case 'ID':
      // TODO: handle a new ID.
      break;
    default:
      console.log('unknown type of message recived: ', eventData.type);
  }
});

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
    .add('map.tmx')
    .load(() => {
      const tileMap = new PIXI.extras.TiledMap('map.tmx');
      app.render(tileMap);
    });
});
