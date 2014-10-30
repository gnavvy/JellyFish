import numpy as np

"""Given normalized data, it calculate the linearly optimized correlation related angles"""


# Calculate the correlation matrix, with left-down part zeros.
def correlationM(data):
    data = np.array(data)
    avag = [0]
    num0 = len(data)
    num1 = len(data[0])
    for i in range(num0):
        avag = map(
            lambda x, y: x + y, data[i], avag if not avag == [0] else avag * len(data[0]))

    # calculate the average value array
    avag = map(lambda x: x / float(num0), avag)

    # print avag

    corrM = np.zeros([num1, num1])

    for i in range(num1):
        corrM[i, i] = 1

    for i in range(num1 - 1):
        for j in range(i + 1, num1):
            corrM[i, j] = sum((data[:, i] - avag[i]) * (data[:, j] - avag[j])) / np.sqrt(
                sum((data[:, i] - avag[i]) ** 2) * sum((data[:, j] - avag[j]) ** 2))

    return corrM


def sortCorr(corrM):
    num = len(corrM)
    first_row = [0] * num
    for i in range(num):
        first_row[i] = [i, corrM[0, i]]

    first_row.sort(key=lambda d: d[1], reverse=True)
    index = np.array(first_row)[:, 0]
    index = map(int, index)
    # print index
    corrM_buf = np.zeros([num, num])
    corrM_buf[index] = corrM
    corrM[:, index] = corrM_buf

    return index


def angle(data, percentage=10):

    subset = range(0, len(data), len(data) * percentage / 100) + [len(data)]
    if subset[1] < 2:
        # Still not used by now
        print "only one data point in each section, considering change the percentage? y/n : "

    m = len(data[0])

    results = {"axes": []}

    for i in range(m):
        results["axes"].append({"c": i, "w": 3, "data": {0.0: 0}})
    print results

    # Define matrix B
    B = -np.ones([m - 1, m - 1])
    for i in range(m - 1):
        B[i, i] = m - 1

    for i in subset[1:]:

        corrM = correlationM(data[:i])
        # The index will be used to sort the data matrix. For future
        # convenience, we should try out best not to use sorted correlation
        # matrix
        index = sortCorr(corrM)

        A = -np.arccos(corrM)

        for j in range(1, m):
            A[j, 0:j] = -A[0:j, j]
        vec = np.sum(A, axis=1)
        vec = vec[1:]
        angles = np.linalg.solve(B, vec)

        axis_point = float(i) / len(data)
        #axis_point="%.1f" % axis_point
        results["axes"][0]["data"][axis_point] = 0
        print axis_point
        print angles
        for j in range(len(angles)):
            results["axes"][j + 1]["data"][axis_point] = angles[j] / np.pi

    return results
