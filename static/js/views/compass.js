App.View.Compass = React.createClass({
  getInitialState: function() {
    return {
      axes:   undefined,
      points: undefined,
      width:  0,
      height: 0
    };
  },
  componentDidMount: function() {
    this.updateDimensions();
    window.addEventListener("resize", this.updateDimensions);
    App.socket.emit('compass:mounted');
    App.socket.on('compass:data', this.updateCompass);
  },
  componentWillUnmount: function() {
    window.removeEventListener("resize", this.updateDimensions);
  },
  updateDimensions: function() {
    var size = document.getElementById('compass').clientWidth;
    this.setState({ width: size, height: size });
  },
  updateCompass: function(res) {
    var axes = _.map(JSON.parse(res.axes), function(axis) {
      return { 'c': 1, 'w': 3, 'data': axis };
    });

    var points = _.map(JSON.parse(res.data), function(p) {
      return { 'c': 3, 'w': 2, 'data': p };
    });

    this.setState({ axes: axes, points: points });
  },
  composeAxes: function(cx, cy, r) {
    return _.map(this.state.axes, function(axis) {
      return React.createElement(App.View.Axis, {
        cx:          cx, 
        cy:          cy, 
        radius:      r, 
        color:       App.Config.COLOR_SCHEME[axis.c],
        strokeWidth: axis.w,
        data:        axis.data
      });
    });
  },
  plotPoints: function(cx, cy, r) {
    return _.map(this.state.points, function(axis) {
      return React.createElement(App.View.Axis, {
        cx:          cx, 
        cy:          cy, 
        radius:      r, 
        color:       App.Config.COLOR_SCHEME[axis.c],
        strokeWidth: axis.w,
        data:        axis.data
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
      React.createElement('g', { children: this.composeAxes(cx, cy, cx*0.9) }),
      React.createElement('g', { children: this.plotPoints(cx, cy, cx*0.9) }),
      React.createElement('circle', { cx: cx, cy: cy, r: cx * 0.03, stroke: "#eee", fill: "#fff" })
    );
  },
  render: function() {
    return React.createElement('svg', { 
      width: this.state.width, 
      height: this.state.height 
    }, this.constructCompass());
  }
});
