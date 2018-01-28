import json
import time
import threading

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
                surface = self.map[int(player.car.pos[0])][int(player.car.pos[1])]

                player.car.update(surface)
                message.append({
                    "velx": player.car.vel[0],
                    "vely": player.car.vel[1],
                    "posx": player.car.pos[0],
                    "posy": player.car.pos[1],
                    "angle": player.car.theta,
                    "id":   id(player),
                })

            for player in self.players:
                player.write_message(json.dumps(message))

            time.sleep(max(0, LOOP_MIN_TIME - (time.time() - t_start)))
            t_start = time.time()

    def run_loop(self):
        self.thread = threading.Thread(target=self.loop, daemon=True)
        self.thread.start()

    def kill(self):
        self.alive = False
        self.thread.join()
