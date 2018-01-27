window.addEventListener('load', () => {
  const ws = new WebSocket(`ws://${window.location.host}/websocket`);

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
