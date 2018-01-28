import json


class Instance:
    def __init__(self, surface_map):
        self.map = surface_map
        self.players = []
        self.alive = True

    def add_player(self, player):
        self.players.append(player)

    def loop(self):
        while self.alive:
            for player in self.players:
                # surface = self.map[player.car.x][player.car.y]
                surface = (1.0, 1.0, 1.0)  # TODO get surface from map 
                player.car.update(surface)

            message = [{
                "velx": player.car.vx,
                "vely": player.car.vy,
                "posx": player.car.x,
                "posy": player.car.y,
                "id":   id(player)
            } for player in self.players]

            for player in self.players:
                player.write_message(json.dumps(message))

    def run_loop(self):
        self.thread = threading.Thread(target=self.loop())
        self.thread.start()

    def kill(self):
        self.alive = False
        self.thread.join()
