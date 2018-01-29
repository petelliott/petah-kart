import math


# takes in three points
# returns true if they are in counter clockwise order
def ccw(A, B, C):
    return (C[1] - A[1]) * (B[0] - A[0]) > (B[1] - A[1]) * (C[0] - A[0])


# takes in 4 tuples, representing the four points A, B, C, D
# determines returns true if the line segment A-B intersects with C-D
def isIntersectLines(A, B, C, D):
    return ccw(A, C, D) != ccw(B, C, D) and ccw(A, B, C) != ccw(A, B, D)


# takes in 2 tuples, representing two rectanges A and B
# each rectange is stored as a tuple of the four corners stored counterclockwise
# returns true if they intersect
def isIntersectRectangles(A, B):
    A_lines = [
        (A[0], A[1]),
        (A[1], A[2]),
        (A[2], A[3]),
        (A[3], A[0])
    ]

    B_lines = [
        (B[0], B[1]),
        (B[1], B[2]),
        (B[2], B[3]),
        (B[3], B[0])
    ]

    for a in A_lines:
        for b in B_lines:
            if isIntersectLines(a[0], a[1], b[0], b[1]):
                return True
    return False


# takes in a rectangle as a tuple in form (x, y, width, height) and an angle
# x and y are center of rectangle
# returns a tuple that is the four points in a clockwise order
def getPoints(r, angle):
    s = math.sin(angle)
    c = math.cos(angle)
    a = (((-r[2] / 2), (-r[3] / 2)),    # bottom left
         ((r[2] / 2), (-r[3] / 2)),      # bottom right
         ((-r[2] / 2), (r[3] / 2)),      # top right
         ((r[2] / 2), (r[3] / 2)))       # top left

    return tuple([(p[0] * c - p[1] * s + r[0], p[0] * s + p[1] * c + r[1]) for p in a])


def hit_cars(car1, car2):
    '''
    returns true if there is collision of cars else false
    '''
    return isIntersectRectangles(getPoints(car1.pos + car1.size, car1.theta), getPoints(car2.pos + car2.size, car2.theta))


def collide(car1, car2):
    """Applies the force of collisions on cars"""
    pass
