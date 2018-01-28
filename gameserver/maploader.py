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
            checkpoints = []
            impassables = []
            map_data = {"tiles": array, "checkpoints": checkpoints,
                        "impassables": impassables}

            self.preload[name] = array
        return self.preload[name]


STD_MAP = []


class TestMapper:
    def __getitem__(self, n):
        return (2.0, 1.0, 0.1)
