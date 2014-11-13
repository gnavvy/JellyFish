import numpy as np
# np.set_printoptions(precision=4)
# np.set_printoptions(threshold=1000)
# np.set_printoptions(linewidth=1000)
# np.set_printoptions(suppress=True)

import pandas as pd
pd.set_option('display.width', 1000)
pd.set_option('display.max_rows', 50)

if __name__ == '__main__':
    data_paths = {
        'wine': '../../data/wine.csv',
        'wdbc': '../../data/wdbc.csv',
        'simplex5': '../../data/simplex5.csv',
        'images': '../../data/images.csv',
        'parkinsons': '../../data/parkinsons.csv'
    }

    num_features = {
        'wine': 13,
        'wdbc': 30,
        'simplex5': 5,
        'images': 64
    }

    selected = 'parkinsons'

    df = pd.read_csv(data_paths[selected])
    df = df.iloc[:, 1:-1]
    print(df)