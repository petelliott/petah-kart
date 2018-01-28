const webServerLocation = 'http://localhost:8888';
// JavaScript code for the User Interface when first entering the game
// takes the game ID from newgame as a callback and displays it
function displayId(gameId) {
  alert(gameId);
  joinGame(gameId);

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
  xhr.open('POST', `${webServerLocation}/new`, true); // type, location, isAsync
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

function validate() {
  document.getElementById('keyIn').classList.remove('goodIn');
  document.getElementById('keyIn').classList.add('badIn');
  document.getElementById('keyIn').value = "";
  document.getElementById('keyIn').classList.add('goodIn');
  document.getElementById('keyIn').classList.remove('badIn');
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
        console.log("shook");
        document.getElementById('inputKeyContainer').classList.add('badIn');
        document.getElementById('keyIn').value = "";
        document.getElementById('inputKeyContainer').classList.remove('badIn');
        console.log("not shook");
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
  document.getElementById('gameOptions').style.display = "flex";
  document.getElementById('confirmOptions').focus();
  document.getElementById('keyIn').addEventListener('keydown', (event) => {
    let key = event.key;
    console.log(key);
    if (key === 'Enter') {
      newGame(mapSelect(map), numPlayers);
    }
    console.log(map);
    console.log(numPlayers);
    if (key === 'ArrowLeft' || key === 'a') {
      modifyMap(false);
    }
    if (key === 'ArrowRight' || key === 'd') {
      modifyMap(true);
    }
    if (key === 'ArrowUp' || key === 'w') {
      modifyPlr(true);
    }
    if (key === 'ArrowDown' || key === 's') {
      modifyPlr(false);
    }
    console.log('join');
  }, false);
}

function modifyMap(i) {
  if (i) {
    if (map < 4) {
      map++;
      redraw(true);
    }
  } else {
    if (map > 0) {
      map--;
      redraw(true);
    }
  }
  console.log("modmap");
}

function modifyPlr(i) {
  if (i) {
    if (numPlayers < 10) {
      numPlayers++;
      redraw(false);
    }
  } else {
    if (numPlayers > 1) {
      numPlayers--;
      redraw(false);
    }
  }
  console.log("modplr");
}

function redraw(bgredraw) {
  if (bgredraw) {
    switch (map) {
      case 0:
        document.getElementById('bg').style.backgroundImage = "url(resources/images/maps/Map0.png)";
        document.getElementById('currentMap').innerHTML = "Simple Square";
        console.log("Map0");
        break;
      case 1:
        document.getElementById('bg').style.backgroundImage = "url(resources/images/maps/Map1.png)";
        document.getElementById('currentMap').innerHTML = "Racetrack";
        console.log("Map1");
        break;
      case 2:
        document.getElementById('bg').style.backgroundImage = "url(resources/images/maps/Map2.png)";
        document.getElementById('currentMap').innerHTML = "The Desert";
        console.log("Map2");
        break;
      case 3:
        document.getElementById('bg').style.backgroundImage = "url(resources/images/maps/Map3.png)";
        document.getElementById('currentMap').innerHTML = "Downtown";
        console.log("Map3");
        break;
      case 4:
        document.getElementById('bg').style.backgroundImage = "url(resources/images/maps/Map4.png)";
        document.getElementById('currentMap').innerHTML = "Slalom";
        console.log("Map4");
        break;
      default:
        console.log("Map Select Error");
        document.getElementById('currentMap').innerHTML = "Simple Square";
        document.getElementById('bg').style.backgroundImage = "url(resources/images/maps/Map0.png)";
        break;
    }
  }
  document.getElementById('currentPlrMax').innerHTML = numPlayers;
}

function mapSelect(map) {
  switch (map) {
    case 0:
      console.log("Map0");
      return "Map0.json";

    case 1:
      console.log("Map1");
      return "Map1.json";

    case 2:
      console.log("Map2");
      return "Map2.json";

    case 3:
      console.log("Map3");
      return "Map3.json";

    case 4:
      console.log("Map4");
      return "Map4.json";

    default:
      console.log("Map Select Error");
      return "Map0.json";
  }
}

function clickSettings() {
  console.log('settings');
}

/* Open */
let isSettings = false;

function openSettings() {
  document.getElementById("settingsNav").style.height = "100%";
  document.getElementById('inputKeyContainer').classList.add('hidden');
  document.getElementById('join').classList.remove('hidden');

  document.getElementById('gameOptions').classList.add('hidden');
  document.getElementById('create').classList.remove('hidden');
  isSettings = true;
}

/* Close */
function closeSettings() {
  document.getElementById("settingsNav").style.height = "0%";
  isSettings = false;
}

function openCredits() {
  document.getElementById("creditsNav").style.height = "100%";
  document.getElementById('inputKeyContainer').classList.add('hidden');
  document.getElementById('join').classList.remove('hidden');

  document.getElementById('gameOptions').classList.add('hidden');
  document.getElementById('create').classList.remove('hidden');
}

function closeCredits() {
  document.getElementById("creditsNav").style.height = "0%";
}

function keybind() {
  localStorage.setItem("storedLeft", document.getElementById("turnLeft").value);
  localStorage.setItem("storedRight", document.getElementById("turnRight").value);
  localStorage.setItem("storedAccel", document.getElementById("accelerateKey").value);
  localStorage.setItem("storedBrake", document.getElementById("deccelerateKey").value);
  closeSettings();
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
