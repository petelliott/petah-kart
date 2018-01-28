import math

PI = math.pi
car_width, car_height = float


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


def cars_close(car1x, car1y, car2x, car2y):
    '''
    returns if two cars are close together
    '''
    return (car1x - car2x)**2 + (car1y - car1y)**2 <= 2 * (((car_width / 2) + (car_height / 2))**2)


def is_bang(car1x, car1y, car1_rotation, car2x, car2y, car2_rotation):
    '''
    check to see if two cars have hit each other
    '''
    collision = False

    # if cars are close then proceeed
    if cars_close:
        # car one in car 2
        tmpcar1 = rotate_about(car1x, car1y, -car1_rotation, car1x, car1y)
        tmpcar2 = rotate_about(car2x, car2y, -car1_rotation, car1x, car2x)
        if corners_in_box():
            collision = True

        # car two in car 1
        tmpcar2 = rotate_about(car2x, car2y, -car2_rotation, car2x, car2y)
        tmpcar1 = rotate_about(car1x, car1y, -car2_rotation, car2x, car2x)
        if corners_in_box():
            collision = True

    return collosion
