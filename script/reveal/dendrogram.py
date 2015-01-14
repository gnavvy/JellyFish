import numpy as np
np.set_printoptions(precision=4)
np.set_printoptions(threshold=1000)
np.set_printoptions(linewidth=1000)
np.set_printoptions(suppress=True)

import pandas as pd
pd.set_option('display.width', 1200)
pd.set_option('display.max_rows', 50)

from sklearn.neighbors import NearestNeighbors
from sklearn.manifold import TSNE, MDS, SpectralEmbedding, Isomap

from scipy.cluster.hierarchy import linkage, dendrogram, to_tree, leaves_list
from scipy.spatial.distance import pdist, squareform


def inorder_traversal(root):
    stack = []
    node = root
    result = []
    while node is not None or len(stack) > 0:
        if node is not None:
            stack.append(node)
            node = node.left
        else:
            node = stack.pop()
            result.append(node.val)
            node = node.right
    return result


def get_parents(xs, ys):
    dist = squareform(pdist(zip(xs, ys), metric='euclidean'))
    node = to_tree(linkage(dist, method='single'), rd=False)

    # Do a preorder traversal, caching the result. To avoid having to do
    # recursion, we'll store the previous index we've visited in a vector.
    n_leaves = node.count

    n = self.count
    rootid = self.id

    currNode = [None] * (2 * n)
    lvisited = np.zeros((2 * n,), dtype=bool)
    rvisited = np.zeros((2 * n,), dtype=bool)
    currNode[0] = self
    k = 0
    preorder_paths = []
    path = []

    while k >= 0:
        node = currNode[k]
        ndid = node.id
        path.append(ndid)
        if node.is_leaf():
            preorder_paths.append(path)
            path = []
            k = k - 1
        else:
            if not lvisited[ndid]:
                currNode[k + 1] = node.left
                lvisited[ndid] = True
                k = k + 1
            elif not rvisited[ndid]:
                currNode[k + 1] = node.right
                rvisited[ndid] = True
                k = k + 1
            # If we've visited the left and right of this non-leaf
            # node already, go up in the tree.
            else:
                path.pop()
                k = k - 1

    print(len(node.pre_order()))
    exit()


def preorder(node, solution):
    if node is not None:
        preorder(node.left)
        preorder(node.right)


class Node(object):

    def __init__(self, id, left, right, x, y, parent):
        self.id = id
        self.left = left
        self.right = right
        self.x = x
        self.y = y
        self.parent = parent


if __name__ == '__main__':
    # 1. load data
    raw = pd.read_csv('../../data/wiki_ego_100.csv')
    xs = raw['TSNE.x']
    ys = raw['TSNE.y']
    df = pd.DataFrame(zip(xs, ys), columns=['x', 'y'])

    # 2. hierarchical clustering
    dist = squareform(pdist(df, metric='euclidean'))
    clusters = linkage(dist, method='single')
    root = to_tree(clusters, rd=False)

    solution = []
    stack = []
    node = root
    while node.get_left().is_leaf() or node.get_right().is_leaf() or len(stack) > 0:
        solution.append(node.get_id())
        stack.append(node)
        node = node.get_left()

    print(tree.get_id())

    # 3. calculate position for each node
