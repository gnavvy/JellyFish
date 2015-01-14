App.View.Axis = React.createClass({
  displayName: 'Axis',
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
      var rad = Math.PI * data[key] * 2;
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
    this.setState({ knobSize: App.Const.AXIS_KNOB_SIZE*1.5 });
  },
  onMouseLeaveKnob: function(e) {
    e.preventDefault();
    this.setState({ knobSize: App.Const.AXIS_KNOB_SIZE });
  },
  onMouseDownKnob: function(e) {
    e.preventDefault();
    if (e.button !== 0) {
      return;
    }
    this.setState({ isDragging: true });
  },
  composeKnobs: function() {
    var _this = this;
    return _.map(this.state.points, function(p) {
      return App.create('circle', {
        cx:            p.x, 
        cy:            p.y, 
        r:             App.Const.AXIS_KNOB_SIZE,
        stroke:       _this.props.color,
        strokeWidth:   App.Const.AXIS_KNOB_STROKE_WIDTH,
        fill:         "#fff",
        onMouseDown:  _this.onMouseDownKnob,
        onMouseOver:  _this.onMouseOverKnob,
        onMouseLeave: _this.onMouseLeaveKnob
      });
    });
  },
  composePath: function() {
    return App.create('path', {
      d:           App.Util.PathComposer(this.state.points),
      stroke:      this.props.color, 
      strokeWidth: this.props.strokeWidth, 
      fill:       "none"
    });
  },
  render: function() {
    return App.create('g', null,
      this.composePath(), App.create('g', { children: this.composeKnobs() })
    );
  }
});
