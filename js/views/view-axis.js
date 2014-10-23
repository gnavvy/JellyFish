App.View.Axis = React.createClass({
  getDefaultProps: function() {
    return {
      cx: 0,
      cy: 0,
      radius:  10,
      color: "#ddd",
      strokeWidth: 1,
      data: { 0.0: 0, 0.5: 7/6, 0.75: 5/6, 1.0: 5/6 },
      pathComposer: d3.svg.line().x(function(d) { return d.x; }).y(function(d) { return d.y; })
                         .interpolate("bundle")  // TODO: move to util
    };
  },
  getInitialState: function() {
    return {
      width:   0,
      height:  0,
      points:  []
    };
  },
  componentWillMount: function() {
    this.updateAxis();
  },
  updateAxis: function() {
    var cx = this.props.cx;
    var cy = this.props.cy;
    var radius = this.props.radius;
    var data = this.props.data;
    var points = _.map(_.sortBy(_.keys(data)), function(key) {
      var rad = Math.PI * data[key];
      var mag = radius * key;
      return { 
        'x': cx + mag * Math.cos(rad), 
        'y': cy - mag * Math.sin(rad) };
    });
    this.setState({ points: points });
  },
  composeKnobs: function() {
    var color = this.props.color;
    var width = this.props.strokeWidth;
    return _.map(this.state.points, function(p) {
      return React.DOM.circle({ 
        cx:          p.x, 
        cy:          p.y, 
        r:           App.Const.AXIS_KNOB_SIZE, 
        stroke:      color,
        strokeWidth: App.Const.AXIS_KNOB_STROKE_WIDTH,
        fill:       "#fff" 
      });
    });
  },
  composePath: function(cx, cy, r) {
    return React.DOM.path({ 
      d:           App.Util.PathComposer(this.state.points), 
      stroke:      this.props.color, 
      strokeWidth: this.props.strokeWidth, 
      fill:       "none"
    });
  },
  render: function() {
    return React.DOM.g(null, 
      this.composePath(), React.DOM.g({ children: this.composeKnobs() })
    );
  }
});
