__author__ = 'ywang'

from gevent import monkey
monkey.patch_all()

from flask import Flask, render_template
from flask_socketio import SocketIO, emit
# from flask.ext import assets

app = Flask(__name__)
socketio = SocketIO(app)

# import os
# env = assets.Environment(app)
# env.load_path = [
#     os.path.join(os.path.dirname(__file__), 'static'),
#     os.path.join(os.path.dirname(__file__), 'bower_components')
# ]
# env.register('js_all', assets.Bundle(
#     'jquery/dist/jquery.min.js',
#     'jquery-ui/jquery-ui.min.js',
#     'underscore/underscore-min.js',
#     'react/react.min.js',
#     'socket.io-client/dist/socket.io.min.js',
#     'd3/d3.min.js',
#     'js/const.js',
#     output='js_all.js'
# ))

import numpy as np
np.set_printoptions(precision=4)
np.set_printoptions(threshold=1000)
np.set_printoptions(linewidth=1000)
np.set_printoptions(suppress=True)

import pandas as pd
pd.set_option('display.width', 1000)
pd.set_option('display.max_rows', 50)

import json
from random import random


df = pd.read_csv('data/wine.csv')


@app.route('/')
def index():
    return render_template('index.html')


@socketio.on('connect')
def test_connect():
    emit('handshake', {'data': 'Connected', 'count': 0})


@socketio.on('scatter-plot:mounted')
def get_scatter_plot_data(req):
    method = req['method']
    print(method)
    emit(method+':data', {
        'x': df[method+'.x'].to_json(orient='values'),
        'y': df[method+'.y'].to_json(orient='values'),
        'val': df[method+'.jaccard'].to_json(orient='values'),
        'cls': df['Class'].to_json(orient='values')
    })


@socketio.on('widget:mounted')
def get_widget_data(req):
    method = req['method']
    print(method)
    if method == 'default-method':
        pass
    emit(method+':data', {
        'x': df[method+'.x'].to_json(orient='values'),
        'y': df[method+'.y'].to_json(orient='values'),
        'val': df[method+'.jaccard'].to_json(orient='values'),
        'cls': df['Class'].to_json(orient='values')
    })


@socketio.on('compass:mounted')
def get_compass_data():
    numAxes = df.shape[1]
    # uniformly distributed
    axes = [{0.0: 0, 1.0: 2.0 * i / numAxes} for i in range(numAxes)]
    data = [{random(): 2.0 * random()} for i in range(10)]
    emit('compass:data', {
        'axes': json.dumps(axes),
        'data': json.dumps(data)
    })


@socketio.on('matrix:mounted')
def get_matrix_data():
    data = df.iloc[:, :-1].corr()
    emit('matrix:data', {'data': data.to_json()})


if __name__ == '__main__':
    app.debug = True
    socketio.run(app)
