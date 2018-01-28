import instance
import json
import tornado.web


def new_server_handler(instances, map_loader):
    class ServerHandler(tornado.web.RequestHandler):
        def put(self, path):
            message = json.loads(self.request.body.decode("utf-8"))
            if path in instances:
                self.set_status(304, "instance already exists")
                self.finish()
                return

            instances[path] = instance.Instance(map_loader.get_map(message["map"]))
            instances[path].run_loop()

            self.set_status(201)
            self.finish()

    return ServerHandler
