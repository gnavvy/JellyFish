App.View.ScatterPlotSvg = React.createClass({
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
      width:  0,
      height: 0,
      top: 0,
      left: 0,
      points: _.map(this.props.data, function(p) {
        return { 'x': p[0], 'y': p[1], 'val': p[2], 'cls': p[3], 'knn': p[4] };
      })
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
    var points = _.map(this.props.data, function(p) {
      var point = { 'x': p[0], 'y': p[1], 'val': p[2], 'cls': p[3] };
      if (point.val >= e.detail.range[0] && point.val <= e.detail.range[1]) {
//      if (point.val < e.detail.range[0] && point.val > e.detail.range[1]) {
        point.val = 0.95;
      } else {
        point.cls = 0;
      }
      return point;
    });

    this.setState({ points: points });
  },
  updateDimensions: function() {
    var size = document.getElementById(this.props.containerId).clientWidth;
    var offset = $('#'+this.props.containerId).offset();
    this.setState({ width: size, height: size, top: offset.top, left: offset.left });
  },
  drawNodes: function(r) {
    return _.map(this.state.points, function(p) {
      return App.create(App.View.Vertex, {
        x: p.x * r * 0.9 + r,
        y: p.y * r * 0.9 + r,
        color:  App.Const.COLORS[p.cls],
        radius: 1,
        strokeOpacity: 0.5,
        fillOpacity: 0.1
      });
    });
  },
  drawEdges: function(r) {
    


    var edges = [];
    for (var src = 0; src < this.state.points.length; src++) {
      for (var k = 0; k < 10; k++) {
        var p = this.state.points[src];
        var q = this.state.points[p.knn[k]];

        var line = App.create('line', {
          x1: p.x * r * 0.9 + r,
          y1: p.y * r * 0.9 + r,
          x2: q.x * r * 0.9 + r,
          y2: q.y * r * 0.9 + r,
          stroke: App.Const.COLORS[p.cls],
          strokeOpacity: 0.1
        });
        edges.push(line);
      }
    }

    var bundle = d3.layout.bundle();

    return edges;
  },
  drawScatterPlot: function() {
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
      App.create('g', { children: this.drawNodes(cx) }),
      App.create('g', { children: this.drawEdges(cx) })
    );
  },
  render: function() {
    return App.create('div', {},
      App.create('svg', { width: this.state.width, height: this.state.height }, this.drawScatterPlot())
    );
  }
});
