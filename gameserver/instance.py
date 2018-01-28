import json
import time
import threading
import tornado

LOOP_MIN_TIME = 0.06


class Instance:
    def __init__(self, surface_map):
        self.map = surface_map
        self.players = []
        self.alive = True
        self.state = {"finished": False}

    def add_player(self, player):
        self.players.append(player)

    def loop(self):
        t_start = time.time()
        while self.alive and not self.state["finished"]:
            message = []
            for player in self.players:
                player.car.update(self.getMapPoint(
                    int(player.car.pos[0]), int(player.car.pos[1])), self.getCarsForCollisions(player))
                message.append({
                    "velx": player.car.vel[0],
                    "vely": player.car.vel[1],
                    "posx": player.car.pos[0],
                    "posy": player.car.pos[1],
                    "angle": player.car.theta,
                    "id":   id(player),
                })

            self.send_all(json.dumps(message))

            time.sleep(max(0, LOOP_MIN_TIME - (time.time() - t_start)))
            t_start = time.time()
        if self.gamestate["finished"]:
            self.send_all('{"type":"gameOver"}')

    def getMapPoint(self, x, y):
        try:
            return self.map["tiles"][x][y]
        except:
            print("I cry")
            print(x)
            print(y)
            return (2.0, 1.0, 0.1)

    def getCarsForCollisions(self, dontIncludeMe):
        return [player.car for player in list(filter(lambda x: x is not dontIncludeMe, self.players))]

    def send_all(self, msg_str):
        try:
            for player in self.players:
                player.write_message(msg_str)
        except Exception as e:
            print(e)
            self.sen_dall(self, msg_str)

    def run_loop(self):
        self.thread = threading.Thread(target=self.loop, daemon=True)
        self.thread.start()

    def kill(self):
        self.alive = False
        self.thread.join()
