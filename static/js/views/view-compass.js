app.view.Compass = React.createClass({
  getDefaultProps: function() {
    return {
      axes: [
        { "c": 1, "w": 3, "data": { 0.0: 0, 1.0: 1/6 } },
        { "c": 2, "w": 3, "data": { 0.0: 0, 0.166: 1/3, 0.323: 1/2, 0.5: 7/12, 1.0: 7/12 } },
        { "c": 2, "w": 3, "data": { 0.5: 1/2, 1.0: 1/2 } },
        { "c": 3, "w": 3, "data": { 0.0: 0, 1.0: 2/3 } },
        { "c": 4, "w": 3, "data": { 0.0: 0, 0.5: 11/12, 0.75: 9/12, 1.0: 9/12 } },
      ]
    };
  },
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
    app.socket.emit('compass:mouted');
    app.socket.on('compass:data', this.updateCompass);
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
      return app.view.Axis({
        cx:          cx, 
        cy:          cy, 
        radius:      r, 
        color:       app.config.COLOR_SCHEME[axis.c],
        strokeWidth: axis.w,
        data:        axis.data
      });
    });
  },
  plotPoints: function(cx, cy, r) {
    return _.map(this.state.points, function(axis) {
      return app.view.Axis({
        cx:          cx, 
        cy:          cy, 
        radius:      r, 
        color:       app.config.COLOR_SCHEME[axis.c],
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
    
    return React.DOM.g(null, 
      React.DOM.circle({ cx: cx, cy: cy, r: cx*0.90, stroke: "#ddd", fillOpacity: 0 }),
      React.DOM.circle({ cx: cx, cy: cy, r: cx*0.45, stroke: "#ddd", fillOpacity: 0 }),
      React.DOM.line({ x1: cx, y1: cy, x2: cx* 2, y2: cy, stroke: "#ddd"}),
      React.DOM.line({ x1: cx, y1: cy, x2: cx, y2: cy* 2, stroke: "#ddd"}),
      React.DOM.line({ x1: cx, y1: cy, x2: cx*-2, y2: cy, stroke: "#ddd"}),
      React.DOM.line({ x1: cx, y1: cy, x2: cx, y2: cy*-2, stroke: "#ddd"}),
      React.DOM.g({ children: this.composeAxes(cx, cy, cx*0.9) }),
      React.DOM.g({ children: this.plotPoints(cx, cy, cx*0.9) }),
      React.DOM.circle({ cx: cx, cy: cy, r: cx * 0.03, stroke: "#ddd", fill: "#fff" })
    );
  },
  render: function() {
    return React.DOM.svg({ width: this.state.width, height: this.state.height }, this.constructCompass());
  }
});
