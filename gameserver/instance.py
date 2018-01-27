

class Instance:
    def __init__(self, surface_map):
        self.map = surface_map
        players = []
        self.alive = True

    def add_player(self, player):
        self.players.append(player)

    def loop():
        while self.alive:
            for player in players:
                surface = self.map[player.car.x][player.car.y]
                player.car.update(surface)

                for player in players:
                    #TODO call send functions
                    pass
            
    def kill(self):
        self.alive = False
