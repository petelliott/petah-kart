import car
import json


def new_game_handler(instances):
    class GameHandler(tornado.websocket.WebSocketHandler):
        def check_origin(self, origin):
            return True

        def open(self, socket_path):
            if socket_path not in instances:
                self.close()
                print(socket_path + "is invalid")
                return

            print("new connection to" + socket_path)

            self.car = car.Car(0, 0)
            self.path = socket_path
            self.inst = instances[socket_path]

            self.inst.add_player(self)

            self.send_message(json.loads(
                [id(player) for player in self.inst.players]
            ))

        def on_message(self, data):
            message = json.loads()

            if message["type"] == "update":
                self.car.mutex.aquire()

                self.car.set_throttle(message["thrust"])
                self.car.set_wtheta(message["angle"])
                self.car.set_brake(message["brake"])

                self.car.mutex.release()

        def on_close(self):
            if len(self.inst.players) == 0:
                del instances[self.path]
