App.View.ScatterPlot = React.createClass({
  displayName: 'ScatterPlot',
  propTypes: {
    containerId: React.PropTypes.string
  },
  getDefaultProps: function() {
    return {
      containerId: 'default-container',
      data: undefined
    };
  },
  getInitialState: function() {
    return {
      points: this.props.data,
      width:  0,
      height: 0
    };
  },
  componentDidMount: function() {
    this.updateDimensions();
    window.addEventListener("resize", this.updateDimensions);
    document.addEventListener("filter-range-changed", this.updateFilterRange);
  },
  componentWillUnmount: function() {
    window.removeEventListener("resize", this.updateDimensions);
    document.removeEventListener("filter-range-changed", this.updateFilterRange);
  },
  updateFilterRange: function(e) {
    if (!App.Util.hasSameParentWidget(e.detail.id, this.props.containerId)) {
      return;
    }
    var points = _.filter(this.props.data, function(p) {
      return p[2] >= e.detail.range[0] && p[2] <= e.detail.range[1];
    });
    this.setState({ points: points });
  },
  updateDimensions: function() {
    var size = document.getElementById(this.props.containerId).clientWidth;
    this.setState({ width: size, height: size });
  },
  plotDataPoints: function(r) {
    return _.map(this.state.points, function(p) {
      return App.create(App.View.Vertex, {
        x: r + p[0] * r * 4,
        y: r + p[1] * r * 4,
        color:  App.Const.COLORS[p[3]],
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
