App.View.Matrix = React.createClass({
  displayName: 'Matrix',
  propTypes: {
    containerId: React.PropTypes.string
  },
  getDefaultProps: function() {
    return {
      containerId: 'default-container'
    };
  },
  getInitialState: function() {
    return {
      width:   0,
      height:  0,
      numRows: 10,
      numCols: 10,
      data:    undefined
    };
  },
  componentDidMount: function() {
    this.updateDimensions();
    this.constructMatrix();
    window.addEventListener("resize", this.updateDimensions);
    App.socket.emit('matrix:mounted');
    App.socket.on('matrix:data', this.updateMatrixData);
  },
  componentWillUnmount: function() {
    window.removeEventListener("resize", this.updateDimensions);
  },
  updateMatrixData: function(res) {
    var data = JSON.parse(res.data);
    var numRows = _.size(data);
    var numCols = _.size(_.values(data)[0]);
    data = _.flatten(_.map(data, _.values));
    this.setState({ numRows: numRows, numCols: numCols, data: data });
  },
  updateDimensions: function() {
    var size = document.getElementById(this.props.containerId).clientWidth;
    this.setState({ width: size, height: size });
  },
  getFillColor: function(idx) {
    if (this.state.data === undefined || this.state.data[idx] === 0) {
      return App.Const.COLOR_SCHEME[0];
    } else if (this.state.data[idx] > 0) {
      return App.Const.COLOR_SCHEME[2];
    } else {
      return App.Const.COLOR_SCHEME[1];
    }
  },
  getFillOpacity: function(idx) {
    if (this.state.data === undefined) {
      return 0.3;
    }
    return Math.abs(this.state.data[idx]);
  },
  constructMatrix: function() {
    if (this.state.width === 0) {
      return;
    }

    var elSize = this.state.width / this.state.numCols;

    var _this = this;
    var elements = _.range(this.state.numRows * this.state.numCols);
    elements = _.map(elements, function(el, idx) {
      return App.create('rect', {
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
    return App.create('svg', {
      width: this.state.width,
      height: this.state.height
    }, App.create('g', {
      children: this.constructMatrix()
    }));
  }
});
