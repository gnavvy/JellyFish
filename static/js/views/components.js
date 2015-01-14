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

App.View.Slider = React.createClass({
  displayName: 'Slider',
  getDefaultProps: function() {
    return {
      containerId: 'default-container',
      attributeId: 'default-attribute',
      minValue:     0.0,
      maxValue:     1.0,
      value:        0.5
    };
  },
  getInitialState: function() {
    return {
      width:      0,
      height:     0,
      left:       0,
      value:      this.props.value,
      isDragging: false
    };
  },
  componentDidMount: function() {
    window.addEventListener("resize", this.updateDimensions);
    this.updateDimensions();
  },
  componentWillUnmount: function() {
    window.removeEventListener("resize", this.updateDimensions);
  },
  componentDidUpdate:  function(prevProps, prevState) {
    if (this.state.isDragging && !prevState.isDragging) {
      document.addEventListener('mousemove', this.handleMouseMove);
      document.addEventListener('mouseup', this.handleMouseUp);
    } else if (!this.state.isDragging && prevState.isDragging) {
      document.removeEventListener('mousemove', this.handleMouseMove);
      document.removeEventListener('mouseup', this.handleMouseUp);
    }
  },
  updateDimensions: function() {
    var container = $('#'+this.props.containerId);
    this.setState({
      width: container.width(),
//      height: Math.max(container.height(), 28),
      left: container.offset().left
    });
  },
  handleMouseDown: function(e) {
    e.preventDefault();
    this.setState({ isDragging: true });
  },
  handleMouseMove: function(e) {
    e.preventDefault();
    if (!this.state.isDragging) return;

    var value = e.pageX - this.state.left - App.Const.SLIDER_PADDING_LEFT;
    value = Math.max(Math.min(value, App.Const.SLIDER_WIDTH), 0);
    value = value / App.Const.SLIDER_WIDTH;  // -> [0, 1]

    this.getDOMNode().dispatchEvent(new CustomEvent("slider-value-changed-event", {
      detail: { attributeId: this.props.attributeId, value: this.state.value }, bubbles: true
    }));

    this.setState({ value: value });
  },
  handleMouseUp: function(e) {
    e.preventDefault();
    this.setState({ isDragging: false });
  },
  render: function() {
    return App.create('svg', { width: this.state.width, height: App.Const.SLIDER_HEIGHT },
      App.create('text', {
        className: 'slider-text',
        x: 0,
        y: App.Const.SLIDER_HEIGHT / 2,
        fill: '#838B93'
      }, this.props.attributeId),
      App.create('rect', {
        width: App.Const.SLIDER_WIDTH,
        height: App.Const.SLIDER_HEIGHT,
        x: App.Const.SLIDER_PADDING_LEFT,
        y: 0,
        fill: '#ffffff',
        onMouseDown: this.handleMouseDown,
        onMouseMove: this.handleMouseMove,
        onMouseUp: this.handleMouseUp
      }),
      App.create('rect', { className: 'click-through',
        width: this.state.value * App.Const.SLIDER_WIDTH,
        height: App.Const.SLIDER_HEIGHT,
        x: App.Const.SLIDER_PADDING_LEFT,
        y: 0,
        fill: '#545CA6'
      }),
      App.create('text', {
        className: 'slider-text',
        x: this.state.width + App.Const.SLIDER_VALUE_PADDING_RIGHT,
        y: App.Const.SLIDER_HEIGHT / 2,
        fill: '#838B93'
      }, this.state.value * this.props.maxValue)
    );
  }
});