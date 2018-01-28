import tornado.web
import tornado.ioloop
import sys

from gamehandler import new_game_handler
from serverhandler import new_server_handler
import maploader

if __name__ == "__main__":
    instances = {}

    map_dir = sys.argv[1]

    GameHandler = new_game_handler(instances)
    ServerHandler = new_server_handler(instances, maploader.MapLoader(map_dir, maploader.STD_MAP))

    application = tornado.web.Application([
        (r"/control/(?P<path>\w+)", ServerHandler),
        (r"/game/(?P<socket_path>\w+)", GameHandler)
    ])

    application.listen(8001)
    tornado.ioloop.IOLoop.current().start()
