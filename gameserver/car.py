

class Car:
    def __init__(self, x, y, theta):
        self.x = x
        self.y = y
        self.theta = theta

        self.vx = 0.0
        self.vy = 0.0
        self.vtheta = 0.0
        
        self.wtheta = 0.0
        self.throttle = 0.0

    def set_wtheta(self, wtheta):
        self.wtheta = wtheta

    def set_throttle(self, throttle):
        self.throttle = throttle
