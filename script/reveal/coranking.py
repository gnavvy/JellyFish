import numpy as np
np.set_printoptions(precision=4)
np.set_printoptions(threshold=1000)
np.set_printoptions(linewidth=1000)
np.set_printoptions(suppress=True)

import pandas as pd
pd.set_option('display.width', 1000)
pd.set_option('display.max_rows', 50)

from sklearn.neighbors import NearestNeighbors
from sklearn.manifold import TSNE, MDS, SpectralEmbedding, Isomap
from sklearn.metrics import jaccard_similarity_score


def jaccard(vec1, vec2):
    num_inter = np.intersect1d(vec1, vec2).shape[0]
    num_union = np.union1d(vec1, vec2).shape[0]
    return num_inter * 1.0 / num_union

if __name__ == '__main__':
    data_paths = {
        'wine': '../../data/wine.csv',
        'wdbc': '../../data/wdbc.csv',
        'simplex5': '../../data/simplex5.csv',
        'images': '../../data/images.csv',
        'parkinsons': '../../data/parkinsons.csv',
        'wiki': '../../data/wiki_ego_100.csv'
    }

    num_features = {
        'wine': 13,
        'wdbc': 30,
        'simplex5': 5,
        'images': 64,
        'wiki': 100
    }

    selected = 'wiki'

    df = pd.read_csv(data_paths[selected])

    features = df.iloc[:, :num_features[selected]].values
    n, m = features.shape
    k = 100
    # k = n-1

    projectors = {
        'TSNE': TSNE(),
        'MDS': MDS(),
        'Spectral': SpectralEmbedding(),
        'Isomap': Isomap()
    }

    for method in projectors.keys():
        embedding = projectors[method].fit_transform(features)
        minimum, maximum = np.min(embedding), np.max(embedding)

        df[method+'.x'] = (embedding[:, 0] - minimum) * 2 / (maximum - minimum) - 1
        df[method+'.y'] = (embedding[:, 1] - minimum) * 2 / (maximum - minimum) - 1
        df[method+'.x'] = df[method+'.x'].map(lambda x: '%.4f' % x)  # adjust precision
        df[method+'.y'] = df[method+'.y'].map(lambda y: '%.4f' % y)

        knn_hd = NearestNeighbors(n_neighbors=k+1).fit(features).kneighbors(features, return_distance=False)
        knn_ld = NearestNeighbors(n_neighbors=k+1).fit(embedding).kneighbors(embedding, return_distance=False)

        df[method+'.jaccard'] = [jaccard(knn_hd[i], knn_ld[i]) for i in range(n)]

    # print(df.iloc[:, num_features[selected]+1:])

    df.to_csv(data_paths[selected], index=False)
