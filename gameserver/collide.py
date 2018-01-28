import math

PI = math.pi

car_width = 10 #random number

car_height = 10 #random number
#car_points = [[10,10],[8,8],[-5,5],[11,9]]

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


    ytop = (car_height//2)
    ybottom = -(car_height//2)

    xright = (car_width//2)
    xleft = -(car_width//2)



    for i in car_points:
        if (i[0] <= xright) and (i[0] >= xleft) and (i[1] <= ytop) and (i[1] >= ybottom):
            return True
        else:
            return False

def cars_close():

def is_bang():
    '''
    check to see if two cars have hit each other
    '''
    return False
