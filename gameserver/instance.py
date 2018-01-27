

class Instance:
    def __init__(self, surface_map):
        self.map = surface_map
        self.cars = []
        self.alive = True

    def add_car(self, car):
        self.cars.append(car)

    def loop():
        while self.alive:
            for car in cars:
                surface = self.map[x][y]
                car.update(surface)

    def kill(self):
        self.alive = False
