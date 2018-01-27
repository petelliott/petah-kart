var ws = new WebSocket("ws://" + window.location.host + "/websocket");
// The entry point into the project.

// Connection opened
ws.addEventListener('open', function (event) {
    //ws.send();
});

// Listen for messages
ws.addEventListener('message', function (event) {
    var event_data = JSON.parse(event.data)
    // event_data is a dictionary of car data {velY, velY, posX, posY,ID}
    console.log('Message from server ', event.data);

    switch(event_data.type) {
      case "update":
        //TODO handle a car update

        break;
      case "ID":
        //TODO handle a new ID

        break;
      default:
          console.log('unknown type of message recived: ', event_data.type);
    }

});

window.addEventListener('load', () => {
  let type = 'WebGL';
  if (!PIXI.utils.isWebGLSupported()) {
    type = 'canvas';
  }

  PIXI.utils.sayHello(type);
});
