App.View.StatsChart = React.createClass({
  displayName: 'StatsChart',
  propTypes: {
    containerId: React.PropTypes.string
  },
  getDefaultProps: function() {
    return {
      containerId: 'default-container',
      data:         undefined
    };
  },
  getInitialState: function() {
    return {
      numBins: this.props.data ? this.props.data.length : 1,
      width:  0,
      height: 0,
      unitWidth: 0,
      selectedBars: [],
      startBar: -1,
      isSelecting: false
    };
  },
  componentDidMount: function(props, state) {
    this.updateComponentSize();
    window.addEventListener("resize", this.updateComponentSize);
  },
  componentWillUnmount: function() {
    window.removeEventListener("resize", this.updateComponentSize);
  },
  updateComponentSize: function() {
    var width = document.getElementById(this.props.containerId).clientWidth;
    this.setState({ width: width, height: width*0.1, unitWidth: width/this.state.numBins });
  },
  createOneBar: function(val, idx, color) {
    val = val || 0;
    idx = idx || 0;
    return App.create('rect', { className: 'stats-chart-bar',
      width:  this.state.unitWidth * (1 - App.Const.STATS_CHART_SPAN_RATIO*2),
      height: this.state.height * val,
      x:      this.state.unitWidth * (idx + App.Const.STATS_CHART_SPAN_RATIO),
      y:      this.state.height - this.state.height * val,
      fill:   color || "#eee"
    });
  },
  createBarSequence: function() {
    var selectedBars = this.state.selectedBars;
    var _this = this;
    return _.map(this.props.data, function(val, idx) {
      var selected = _.contains(selectedBars, idx);
      return App.create('g', null,
        _this.createOneBar(1.0, idx, selected ? "#D9EDF7" : "#eee"), // background
        _this.createOneBar(val, idx, selected ? App.Const.COLORS[1] : App.Const.COLORS[0])
      );
    });
  },
  createInteractionLayer: function() {
    var left = $('#'+this.props.containerId).offset().left;

    var _this = this;
    return App.create('rect', {
      width:  this.state.width,
      height: this.state.height,
      fillOpacity: 0,
      onMouseDown: function(e) {
        e.preventDefault();

        var hoveredBar = Math.floor((e.pageX - left) / _this.state.unitWidth);
        _this.setState({ isSelecting: true, startBar: hoveredBar });

        document.addEventListener('mousemove', onMouseMove);
        document.addEventListener('mouseup', onMouseUp);

        function onMouseMove(e) {
          e.preventDefault();

          if (!_this.state.isSelecting) return;
          var hoveredBar = Math.floor((e.pageX - left) / _this.state.unitWidth);
          var startBar = _this.state.startBar;
          var selected = _.range(Math.min(startBar, hoveredBar), Math.max(startBar, hoveredBar)+1);

          _this.setState({ selectedBars: selected });
        }

        function onMouseUp(e) {
          e.preventDefault();
         _this.setState({ isSelecting: false });
          document.removeEventListener('mousemove', this.onMouseMove);
          document.removeEventListener('mouseup', onMouseUp);
        }
      }
    });
  },
  createBarChart: function() {
    if (!this.isMounted()) return;

    var w = this.state.width,
        h = this.state.height;
    var dh = App.Const.STATS_CHART_X_LABEL_HEIGHT;
    return [
      this.createBarSequence(),
//      App.create('rect', { width: w, height: 1, x: 0, y: h-dh, fill: "#eee" }),
//      App.create('text', { x: 0, y: h, className: 'stats-chart-text' }, 'quality')
      this.createInteractionLayer()
    ];
  },
  render: function() {
    if (this.state.width === 0) {
      return null;
    }

    return App.create('svg', { width: this.state.width, height: this.state.height },
      App.create('g', { children: this.createBarChart() })
    );
  }
});
