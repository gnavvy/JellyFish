__author__ = 'ywang'

from gevent import monkey
monkey.patch_all()

from flask import Flask, render_template
from flask.ext.socketio import SocketIO, emit

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
    emit('matrix:data', {'data': []})


@socketio.on('connect')
def test_connect():
    emit('handshake', {'data': 'Connected', 'count': 0})


if __name__ == '__main__':
    app.debug = True
    socketio.run(app)
