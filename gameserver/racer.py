import car2 as chosenCar
import collide
import threading


# Racer is a class to hold the car, as well as some world state about the car.
# It is designed to be able to be easy to switch back to car should we ever get the physics working


class Racer():
    def __init__(self, x, y, theta):
        self.car = chosenCar.Car(x, y, theta, 130, 130)

        # for game state
        self.lapCount = 0
        self.lapChecks = {}

        self.mutex = threading.Lock()

    def update(self, map, cars):
        self.mutex.acquire()
        # drive car
        try:
            surface = map["tiles"][int(self.car.pos[0])][int(
                self.car.pos[1])]
        except:
            print("car out of bounds at (%f, %f)" % self.car.pos)
            surface = (2, 1, 1)
        self.car.update(surface, cars)

        # hit map objects
        for collidable in map["collisions"]:
            if self.hits(collidable):
                print(collidable)
        self.mutex.release()

    def hits(self, rectangle):
        return isIntersectRectangles(getPoints(
            self.car.pos + self.car.size, self.car.theta), getPoints(rectangle, 0))
