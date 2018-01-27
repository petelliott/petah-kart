const ws = new WebSocket(`ws://${window.location.host}/websocket`);

function sendUpdate(thrust, turn, breaks) {
  ws.send(`{"type":"update","angle":${turn},"thrust":${thrust},"break":${breaks}`);
}

window.addEventListener('load', () => {
  // Connection opened.
  ws.addEventListener('open', () => {
    ws.send();
  });

  // Listen for messages.
  ws.addEventListener('message', (event) => {
    // eventData is a dictionary of car data { velY, velY, posX, posY, ID }.
    const eventData = JSON.parse(event.data);
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
});
