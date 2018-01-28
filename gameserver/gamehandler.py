import car2 as car
import json
import tornado.websocket


def new_game_handler(instances):
    """
    returns the game handler with a reference to the instance list
    """
    class GameHandler(tornado.websocket.WebSocketHandler):
        def check_origin(self, origin):
            return True

        def open(self, socket_path):
            if socket_path not in instances:
                self.close()
                print(socket_path + " is invalid")
                return

            print("new connection to " + socket_path)

            self.car = car.Car(0, 0, 0)
            self.path = socket_path
            self.inst = instances[socket_path]

            self.inst.add_player(self)

        def on_message(self, data):
            try:
                message = json.loads(data)
            except:
                print(data)

            if message["type"] == "update":
                self.car.mutex.acquire()

                self.car.set_throttle(message["thrust"])
                self.car.set_wtheta(message["angle"])
                self.car.set_brake(message["brake"])

                self.car.mutex.release()

        def on_close(self):
            if len(self.inst.players) == 0:
                del instances[self.path]

            print("a client left", self.path)

    return GameHandler
