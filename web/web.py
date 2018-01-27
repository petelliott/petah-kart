import tornado.ioloop
import tornado.web
import json


class JoinHandler(tornado.web.RequestHandler):
    def get(self):
        return True


class NewGameHandler(tornado.web.RequestHandler):
    def post(self):

        data = tornado.escape.json_decode(self.request.body)
        map_id = data["map"]
        num_player = data["player_count"]
        # TODO send to game server
        self.write("awedfc")  # TODO send the actual link


if __name__ == "__main__":
    app = tornado.web.Application(
        [(r"/join", JoinHandler), (r"/new", NewGameHandler)])
    try:
        app.listen(8888)
        tornado.ioloop.IOLoop.current().start()
    except KeyboardInterrupt:
        print("server exited")
