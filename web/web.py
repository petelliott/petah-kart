import tornado
import json


class JoinHandler(tornado.web.RequestHandler):
    def get(self):
        return True


class NewGameHandler(tornado.web.RequestHandler):
    def post(self):
        return True


if __name__ == "__main__":
    app = tornado.web.Application(
        [(r"/join", JoinHandler), (r"/new", NewGameHandler)])
    try:
        app.listen(8888)
        tornado.ioloop.IOLoop.current().start()
    except KeyboardInterrupt:
        print("server exited")
