'''
give time
save time
update position and velocity based on acc

'''
import time
import math

MASS = 0
WHEEL_BASE = 0
MAX_SPEED = 0
GRAVITY = 9.81
BREAK_STATE = False


class Car:
    def __init__(self, x, y, theta):
        self.last_time = time.time()

        self.x = x
        self.y = y
        self.theta = theta

        self.vx = 0.0
        self.vy = 0.0
        self.vtheta = 0.0

        self.wtheta = 0.0
        self.throttle = 0.0

    def tangent_cart(self,force):
        return (math.hypot((cos(self.theta)*force[0]),(sin(self.theta)*force[1])),math.hypot((sin(self.theta)*force[0]),(cos(self.theta)*force[1])))

    def tangent_vel(self):# out: tuple [tangent_vel, normal_vel]
        return (math.hypot((cos(self.theta)*self.vx),(sin(self.theta)*self.vy)),math.hypot((sin(self.theta)*self.vx),(cos(self.theta)*self.vy)))

    def get_radius(self):
        return WHEEL_BASE/tan(wtheta)

    def set_wtheta(self, wtheta):
        self.wtheta = wtheta

    def set_throttle(self, throttle):
        self.throttle = throttle

    def check_slip(self,surface):
        if (MASS*GRAVITY*surface[0]) < MASS*(tangent_vel()[0]**2)/get_radius():
            return True
        else:
            return False

    def get_rotation(self,surface):#angular acc
        #calculate moment
        return (WHEEL_BASE/(2*MASS))*(get_force(surface)[0])

    def get_force(self,surface):#out: tuple (normal,tangential)
        #calculate force
        velocity = tangent_vel()
        normal = ((velocity[0]**2)*sin(wtheta)/WHEEL_BASE*(1+surface[2]))*MASS
        tangential = (self.throttle-(MASS*(velocity[0]**2)*tan(wtheta)*sin(wtheta)*(1 + surface[2])/WHEEL_BASE)
        return (normal,tangential)

    def update(self,surface):#(us, uk, rr)
        call_time = time.time()
        delta = call_time - self.last_time
        self.last_time = time.time()

        rotation = get_rotation(surface)
        accel = tangent_cart(get_force(surface))/MASS #(ax,ay)

        self.vtheta = self.vtheta + (rotation*delta)
        self.theta = self.theta + (self.vtheta*delta)-((delta**2)*rotation/2)

        self.vx = self.vx + (accel[0]*delta)
        self.vy = self.vy + (accel[1]*delta)
        self.x = self.x + (self.vx*delta)-((delta**2)*accel[0]/2)
        self.y = self.y + (self.vy*delta)-((delta**2)*accel[1]/2)
