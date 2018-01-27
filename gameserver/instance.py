import json


class Instance:
    def __init__(self, surface_map):
        self.map = surface_map
        self.players = []
        self.alive = True

    def add_player(self, player):
        self.players.append(player)

    def loop():
        while self.alive:
            for player in self.players:
                surface = self.map[player.car.x][player.car.y]
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

    def kill(self):
        self.alive = False
