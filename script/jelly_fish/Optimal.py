import half_circle as hc
import numpy as np

from scipy.optimize import minimize
# Used Newton_CG of this function. Thinking of rewrite a minimization function


def initial_angle(data):
    """Give the inital angle of the optimal results"""

    corrM = hc.correlationM(data)

    num = len(corrM)

    def func(x):
        """Define the minimization function with angle array and correlation matrix """

        delta_sum = 0

        for i in range(num - 1):
            for j in range(i + 1, num):
                delta_sum = delta_sum + \
                    (np.cos(x[i] - x[j]) - corrM[i, j]) ** 2

        return delta_sum

    angle = [0] * num

    for i in range(num):
        # corrM[i, :(i + 1)] = corrM[:(i + 1), i]
        buff = corrM[:(i + 1), i]
        x0 = np.append(np.arccos(buff[:-1]), np.arccos(corrM[i, i:]))
        # print x0[:(i + 1)]
        res = minimize(
            func, x0, method='BFGS', options={'gtol': 1e-3, 'disp': False})

        angle_buf = res.x
        # print angle_buf

        if func(angle_buf) < func(angle):
            angle = angle_buf - angle_buf[0]
        for j in range(len(angle)):
            angle[j] = angle[j] % np.pi

    return angle


def angles(data, percentage):
    subset = range(0, len(data), len(data) * percentage / 100) + [len(data)]
    if subset[1] < 2:
        # Still not used by now
        print "only one data point in each section, considering change the percentage? y/n : "

    m = len(data[0])

    results = {"axes": []}

    for i in range(m):
        results["axes"].append({"c": i, "w": 3, "data": {0.0: 0}})

    for i in subset[1:]:

        angle = initial_angle(data[:i])

        axis_point = float(i) / len(data)

        print axis_point
        print angle
        for j in range(len(angle)):
            results["axes"][j]["data"][axis_point] = angle[j] / np.pi

    return results
