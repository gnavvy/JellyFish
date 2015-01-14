import numpy as np
np.set_printoptions(precision=4)
np.set_printoptions(threshold=1000)
np.set_printoptions(linewidth=1000)
np.set_printoptions(suppress=True)

import pandas as pd
pd.set_option('display.width', 1200)
pd.set_option('display.max_rows', 10)
pd.set_option('display.max_columns', 30)

from sklearn.neighbors import NearestNeighbors
from sklearn.manifold import TSNE, MDS, SpectralEmbedding, Isomap


def jaccard(vec1, vec2):
    num_inter = np.intersect1d(vec1, vec2).shape[0]
    num_union = np.union1d(vec1, vec2).shape[0]
    return num_inter * 1.0 / num_union


def get_dendrogram():
    from scipy.cluster.hierarchy import linkage, dendrogram, to_tree

    # 1. load data
    raw = pd.read_csv('../../data/wiki_ego_100.csv')
    xs = raw['TSNE.x']
    ys = raw['TSNE.y']
    df = pd.DataFrame(zip(xs, ys), columns=['x', 'y'])

    # 2. hierarchical clustering
    from scipy.spatial.distance import pdist, squareform
    dist = squareform(pdist(df, metric='euclidean'))
    clusters = linkage(dist, method='single')
    tree = to_tree(clusters, rd=False)

    # 3. nested dict for json serializtion
    def add_node(node, parent):
        # 3.1 First create the new node and append it to its parent's children
        newNode = dict(node_id=node.id, children=[])
        parent['children'].append(newNode)
        # Recursively add the current node's children
        if node.left:
            add_node(node.left, newNode)
        if node.right:
            add_node(node.right, newNode)

    # 4. construct the tree
    d3dendro = dict(name='root', children=[])
    add_node(tree, d3dendro)

    # 5. label the tree
    def label_tree(node):
        if len(node['children']) == 0:
            leaf_names = [node['node_id']]
        else:
            leaf_names = reduce(lambda ls, c: ls + label_tree(c), node['children'], [])
        del node['node_id']
        node['name'] = name = '-'.join(sorted(map(str, leaf_names)))

        return leaf_names

    label_tree(d3dendro['children'][0])

    # 6. output to json
    import json
    json.dump(d3dendro, open('d3d.json', 'w'), sort_keys=True, indent=4)

    # print d3dendro


if __name__ == '__main__':
    get_dendrogram()
    exit()

    df = pd.read_csv('../../data/wiki_ego_100.csv')
    knn = df.ix[:2, -100:]

    import json
    print(knn.to_json(orient='split')['data'])
