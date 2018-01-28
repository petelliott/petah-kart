import math

PI = math.pi
car_width = 130  # random number
car_height = 130  # random number


def rotate_pair(x, y, rads):
    return [x * math.cos(rads) - y * math.sin(rads),
            x * math.sin(rads) + y * math.cos(rads)]


def rotate_about(x, y, rads, originX, originY):
    cats = rotate_pair(x - originX, y - originY, rads)
    return [cats[0] + originX, cats[1] + originY]


def corners_in_box(carx, cary, car_points):
    '''
    check to see if a point is in a box
    '''
    ytop = (car_height / 2) + cary
    ybottom = -(car_height / 2) + cary

    xright = (car_width / 2) + carx
    xleft = -(car_width / 2) + cary
    for i in car_points:
        if (i[0] <= xright) and (i[0] >= xleft) and (i[1] <= ytop) and (i[1] >= ybottom):
            # print('ding')
            return True
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
        tmpcar2 = rotate_about(car2x, car2y, -car1_rotation, car1x, car1y)
        point_list = []
        point_list.append(
            (tmpcar2[0] + car_width / 2, tmpcar2[1] - car_height / 2))
        point_list.append(
            (tmpcar2[0] + car_width / 2, tmpcar2[1] + car_height / 2))
        point_list.append(
            (tmpcar2[0] - car_width / 2, tmpcar2[1] - car_height / 2))
        point_list.append(
            (tmpcar2[0] - car_width / 2, tmpcar2[1] + car_height / 2))
        # print(point_list)
        if corners_in_box(tmpcar1[0], tmpcar1[1], point_list):
            collision = True

        # car two in car 1
        tmpcar1 = rotate_about(car1x, car1y, -car2_rotation, car2x, car2y)
        tmpcar2 = rotate_about(car2x, car2y, -car2_rotation, car2x, car2y)
        point_list = []
        point_list.append(
            (tmpcar1[0] + car_width / 2, tmpcar1[1] - car_height / 2))
        point_list.append(
            (tmpcar1[0] + car_width / 2, tmpcar1[1] + car_height / 2))
        point_list.append(
            (tmpcar1[0] - car_width / 2, tmpcar1[1] - car_height / 2))
        point_list.append(
            (tmpcar1[0] - car_width / 2, tmpcar1[1] + car_height / 2))
        # print(point_list)
        if corners_in_box(tmpcar2[0], tmpcar2[1], point_list):
            collision = True

    return collision

def hit_cars(car1, car1):
    '''
    is_bang but with car objects instead 
    '''
    return True
