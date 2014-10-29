App.View.Vertex = React.createClass({
  getDefaultProps: function() {
    return {
      x: 0,
      y: 0,
      radius:  3,
      color: App.Config.COLOR_SCHEME[1],
      strokeWidth: 1.5,
    };
  },
  render: function() {
    return React.DOM.circle({ 
      cx:          this.props.x,
      cy:          this.props.y, 
      r:           this.props.radius,
      stroke:      this.props.color,
      strokeWidth: this.props.strokeWidth,
      // fill:        this.props.color,
      fill:       "#fff"
    });
  }
});
