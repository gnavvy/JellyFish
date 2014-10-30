App.View.RangeSelector = React.createClass({
  displayName: 'Slider',  // for debug
  propTypes: {
    containerId: React.PropTypes.string
  },
  getDefaultProps: function() {
    return {
      containerId: 'default-container'
    };
  },
  getInitialState: function() {
    return {
//      xPos:       {},
//      x0:         0,
//      xMin:       this.props.dx,
//      xMax:       0,
      width:      0,
      isDragging: false
//      hoveredGroup: undefined,
//      draggedGroup: undefined
    };
  },
//  componentWillReceiveProps: function(nextProps) {},
  componentDidMount: function() {
    this.updateComponentSize();
    window.addEventListener("resize", this.updateComponentSize);
  },
  componentWillUnmount: function() {
    window.removeEventListener("resize", this.updateComponentSize);
  },
  componentDidUpdate:  function(prevProps, prevState) {
    if (this.state.isDragging && !prevState.isDragging) {
      document.addEventListener('mousemove', this.onKnobDragged);
      document.addEventListener('mouseup', this.onKnobMouseUp);
    } else if (!this.state.isDragging && prevState.isDragging) {
      document.removeEventListener('mousemove', this.onKnobDragged);
      document.removeEventListener('mouseup', this.onKnobMouseUp);
    }
  },
  updateComponentSize: function() {
    var width = document.getElementById(this.props.containerId).clientWidth || 10;
//    var xMax = width - App.Const.SOCIAL_BOUNDARY_KNOB_WIDTH - this.props.dy + this.props.dx;

//    var _this = this;
//    var xPos = _.object(_.map(App.Model.Genomes, function(genome) {
//      return [genome.id, (xMax - _this.props.dx) * genome.fuzziness + _this.props.dx];
//    }));
//    this.setState({ width: width, xMax: xMax, xPos: xPos });
    this.setState({ width: width });
  },
  handleMouseDown: function(ev) {
    ev.preventDefault();
    var id = ev.target.id;

    console.log(ev.target);

    if (ev.button === 0) {
      this.setState({
        isDragging: true, draggedGroup: id, x0: ev.pageX - this.state.xPos[id]
      });
//      this.getDOMNode().dispatchEvent(new CustomEvent("knob-mouse-down-event", {
//        detail: { type: 'group', group: id }, bubbles: true
//      }));

//      if (logger !== undefined) {
//        logger.log(id + ' fuzziness from ' + this.positionToRatio(this.state.xPos[id]));
//      }
//    } else if (e.button === 2) {
//      App.Model.Genomes = _.map(App.Model.Genomes, function(genome) {
//        if (genome.id === id) {
//          genome.isVisible = !genome.isVisible;
//        }
//        return genome;
//      });
//      this.forceUpdate();
//      this.getDOMNode().dispatchEvent(new CustomEvent("knob-right-click-event", {
//        detail: { type: 'group', group: id }, bubbles: true
//      }));
    }
  },
//  onKnobMouseUp: function(e) {
//    e.preventDefault();
//    if (e.button !== 0) return;
//
//    this.getDOMNode().dispatchEvent(new CustomEvent("knob-mouse-up-event", {
//      detail: { type: 'group', group: this.state.draggedGroup }, bubbles: true
//    }));
//
//    var fuzziness = this.positionToRatio(this.state.xPos[e.target.id]);
//
//    // hack, should only update genome or data
//    App.Model.Genomes = _.map(App.Model.Genomes, function(genome) {
//      if (genome.id === e.target.id) {
//        genome.fuzziness = fuzziness;
//      }
//      return genome;
//    });
//
//    App.Model.Data = _.map(App.Model.Data, function(genome) {
//      if (genome.id === e.target.id) {
//        genome.fuzziness = fuzziness;
//      }
//      return genome;
//    });
//
//    if (logger !== undefined) {
//      logger.log(e.target.id + ' fuzziness to ' + fuzziness);
//    }
//
//    this.setState({ isDragging: false });
//  },
//  onKnobDragged: function(e) {
//    e.preventDefault();
//    if (!this.state.isDragging) return;
//    var xPos = this.state.xPos;
//    var group = this.state.draggedGroup;
//    var x = Math.min(Math.max(e.pageX - this.state.x0, this.state.xMin), this.state.xMax);
//    xPos[group] = x;
//    this.setState({ xPos: xPos });
//    this.getDOMNode().dispatchEvent(new CustomEvent("knob-dragged-event", {
//      detail: { group: group, pos: x, ratio: this.positionToRatio(x) },
//      bubbles: true
//    }));
//  },
//  onKnobMouseOver: function(e) {
//    e.preventDefault();
//    this.setState({ hoveredGroup: e.target.id });
//  },
//  onKnobMouseLeave: function(e) {
//    e.preventDefault();
//    this.setState({ hoveredGroup: undefined });
//  },
//  onDoubleClickTrack: function(e) {
//    e.preventDefault();
//
//    var name = prompt("Please enter the name for the new social group", "New Group");
//    if (!name) return;
//
//    var newGenome = {
//      'id': _.uniqueId('genome-new-'),
//      'name': name,
//      'fuzziness': this.positionToRatio(this.getRelativeX(e.pageX)),
//      'isVisible': true
//    };
//
//    App.Model.Genomes.push(newGenome);
//
//    // hack, should only update genome or data
//    var newData = _.clone(newGenome);
//    newData.facets = _.clone(App.Model.Facets);
//
//    App.Model.Data.push(newData);
//
//    if (logger) logger.log({
//      'msg': "new social group added.",
//      'data': newGenome
//    });
//
//    this.getDOMNode().dispatchEvent(new CustomEvent("genomes-changed-event", { bubbles: true }));
//    this.updateComponentSize();
//  },
//  positionToRatio: function(x) {
//    return (x - this.state.xMin) / this.state.xMax;
//  },
//  getRelativeX: function(pageX) {
//    return pageX - $('.social-boundary-svg').position().left + this.props.dx;
//  },
//  getKnobs: function() {
//    var _this = this;
//
//    var knobs = _.map(App.Model.Genomes, function(genome) {
//      var x0 = _this.isMounted() ? _this.state.xPos[genome.id] : 0;
//      var y0 = App.Const.SOCIAL_BOUNDARY_VIEW_HEIGHT/2;
//      var f = _this.positionToRatio(_this.state.xPos[genome.id]);
//
//      return React.DOM.g(null,
//        React.DOM.rect({ className: "social-boundary-knob-shadow",
//          width:  App.Const.SOCIAL_BOUNDARY_KNOB_WIDTH,
//          height: App.Const.SOCIAL_BOUNDARY_KNOB_HEIGHT,
//          rx:     App.Const.SOCIAL_BOUNDARY_KNOB_RADIUS,
//          ry:     App.Const.SOCIAL_BOUNDARY_KNOB_RADIUS,
//          x:      x0+0.5,
//          y:      y0+1,
//          fill:   "#999999"
//        }),
//        React.DOM.rect({ className: genome.isVisible ?
//          "social-boundary-knob" : "social-boundary-knob-white",
//          id:     genome.id,
//          width:  App.Const.SOCIAL_BOUNDARY_KNOB_WIDTH,
//          height: App.Const.SOCIAL_BOUNDARY_KNOB_HEIGHT,
//          rx:     App.Const.SOCIAL_BOUNDARY_KNOB_RADIUS,
//          ry:     App.Const.SOCIAL_BOUNDARY_KNOB_RADIUS,
//          x:      x0,
//          y:      y0,
//          onMouseDown: _this.handleMouseDownKnob,
//          onMouseOver: _this.onKnobMouseOver,
//          onMouseLeave: _this.onKnobMouseLeave
//        }),
//        React.DOM.text({ className: "genome-text small",
//          x: Math.max(21, x0) + App.Const.SOCIAL_BOUNDARY_KNOB_WIDTH/2,
//          y: y0 - App.Const.SOCIAL_BOUNDARY_TRACK_RADIUS
//        }, _this.state.hoveredGroup === genome.id && !_.isEmpty(genome.members) ?
//          genome.members : genome.name),
//        React.DOM.text({ className: "genome-knob-text",
//          x: x0 + App.Const.SOCIAL_BOUNDARY_KNOB_WIDTH/2,
//          y: y0 + App.Const.SOCIAL_BOUNDARY_KNOB_RADIUS,
//          fill: genome.isVisible ? "#FFFFFF" : "#999999"
//        }, '~'+Math.round(100-100*f)+'%')
//      );
//    });
//    return knobs;
//  },
  render: function() {
    return App.create('svg', {
      width: this.state.width,
      height: this.state.height
    },
      this.state.width === 0 ?
        App.create('g', null) :
        App.create('g', null,
          App.create('rect', {
            x:      App.Const.RANGE_SELECTOR_KNOB_RADIUS,
            y:      App.Const.RANGE_SELECTOR_KNOB_RADIUS
                  - App.Const.RANGE_SELECTOR_TRACK_HEIGHT / 2,
            width:  this.state.width - App.Const.RANGE_SELECTOR_KNOB_RADIUS,
            height: App.Const.RANGE_SELECTOR_TRACK_HEIGHT,
            rx:     App.Const.RANGE_SELECTOR_TRACK_RADIUS,
            ry:     App.Const.RANGE_SELECTOR_TRACK_RADIUS,
            fill:  '#eee'
          }),
          App.create(App.View.Knob, {
            componentId: 'left-knob',
            x: App.Const.RANGE_SELECTOR_KNOB_RADIUS,
            y: App.Const.RANGE_SELECTOR_KNOB_RADIUS,
            onMouseDown: this.handleMouseDown
          }),
          App.create(App.View.Knob, {
            componentId: 'right-knob',
            x: this.state.width - App.Const.RANGE_SELECTOR_KNOB_RADIUS,
            y: App.Const.RANGE_SELECTOR_KNOB_RADIUS,
            onMouseDown: this.handleMouseDown
          })
        )
    );

//    return React.DOM.svg({ className: 'social-boundary-svg',
//      id: 'social-boundary-svg',
//      width:  this.state.width,
//      height: App.Const.SOCIAL_BOUNDARY_VIEW_HEIGHT
//    },
//      React.DOM.g(null,
//        React.DOM.rect({ className: "social-boundary-track",
//          id:    "social-boundary-track",
//          width:  this.state.width,
//          height: App.Const.SOCIAL_BOUNDARY_TRACK_HEIGHT,
//          rx:     App.Const.SOCIAL_BOUNDARY_TRACK_RADIUS,
//          ry:     App.Const.SOCIAL_BOUNDARY_TRACK_RADIUS,
//          y:      App.Const.SOCIAL_BOUNDARY_VIEW_HEIGHT/2 - this.props.dy/2
//        }),
//        React.DOM.g({ children: this.getKnobs() })
//      )
//    );
  }
});
