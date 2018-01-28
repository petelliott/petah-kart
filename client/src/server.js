const ws = new WebSocket(WS_SERVER);

function sendUpdate(thrust, turn, breaks) {
  ws.send(`{"type":"update","angle":${turn},"thrust":${thrust},"break":${breaks}`);
}

window.addEventListener('load', () => {
  // Connection opened.
  // ws.addEventListener('open', () => {
  //   //ws.send();
  // });

  // Listen for messages.
  ws.addEventListener('message', (event) => {
    // eventData is a dictionary of car data { velY, velY, posX, posY, ID }.
    const eventData = JSON.parse(event.data);
    setCarPositions(eventData);
  });
});
