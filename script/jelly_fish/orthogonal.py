import numpy as np
from numpy.linalg import svd

"""Used nparray_like objects as the returned results"""


def initial_axis(data):

    # Calculate the PCA eigenvector matrix, V.H is the array_like matrix
    data = np.array(data)
    U, s, V = svd(data, compute_uv=1)

    # Get the first two colomn of V.H, and apply it as axis coordinates
    axis = np.transpose(V[:2, :])

    m = len(data[0])

    # Calculate the data matrix, just like half_circle
    results = {"axes": []}

    for i in range(m):
        results["axes"].append({"c": i, "w": 3, "data": {0.0: 0}})
        results["axes"][i][1.0] = {'x': axis[i, 0], 'y': axis[i, 0]}

    # print results

    return results

# Get the projection and also give the updated the projeciton results,
# with updated one-axis information


def projection(data=[], axis=[], upload=False):

    # If the projection is stored. The projection data would be restored from
    # file, need to be modified
    if upload:
        # To be revised
        return np.loadtxt('../../data/parkinson_projection.csv')

    # if no data or no axis, return 0, as False
    if not data or not axis:
        return 0

    # The initial projection, so the axis would be a n*2 matrix. The returned
    # matrix would be n*2 dimensions. Return the initial projection matrix
    if len(axis) > 2:
        return np.dot(data, axis)

    # Update the projection when one axis is moved, with
    # axis[0]=[axis_number,0], axis[1]= delta_position (moved position)
    elif len(axis[0]) == 2:
        axis_num = axis[0, 0]
        # Calculate the changed position of projection,
        # get the axis_number coloum of data, and
        # multiply it with changed position of this axis: m*1 by 1*2
        return np.dot(data[:, axis_num], axis[1])
