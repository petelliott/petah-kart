# PetahKart
A multiplayer racing game, playable right from your web browser.<br>
Created by Alex Rostron, Ben Hallworth, Brighton Greet, Chris Pontikes, Jacob Reckhard, 
Jarrett Yu, Joshua Derkson, Kyle Hennig, Navras Kamal, and Peter Elliott.

## Project Structure
### Client
Receives input, relays it to the server, and uses PixiJS to render a variety of maps via WebGL.

### Web Server
Allows for multiple game servers to be running independently of one another, increasing scalability.<br>
Serves the user interface for the login screen.

### Game Server
Performs all the physics calculations and informs the client of the other players' locations.

### Maps
Hand-crafted maps for the game, created with love and care.
