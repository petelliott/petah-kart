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
  document.getElementById('gameOptions').classList.add('hidden');
  document.getElementById('create').classList.remove('hidden');
  document.getElementById('keyIn').value = "";
  document.getElementById('keyIn').focus();
  document.getElementById('keyIn').addEventListener('keydown', (event) => {
    let key = event.key;
    console.log(key);
    if (key === 'Enter') {
      validate();
    }
  }, false);
}

function loseFocusJoin() {
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

let map = 0;
let numPlayers = 1;

function clickCreate() {
  map = 0;
  numPlayers = 1;
  console.log('create');
  document.getElementById('join').classList.remove('hidden');
  document.getElementById('inputKeyContainer').classList.add('hidden');
  document.getElementById('create').classList.add('hidden');
  document.getElementById('gameOptions').classList.remove('hidden');
  document.getElementById('confirmOptions').focus();
  document.getElementById('keyIn').addEventListener('keydown', (event) => {
    let key = event.key;
    console.log(key);
    if (key === 'Enter') {
      newGame(mapSelect(map), numPlayers);
    }
    if (key === 'ArrowLeft') {
      if (map > 0){map--; redrawBG();}
    }
    if (key === 'ArrowRight') {
      if (map < 4){map++; redrawBG();}
    }
    if (key === 'ArrowUp') {
      if (numPlayers < 10){numPlayers++;}
    }
    if (key === 'ArrowDown') {
      if (numPlayers <= 1){numPlayers--;}
    }
    console.log('join');
  }, false);
}

function mapSelect(map){
  switch(map){
    case 0:
      return "Map0.json";
      console.log("Map0");
      break;
    case 1:
      return "Map1.json";
      console.log("Map1");
      break;
    case 2:
      return "Map2.json";
      console.log("Map2");
      break;
    case 3:
      return "Map3.json";
      console.log("Map3");
      break;
    case 4:
      return "Map4.json";
      console.log("Map4");
      break;
    default:
      console.log("Map Select Error");
      return "Map0.json";
      break;
  }
}

function clickCredits() {
  document.getElementById('inputKeyContainer').classList.add('hidden');
  document.getElementById('join').classList.remove('hidden');

  document.getElementById('gameOptions').classList.add('hidden');
  document.getElementById('create').classList.remove('hidden');
  alert("Credits:\nClient Team: Jarrett Yu, Navras Kamal, Kyle Hennig\nCommunications Team: Jacob Rechard, Alex Rostron\nServer Team: Chris Pontikes, Peter Elliott, Joshua Derkson, Brighton Greet");
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
