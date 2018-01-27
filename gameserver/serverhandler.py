import instance


def get_new_server(instances):
    class ServerHandler(tornado.web.RequestHandler):
        def put(self, path):
            message = json.loads(self.request.body.decode("utf-8"))
            if path in instances:
                self.set_status(304, "instance already exists")
                return

            instances[path] = instance.Instance(None)

            instances[path].run_loop()
            self.set_status(201)

     return ServerHandler
