__author__ = 'ywang'

import logging
logging.basicConfig(
    format='%(asctime)s : %(levelname)s : %(message)s', level=logging.INFO)

from time import strftime

from gensim import corpora, models
from scipy.spatial.distance import hamming

import numpy as np
np.set_printoptions(threshold='nan')

import pandas as pd

from nearpy.hashes import RandomBinaryProjections
from nearpy import Engine


def hamming_dist(bits1, bits2, n_bits):
    code1 = np.array([bit == '1' for bit in bits1])
    code2 = np.array([bit == '1' for bit in bits2])
    normalized_hamming_dist = hamming(code1, code2)
    return int(normalized_hamming_dist * n_bits)


def index():
    n_bits = 5
    lshash = RandomBinaryProjections('lda', n_bits)

    engine = Engine(dim=100, lshashes=[lshash])
    lda = models.LdaModel.load('../../data/lda.100.model')
    corpus = corpora.MmCorpus('../../data/wiki_tfidf_ego_100.mm')

    # hash each document into LSH storage
    for idx in xrange(len(corpus)):
        entry = [val for _, val in lda.__getitem__(corpus[idx], eps=0)]
        engine.store_vector(np.array(entry), data=idx)

    buckets = engine.storage.buckets['lda']
    keys = np.array(buckets.keys())
    n_keys = keys.shape[0]

    # create a temporary data frame to construct distance histogram
    pdfs = pd.DataFrame(np.zeros(shape=(n_keys, n_bits)), index=keys)
    pdfs['size'] = [len(buckets[key]) for key in keys]

    # pdfs   0  1  2  3  4  size
    # 10000  0  0  0  0  0    19
    # 10001  0  0  0  0  0    23
    # 10101  0  0  0  0  0    12
    # ...

    # aggregate bucket sizes to distance histogram for each hash key
    for i in xrange(n_keys):
        for j in xrange(n_keys):
            if i != j:  # not same bucket
                d = hamming_dist(pdfs.index[i], pdfs.index[j], n_bits)
                pdfs.ix[pdfs.index[i], d - 1] = pdfs.values[i, d - 1] + pdfs.values[j, -1]

    # pdfs     0    1    2    3    4  size
    # 10000  110  422  268  178   13    19
    # 10001  160  240  412  128   47    23
    # 10101  160  321  200  286   31    12
    # ...

    # create a hash table to store the binary hash keys for each point
    hash_indices = {}
    for key in keys:
        for point in buckets[key]:
            hash_indices[point[1]] = pdfs.loc[key].values[:-1]

    print(hash_indices)
    exit()

    import csv
    with open('../../data/wiki_pdfs.csv', 'wb') as f:
        w = csv.DictWriter(f, hash_indices.keys())
        w.writeheader()
        w.writerow(hash_indices)

    # pdfs_new = pd.DataFrame(hash_indices.values(), index=hash_indices.keys())

    print('done')


def main():
    index()


if __name__ == '__main__':
    main()
