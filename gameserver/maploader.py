import base64
import json
import struct


class MapLoader:
    def __init__(self, map_dir, mapper):
        self.map_dir = map_dir
        self.preload = {}
        self.mapper = mapper

    def get_map(self, name):
        if name not in self.preload:
            data = json.load(open(self.map_dir + "/" + name))["layers"][0]
            w = data["width"]
            h = data["height"]

            int_data = struct.unpack("{}I".format(
                w * h), base64.b64decode(data["data"]))

            array = []
            for x in range(w):
                array.append([])
                for y in range(h):
                    array[x].append(self.mapper[int_data[x * y]])

            self.preload[name] = array
        return self.preload[name]


STD_MAP = []


class TestMapper:
    def __getitem__(self, n):
        return (1.0, 1.0, 1.0)
