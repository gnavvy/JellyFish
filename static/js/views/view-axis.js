app.view.Axis = React.createClass({
  getDefaultProps: function() {
    return {
      cx: 0,
      cy: 0,
      radius:  10,
      color: "#ddd",
      strokeWidth: 1,
      data: { 0.0: 0, 0.5: 7/6, 0.75: 5/6, 1.0: 5/6 }
    };
  },
  getInitialState: function() {
    return {
      width:      0,
      height:     0,
      knobSize:   app.config.AXIS_KNOB_SIZE,
      points:     [],
      isDragging: false
    };
  },
  componentWillMount: function() {
    this.updateAxis();
  },
  componentDidMount: function() {
    window.addEventListener("resize", this.updateAxis);
  },
  componentWillUnmount: function() {
    window.removeEventListener("resize", this.updateAxis);
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
        'y': cy - mag * Math.sin(rad) 
      };
    });
    this.setState({ points: points });
  },
  onMouseOverKnob: function(e) {
    e.preventDefault();
    this.setState({ knobSize: app.config.AXIS_KNOB_SIZE*1.5 });
  },
  onMouseLeaveKnob: function(e) {
    e.preventDefault();
    this.setState({ knobSize: app.config.AXIS_KNOB_SIZE });
  },
  onMouseDown: function(e) {
    e.preventDefault();
    if (e.button !== 0) {
      return;
    }
    this.setState({ isDragging: true });
  },
  composeKnobs: function() {
    var _this = this;
    return _.map(this.state.points, function(p) {
      return React.DOM.circle({ 
        cx:            p.x, 
        cy:            p.y, 
        r:            _this.state.knobSize, 
        stroke:       _this.props.color,
        strokeWidth:   app.config.AXIS_KNOB_STROKE_WIDTH,
        fill:         "#fff",
        onMouseDown:  _this.onMouseDownKnob,
        onMouseOver:  _this.onMouseOverKnob,
        onMouseLeave: _this.onMouseLeaveKnob
      });
    });
  },
  composePath: function(cx, cy, r) {
    return React.DOM.path({ 
      d:           app.util.PathComposer(this.state.points), 
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
