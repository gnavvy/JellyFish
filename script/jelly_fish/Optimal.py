import half_circle as hc
import numpy as np
import minimize
import os
# from scipy.optimize import minimize
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
        # res = minimize(
        #     func, x0, method='BFGS', options={'gtol': 1e-3, 'disp': True})

        # angle_buf = res.x
        # print angle_buf

        # Self-defined BFGS method
        angle_buf = minimize.BFGS(func, x0, tol=1e-3)

        if func(angle_buf) < func(angle):
            angle = angle_buf - angle_buf[0]
        for j in range(len(angle)):
            if angle[j] < 0:
                angle[j] = angle[j] % (2 * np.pi) + 2 * np.pi

            else:
                angle[j] = angle[j] % (2 * np.pi)

    return angle


def rotate(*args):
    results = np.array(args[0])
    n = len(results)
    m = len(results[0])

    def func(offset):
        variance_sum = 0
        for i in range(m):
            temp = (results[:, i] + offset) % (2 * np.pi)
            temp = (temp + 2 * np.pi) % (2 * np.pi)
            # Calculate variance of periodic angles
            variance = 0
            for ind1 in range(n - 1):
                for ind2 in range(ind1 + 1, n):
                    if abs(temp[ind1] - temp[ind2]) > np.pi:
                        variance += (2 * np.pi -
                                     abs(temp[ind1] - temp[ind2])) ** 2
                    else:
                        variance += abs(temp[ind1] - temp[ind2]) ** 2

            variance = variance / (n ** 2)
            variance_sum += variance
        variance_sum = variance_sum / m
        return variance_sum

    rotate_angles = minimize.BFGS(func, np.zeros(n), tol=1e-3)

    for i in range(n):
        results[i] = (results[i] + rotate_angles[i]) % (2 * np.pi)
        for j in range(m):
            results[i, j] = results[i, j] if results[
                i, j] > 0 else results[i, j] + 2 * np.pi

    return results


def angles(data, percentage):
    subset = range(0, len(data), len(data) * percentage / 100) + [len(data)]
    if subset[1] < 2:
        # Still not used by now
        print "only one data point in each section, considering change the percentage? y/n : "

    m = len(data[0])
    angles = []
    print "Start calculating original angles without rotation..."
    if (os.path.isfile('angles.txt')):

        angles = np.loadtxt('angles.txt')
    else:
        for i in subset[1:]:
            print i

            angles.append(initial_angle(data[:i]))

    print "Rotating angles ..."

    # For debugging usage
    # np.savetxt('angles.txt', angles, fmt='%.5e', delimiter=' ', newline='\n')

    ####
    angles = rotate(angles)
    print "Writing angles to profile"
    results = {"axes": []}

    for i in range(m):
        results["axes"].append({"c": i, "w": 3, "data": {0.0: 0}})

    for i in range(len(subset) - 1):

        axis_point = float(subset[i + 1]) / len(data)

        # print axis_point
        # raise

        for j in range(m):
            results["axes"][j]["data"][axis_point] = angles[i, j] / np.pi

    return results
