__author__ = 'ywang'

from gevent import monkey
monkey.patch_all()

from flask import Flask, render_template
from flask.ext.socketio import SocketIO, emit

# from flask.ext.s.ext.socketio import SocketIO
app = Flask(__name__)
socketio = SocketIO(app)

import numpy as np
np.set_printoptions(precision=4)
np.set_printoptions(threshold=1000)
np.set_printoptions(linewidth=1000)
np.set_printoptions(suppress=True)

import pandas as pd
pd.set_option('display.width', 1000)
pd.set_option('display.max_rows', 50)


@app.route('/')
def index():
    return render_template('index.html')


@socketio.on('matrix:mouted')
def get_matrix_data():
    # df = pd.read_csv('data/wine.csv')
    # data = df.corr()
    # print(data)
    emit('matrix:data', {'data': 'Connected', 'count': 0})


@socketio.on('connect')
def test_connect():
    emit('handshake', {'data': 'Connected', 'count': 0})


if __name__ == '__main__':
    app.debug = True
    socketio.run(app)


# class DataHandler(object):
#     def __init__(self):
#         self.df = None
#         pass

#     def load_data(self, dataset):
#         self.df = pd.read_csv('data/wine.csv')

#     def correlation_matrix(self):
#         print(self.df.corr())
