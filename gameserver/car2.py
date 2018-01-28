import math
import threading

MAX_SPEED = 2
ACCEL_CURVE = 1
MASS = 1
DUMB_CONST = 1


class Car2:
    def __init__(self, x, y, theta):
        self.pos = (x, y)
        self.theta = theta

        self.vel = (0.0, 0.0)
        self.vtheta = 0.0

        self.brakes = 0.0
        self.wtheta = 0.0
        self.throttle = 0.0

        self.mutex = threading.Lock()


    def throttle_curve(self):
        return MAX_SPEED - (1 / self.throttle) * ACCEL_CURVE


    def update(self, surface):  # (us, uk, rr)
        self.mutex.acquire()

        call_time = time.time()
        delta = call_time - self.last_time
        self.last_time = time.time()

        t = self.throttle_cuve()
        b = self.throttle_curve()  # TODO: add brake curve
        fv = (
            (t-b-surface[2]) * math.cos(self.theta),
            (t-b-surface[2]) * math.sin(self.theta)
        )

        self.pos = (
            self.pos[0] + delta * self.vel[0] + .5 * (fv[0]/MASS) * delta**2,
            self.pos[1] + delta * self.vel[1] + .5 * (fv[1]/MASS) * delta**2
        )

        self.vel = (
            self.vel[0] + (fv[0]/MASS) * delta,
            self.vel[1] + (fv[1]/MASS) * delta
        )

        vel = math.sqrt(self.vel[0]**2 + self.vel[1]**2)

        self.theta = self.theta + self.wtheta * vel * DUMB_CONST

        self.mutex.release()
