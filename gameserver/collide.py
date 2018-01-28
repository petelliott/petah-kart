import math

PI = math.pi


def rotate_pair(x, y, rads):
    return [x * math.cos(rads) - y * math.sin(rads),
            x * math.sin(rads) + y * math.cos(rads)]


def rotate_about(x, y, rads, originX, originY):
    cats = rotate_pair(x - originX, y - originY, rads)
    return [cats[0] + originX, cats[1] + originY]


def corners_in_box():
    '''
    check to see if a point is in a box
    '''
    return False

def cars_close():

def is_bang():
    '''
    check to see if two cars have hit each other
    '''
    return False
