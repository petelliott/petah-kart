const webServerLocation = 'http://localhost:8888';
// JavaScript code for the User Interface when first entering the game
// takes the game ID from newgame as a callback and displays it
function displayId(gameId) {

}
// The functions for the UI and page changes
// joingame
// enter game ID to join that game
function joinGame(gameId) {
  window.location.href = `${webServerLocation}/${gameId}`;
}

// player enters the game ID to join here
function enterId() {
  const a = prompt('enter server code thing');
  joinGame(a);
}

// newgame
// this passes the information to the server (post request)
// recieves the new game ID from the server
function newGame(mapId, playerCount) {
  const xhr = new XMLHttpRequest();
  xhr.open('POST', `${webServerLocation}/new`, true); // tyoe, location, isAsync
  xhr.setRequestHeader('Content-type', 'application/json');
  xhr.onload = () => {
    if (xhr.readyState === 4) {
      if (xhr.status === 200) {
        displayId(xhr.responseText);
      } else {
        // apparently, we don't like logging errors
        // console.error(xhr.statusText);
      }
    }
  };
  xhr.send(JSON.stringify({ // do not changed the name map, or player_count
    map: mapId, //             the server expects this form.
    player_count: playerCount,
  }));
}

// player chooses map, max players and passes into newgame
function createGame() {
  newGame(0, 3);
}

// The functions for the UI and page changes
function clickJoin() {
  console.log('join');
  const a = prompt('enter server code thing');
  joinGame(a);
}


function clickCreate() {
  console.log('create');
  newGame(0, 3);
  createGame();
}

function clickCredits() {
  console.log('credits');
}

function clickSettings() {
  console.log('settings');
}
