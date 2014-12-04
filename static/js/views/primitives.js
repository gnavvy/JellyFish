App.View.Vertex = React.createClass({
  displayName: 'Vertex',
  mixins: [App.Mixin.SvgCircleMinxin],
  render: function() {
    return App.create('circle', {
      cx:            this.props.x || 0,
      cy:            this.props.y || 0,
      r:             this.props.radius || 2,
      fill:          this.props.color || App.Const.COLORS[1],
      stroke:        this.props.color || App.Const.COLORS[0],
      fillOpacity:   this.props.fillOpacity || 1,
      strokeOpacity: this.props.strokeOpacity || 1
    });
  }
});

App.View.Knob = React.createClass({
  displayName: 'Knob',
  mixins: [App.Mixin.SvgCircleMinxin],
  getDefaultProps: function() {
    return {
      componentId:'default-knob',
      onMouseDown: function() {}
    };
  },
  render: function() {
    return App.create('g', null,
      App.create('circle', {  // shadow
        cx:          this.props.x + 1 || 1,
        cy:          this.props.y + 1 || 1,
        r:           App.Const.RANGE_SELECTOR_KNOB_RADIUS,
        fill:       '#ddd'
      }),
      App.create('circle', {
        cx:          this.props.x || 0,
        cy:          this.props.y || 0,
        r:           App.Const.RANGE_SELECTOR_KNOB_RADIUS,
        fill:        App.Const.COLORS[1],
        onMouseDown: this.props.onMouseDown
      })
    );
  }
});