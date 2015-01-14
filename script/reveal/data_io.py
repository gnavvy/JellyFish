import numpy as np
np.set_printoptions(precision=4)
np.set_printoptions(threshold=1000)
np.set_printoptions(linewidth=1000)
np.set_printoptions(suppress=True)

import pandas as pd
pd.set_option('display.width', 1000)
pd.set_option('display.max_rows', 50)

from scipy.optimize import minimize

def optimize(data):
    def minimize_func(a):
        delta_sum = 0
        for i in range(a.shape[0]-1):
            for j in range(i + 1, a.shape[0]):
                delta_sum += (np.cos(a[i] - a[j]) - corrMatrix[i, j]) ** 2
        return delta_sum

    corrMatrix = np.corrcoef(data.T)
    angleMatrix = np.arccos(corrMatrix)

    m = corrMatrix.shape[0]
    angle = np.zeros(m)
    for k in range(m):
        res = minimize(minimize_func, angleMatrix[k], method='BFGS', options={'gtol': 1e-3, 'disp': True})
        angle_curr = res.x

        if minimize_func(angle_curr) < minimize_func(angle):
            angle = angle_curr - angle_curr[0]
        angle = (angle + np.pi) % (np.pi * 2) - np.pi

    ratio = angle / np.pi

    print(ratio)
    return angle


def angles(data, percentage=0):
    optimize(data[:100])


if __name__ == '__main__':

    data_paths = {
        'wine': '../../data/wine.csv',
        'wdbc': '../../data/wdbc.csv',
        'simplex5': '../../data/simplex5.csv',
        'images': '../../data/images.csv',
        'parkinsons': '../../data/parkinsons.csv'
    }

    selected = 'parkinsons'

    df = pd.read_csv(data_paths[selected])
    df = df.iloc[:, 1:-1]

    angles(df.values)