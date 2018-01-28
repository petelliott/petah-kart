import tornado.web
import tornado.ioloop

from gamehandler import new_game_handler
from serverhandler import new_server_handler

if __name__ == "__main__":
    instances = {}

    GameHandler = new_game_handler(instances)
    ServerHandler = new_server_handler(instances)

    application = tornado.web.Application([
        (r"/control/(?P<path>\w+)", ServerHandler),
        (r"/game/(^[/]*)", GameHandler)
    ])

    application.listen(8001)
    tornado.ioloop.IOLoop.current().start()
