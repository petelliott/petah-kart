import json
import time

LOOP_MIN_TIME = 0.06


class Instance:
    def __init__(self, surface_map):
        self.map = surface_map
        self.players = []
        self.alive = True

    def add_player(self, player):
        self.players.append(player)

    def loop(self):
        t_start = time.time()
        while self.alive:
            message = []
            for player in self.players:
                # surface = self.map[player.car.x][player.car.y]
                surface = (1.0, 1.0, 1.0)  # TODO get surface from map 
                player.car.update(surface)
                message.append({
                    "velx": player.car.vx,
                    "vely": player.car.vy,
                    "posx": player.car.x,
                    "posy": player.car.y,
                    "id":   id(player)
                })

            for player in self.players:
                player.write_message(json.dumps(message))

            time.sleep(max(0, LOOP_MIN_TIME-(time.time()-t_start)))
            t_start = time.time()

    def run_loop(self):
        self.thread = threading.Thread(target=self.loop())
        self.thread.start()

    def kill(self):
        self.alive = False
        self.thread.join()
