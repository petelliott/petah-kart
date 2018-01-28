const webServerLocation = 'http://localhost:8888';
// JavaScript code for the User Interface when first entering the game
// takes the game ID from newgame as a callback and displays it
function displayId(gameId) {
  console.log(gameId);
}
// The functions for the UI and page changes
// joingame
// enter game ID to join that game
function joinGame(gameId) {
  window.location.href = `${webServerLocation}/game/${gameId}`;
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
  newGame('Map0.json', 3);
}

// The functions for the UI and page changes
function clickJoin() {
  document.getElementById('join').classList.add('hidden');
  document.getElementById('inputKeyContainer').classList.remove('hidden');
  document.getElementById('keyIn').value="";
  document.getElementById('keyIn').focus();
  document.getElementById('keyIn').addEventListener('keydown', (event) => {
    let key = event.key;
    console.log(key);
    if (key === 'Enter') {
      validate();
    }
  }, false);
}

function loseFocusJoin(){
  document.getElementById('join').classList.remove('hidden');
  document.getElementById('inputKeyContainer').classList.add('hidden');
}

function validate() {
  console.log("  Validating...");
  const gameId = document.getElementById('keyIn').value;
  const xhr = new XMLHttpRequest();
  xhr.open('GET', `${webServerLocation}/game/${gameId}`, true); // tyoe, location, isAsync
  xhr.onload = () => {
    if (xhr.readyState === 4) {
      if (xhr.status === 200) {
        joinGame(gameId);
      } else {
        // TODO: not valid

      }
    }
  };
  xhr.send();
}


function clickCreate() {
  console.log('create');
  document.getElementById('create').classList.add('hidden');
  document.getElementById('gameOptions').classList.remove('hidden');
  document.getElementById('keyIn').addEventListener('keydown', (event) => {
    let key = event.key;
    console.log(key);
    if (key === 'Enter') {
      newGame(map, 3);
    }
  console.log('join');
  }, false);
}

function clickCredits() {
  console.log('credits');
}

function clickSettings() {
  console.log('settings');
}

/* Open */
function openSettings() {
    document.getElementById("settingsNav").style.height = "100%";
}

/* Close */
function closeSettings() {
    document.getElementById("settingsNav").style.height = "0%";
}

function openCredits() {
    document.getElementById("creditsNav").style.height = "100%";
}

function closeCredits() {
    document.getElementById("creditsNav").style.height = "0%";
}

window.addEventListener('keydown', (event) => {
  let key = event.key;
  console.log(key);
  if (key === 'Escape') {
    console.log("switch");
    document.getElementById('inputKeyContainer').classList.add('hidden');
    document.getElementById('join').classList.remove('hidden');

    document.getElementById('gameOptions').classList.add('hidden');
    document.getElementById('create').classList.remove('hidden');

    closeSettings();
    closeCredits();
  }
}, false);
