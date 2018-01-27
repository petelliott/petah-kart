import tornado
import json


class MainHandler(tornado.web.RequestHandler):

    def get(self):
        return True

    def post(self):
        return True


if __name__ == "__main__":
    app = tornado.web.Application([(r"/", MainHandler), ])
    try:
        app.listen(8888)
        tornado.ioloop.IOLoop.current().start()
    except KeyboardInterrupt:
        print("server exited")
