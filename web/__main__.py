import tornado.ioloop
import tornado.web

from web import JoinHandler
from web import NewGameHandler

import os


if __name__ == "__main__":
    app = tornado.web.Application([
        (r"/new", NewGameHandler), (r"/(?P<gid>\w+)", JoinHandler),
        (r"/res/(.*)", tornado.web.StaticFileHandler,
         {"path": os.getcwd() + "/client/src/"})
    ])
    try:
        app.listen(8888)
        tornado.ioloop.IOLoop.current().start()
    except KeyboardInterrupt:
        print("server exited")
