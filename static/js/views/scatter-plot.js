App.View.ScatterPlot = React.createClass({
  getDefaultProps: function() {
    return {
      id: 'default-scatter-plot'
    };
  },
  getInitialState: function() {
    return {
      points: undefined,
      width:  0,
      height: 0
    };
  },
  componentDidMount: function() {
    this.updateDimensions();
    window.addEventListener("resize", this.updateDimensions);
    App.socket.emit('scatter-plot:mounted', { id: this.props.id });
    App.socket.on(this.props.id+':data', this.updateDataPoints);
  },
  componentWillUnmount: function() {
    window.removeEventListener("resize", this.updateDimensions);
  },
  updateDimensions: function() {
    var size = document.getElementById('view-3').clientWidth;
    this.setState({ width: size, height: size });
  },
  updateDataPoints: function(res) {
    var points = _.zip(JSON.parse(res.x), JSON.parse(res.y), JSON.parse(res.val), JSON.parse(res.cls));
    this.setState({ points: points });
  },
  plotDataPoints: function(r) {
    return _.map(this.state.points, function(p) {
      return React.createElement(App.View.Vertex, {
        x: r + p[0] * r * 4,
        y: r + p[1] * r * 4,
        color:  App.Config.COLOR_SCHEME[p[3]],
        strokeWidth: 0,
        fillOpacity: 1 - p[2]
      });
    });
  },
  constructCompass: function() {
    if (this.state.width === 0 || this.state.height === 0) {
      return;
    }

    var cx = this.state.width / 2;
    var cy = this.state.height / 2;

    return React.createElement('g', null,
      React.createElement('circle', { cx: cx, cy: cy, r: cx*0.90, stroke: "#eee", fillOpacity: 0 }),
      React.createElement('circle', { cx: cx, cy: cy, r: cx*0.45, stroke: "#eee", fillOpacity: 0 }),
      React.createElement('line', { x1: cx, y1: cy, x2: cx* 2, y2: cy, stroke: "#eee"}),
      React.createElement('line', { x1: cx, y1: cy, x2: cx, y2: cy* 2, stroke: "#eee"}),
      React.createElement('line', { x1: cx, y1: cy, x2: cx*-2, y2: cy, stroke: "#eee"}),
      React.createElement('line', { x1: cx, y1: cy, x2: cx, y2: cy*-2, stroke: "#eee"}),
      React.createElement('circle', { cx: cx, cy: cy, r: cx * 0.03, stroke: "#eee", fill: "#fff" }),
      React.createElement('g', { children: this.plotDataPoints(cx) })
    );
  },
  render: function() {
    return React.createElement('svg', { 
      width: this.state.width, 
      height: this.state.height 
    }, this.constructCompass());
  }
});
