

function newPlayerHandler(ws) {
  players = {};

  ws.addEventListener('message', function (event) {
    let data = JSON.parse(event.data);
    players[data.id] = data;
    // TODO: draw redraw the player with pixi
  });
}
