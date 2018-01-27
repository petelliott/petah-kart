import tornado
import json


class JoinHandler(tornado.web.RequestHandler):
    def get(self):
        return True


class NewGameHandler(tornado.web.RequestHandler):
    def post(self):
        data = json.loads(self.request.body)
        map_id = data["map"]
        num_player = data["player_count"]
        # TODO send to game server
        return True


if __name__ == "__main__":
    app = tornado.web.Application(
        [(r"/join", JoinHandler), (r"/new", NewGameHandler)])
    try:
        app.listen(8888)
        tornado.ioloop.IOLoop.current().start()
    except KeyboardInterrupt:
        print("server exited")
