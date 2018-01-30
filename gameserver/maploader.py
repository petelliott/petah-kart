import base64
import json
import struct


class MapLoader:
    """
    map loader handles acess to json tmx files in map_dir
    and allows access to them as a 2d array of surface tuples
    repeated file acesses are cached
    """

    def __init__(self, map_dir, mapper):
        self.map_dir = map_dir
        self.preload = {}
        self.mapper = mapper

    def get_map(self, name):
        if name not in self.preload:
            data = json.load(open(self.map_dir + "/" + name))
            w = data["width"]
            h = data["height"]

            array = []
            checks = []
            col = []
            for layer in data["layers"]:
                if layer["name"] == "background":
                    int_data = struct.unpack("{}I".format(
                        w * h), base64.b64decode(layer["data"]))

                    for x in range(w):
                        array.append([])
                        for y in range(h):
                            array[x].append(self.mapper[int_data[x * y]])
                elif layer["name"] == "track":
                    pass  # i think this is just decorations
                elif layer["name"] == "collisions":
                    col = [(obj['x'], obj["y"], obj['width'], obj["height"])
                           for obj in layer["objects"]]
                elif layer["name"] == "checkpoints":
                    checks = [((obj['x'] + obj["polyline"][0]["x"], obj['y'] + obj["polyline"][0]["y"]),
                               (obj['x'] + obj["polyline"][1]["x"], obj['y'] + obj["polyline"][1]["y"])) for obj in layer["objects"]]

            self.preload[name] = {"width": w, "height": h, "tile_size": data["tileheight"], "tiles": array,
                                  "checkpoints": checks, "collisions": col}

        print(col)
        return self.preload[name]


STD_MAP = []


class TestMapper:
    def __getitem__(self, n):
        return (2.0, 1.0, 0.1)
