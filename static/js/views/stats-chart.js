App.View.StatsChart = React.createClass({
  displayName: 'StatsChart',
  propTypes: {
    containerId: React.PropTypes.string
//    numSegments: React.PropTypes.number
  },
  getDefaultProps: function() {
    return {
      containerId: 'default-container',
      data:         undefined
//      numSegments:  100
    };
  },
  getInitialState: function() {
    return {
//      points: this.props.,
      numBins: this.props.data ? this.props.data.length : 1,
      width:  0,
      height: 0
    };
  },
  componentDidMount: function() {
    this.updateComponentSize();
//    this.updateDataPoints();
    window.addEventListener("resize", this.updateComponentSize);
//    App.socket.emit('scatter-plot:mounted', { method: this.props.method });
//    App.socket.on(this.props.method+':data', this.updateDataPoints);
  },
  componentWillUnmount: function() {
    window.removeEventListener("resize", this.updateComponentSize);
  },
  updateComponentSize: function() {
    var container = $('#'+this.props.containerId);
    this.setState({ width: container.width(), height: Math.max(container.height(), 48) });
  },
//  updateDataPoints: function(res) {
//    var _this = this;
//    var points = _.map(_.range(_this.props.numSegments), function() { return Math.random(); });
//  var elements = _.range(this.state.numRows * this.state.numCols);
//  var points = _.zip(JSON.parse(res.x), JSON.parse(res.y), JSON.parse(res.val), JSON.parse(res.cls));
//   this.setState({ points: points });
//  },
  constructBars: function() {
    if (_.isEmpty(this.props.data)) {
      return [];
    }

    var _this = this;
    return _.map(this.props.data, function(p, i) {
      return App.create('rect', {
        width:  _this.state.width / _this.state.numBins * 0.9,
        height: _this.state.height * p,
        x:      _this.state.width / _this.state.numBins * i,
        y:      _this.state.height - _this.state.height * p,
        fill:   "#ddd"
      });
    });
  },
  render: function() {
    if (this.state.width === 0) {
      return null;
    }

    console.log('numBins: ', this.state.numBins, 'data: ', this.props.data);

    return App.create('svg', { width: this.state.width, height: this.state.height },
      App.create('g', { children: this.constructBars() })
    );
  }
});
