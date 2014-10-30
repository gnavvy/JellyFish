App.View.ScatterPlot = React.createClass({
  displayName: 'ScatterPlot',
  propTypes: {
    containerId: React.PropTypes.string
  },
  getDefaultProps: function() {
    return {
      containerId: 'default-container',
      method: 'default-method'
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
    App.socket.emit('scatter-plot:mounted', { method: this.props.method });
    App.socket.on(this.props.method+':data', this.updateDataPoints);
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
      return App.create(App.View.Vertex, {
        x: r + p[0] * r * 4,
        y: r + p[1] * r * 4,
        color:  App.Const.COLOR_SCHEME[p[3]],
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

    return App.create('g', null,
      App.create('circle', { cx: cx, cy: cy, r: cx*0.90, stroke: "#eee", fillOpacity: 0 }),
      App.create('circle', { cx: cx, cy: cy, r: cx*0.45, stroke: "#eee", fillOpacity: 0 }),
      App.create('line', { x1: cx, y1: cy, x2: cx* 2, y2: cy, stroke: "#eee"}),
      App.create('line', { x1: cx, y1: cy, x2: cx, y2: cy* 2, stroke: "#eee"}),
      App.create('line', { x1: cx, y1: cy, x2: cx*-2, y2: cy, stroke: "#eee"}),
      App.create('line', { x1: cx, y1: cy, x2: cx, y2: cy*-2, stroke: "#eee"}),
      App.create('circle', { cx: cx, cy: cy, r: cx * 0.03, stroke: "#eee", fill: "#fff" }),
      App.create('g', { children: this.plotDataPoints(cx) })
    );
  },
  render: function() {
    return App.create('svg', {
      width: this.state.width, 
      height: this.state.height 
    }, this.constructCompass());
  }
});
