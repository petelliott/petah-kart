import tornado.ioloop
import tornado.web

from web import JoinHandler
from web import NewGameHandler
from web import StaticUIHandler

import os


if __name__ == "__main__":
    app = tornado.web.Application([
        (r"/new", NewGameHandler), (r"/game/(?P<gid>\w+)", JoinHandler),
        (r"/game/res/(.*)", tornado.web.StaticFileHandler,
         {"path": os.getcwd() + "/client/src/"}),
        (r"/(.*)", StaticUIHandler,
         {"path": os.getcwd() + "/client/src/UIUX/"})
    ])
    try:
        app.listen(8888)
        tornado.ioloop.IOLoop.current().start()
    except KeyboardInterrupt:
        print("server exited")
