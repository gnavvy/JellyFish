app.view.Matrix = React.createClass({
  getInitialState: function() {
    return {
      width:   0,
      height:  0,
      numCols: 10,
      numRows: 10,
      data:    {}
    };
  },
  componentDidMount: function() {
    this.updateDimensions();
    this.constructMatrix();
    window.addEventListener("resize", this.updateDimensions);
    app.socket.emit('matrix:mouted');
    app.socket.on('matrix:data', this.updateMatrixData);
  },
  componentWillUnmount: function() {
    window.removeEventListener("resize", this.updateDimensions);
  },
  updateMatrixData: function(data) {
    console.log('data', data);
  },
  updateDimensions: function() {
    var size = document.getElementById('matrix').clientWidth;
    this.setState({ width: size, height: size });
  },
  getFillColor: function(idx) {
    var x = idx % this.state.numCols;
    var y = Math.floor(idx / this.state.numRows);
    if (x === y) {
      return app.config.COLOR_SCHEME[0];
    } else if (x > y) {
      return app.config.COLOR_SCHEME[1];
    } else {
      return app.config.COLOR_SCHEME[2];
    }
  },
  getFillOpacity: function(idx) {
    if (idx % this.state.numCols === Math.floor(idx / this.state.numRows)) {
      return 0.5;
    }
    return _.random(10, 90)/100;
  },
  constructMatrix: function() {
    if (this.state.width === 0 || this.state.height === 0) {
      return;
    }

    var elSize = this.state.width / this.state.numCols;

    var _this = this;
    var elements = _.range(this.state.numRows * this.state.numCols);
    elements = _.map(elements, function(el, idx) {
      return React.DOM.rect({
        className:   "matrix-element",
        width:        elSize * 0.9,
        height:       elSize * 0.9,
        x:            elSize * (idx % _this.state.numCols) + elSize * 0.1,
        y:            elSize * Math.floor(idx / _this.state.numRows) + elSize * 0.1,
        rx:           elSize * 0.1,
        ry:           elSize * 0.1,
        fill:        _this.getFillColor(idx),
        fillOpacity: _this.getFillOpacity(idx)
      });
    });

    return elements;
  },
  render: function() {
    var matrix = this.constructMatrix();
    return React.DOM.svg({ width: this.state.width, height: this.state.height },
      React.DOM.g({ children: matrix })
    );
  }
});
