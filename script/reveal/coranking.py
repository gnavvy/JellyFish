__author__ = 'ywang'

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


if __name__ == '__main__':
    data_paths = {
        'wine': '../../data/wine.csv'
    }

    df = pd.read_csv(data_paths['wine'])

    features = df.iloc[:, :13].values
    n, m = features.shape
    k = 7

    projectors = {
        'TSNE': TSNE(),
        'MDS': MDS(),
        'Spectral': SpectralEmbedding(),
        'Isomap': Isomap()
    }

    for method in projectors.keys():
        embedding = projectors[method].fit_transform(features)
        df[method+'.x'] = embedding[:, 0] / np.linalg.norm(embedding)
        df[method+'.y'] = embedding[:, 1] / np.linalg.norm(embedding)
        df[method+'.x'] = df[method+'.x'].map(lambda x: '%.4f' % x)  # adjust precision
        df[method+'.y'] = df[method+'.y'].map(lambda y: '%.4f' % y)

        _, knn_hd = NearestNeighbors(n_neighbors=k+1).fit(features).kneighbors(features)
        _, knn_ld = NearestNeighbors(n_neighbors=k+1).fit(embedding).kneighbors(embedding)
        df[method+'.jaccard'] = [jaccard_similarity_score(knn_hd[i], knn_ld[i]) for i in range(n)]

    print(df)

    df.to_csv(data_paths['wine'], index=False)
