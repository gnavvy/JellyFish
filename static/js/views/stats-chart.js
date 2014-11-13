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
  componentDidMount: function() {
    this.updateComponentSize();
    window.addEventListener("resize", this.updateComponentSize);
  },
  componentWillUnmount: function() {
    window.removeEventListener("resize", this.updateComponentSize);
  },
  shouldComponentUpdate: function(nextProps, nextState) {
    // re-render if selected bar changed or empty
    return !_.isEqual(this.state.selectedBars, nextState.selectedBars) ||
      _.isEmpty(this.state.selectedBars);
  },
  componentWillUpdate: function(nextProps, nextState) {
    if (!this.isMounted() || _.isEmpty(nextState.selectedBars)) {
      return true;
    }

    var range = _.map([_.min(nextState.selectedBars), _.max(nextState.selectedBars)+1],
      function(idx) { return idx / nextState.numBins; }
    );

    document.dispatchEvent(new CustomEvent('filter-range-changed', {
      detail: { id: this.props.containerId, range: range }, bubbles: true
    }));
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
        _this.createOneBar(val, idx, selected ? App.Const.COLORS[6] : App.Const.COLORS[2])
      );
    });
  },
  createRangeSelector: function() {
    if (_.isEmpty(this.state.selectedBars)) {
      return null;
    }

    var minIdx = _.min(this.state.selectedBars);
    var maxIdx = _.max(this.state.selectedBars)+1;

    return App.create('g', null,
      App.create('rect', {
        width: 0.5,
        height: this.state.height * App.Const.STATS_CHART_RANGE_SELECTOR_HEIGHT_RATIO,
        x: this.state.unitWidth * minIdx,
        y: this.state.height * (1-App.Const.STATS_CHART_RANGE_SELECTOR_HEIGHT_RATIO)/2,
        fill: App.Const.COLORS[6]
      }),
      App.create('rect', {
        width: 0.5,
        height: this.state.height * App.Const.STATS_CHART_RANGE_SELECTOR_HEIGHT_RATIO,
        x: this.state.unitWidth * maxIdx,
        y: this.state.height * (1-App.Const.STATS_CHART_RANGE_SELECTOR_HEIGHT_RATIO)/2,
        fill: App.Const.COLORS[6]
      })
    );
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

          document.removeEventListener('mousemove', onMouseMove);
          document.removeEventListener('mouseup', onMouseUp);
        }
      }
    });
  },
  createBarChart: function() {
    if (!this.isMounted()) return;
    return [
      this.createBarSequence(),
      this.createRangeSelector(),
      this.createInteractionLayer()
    ];
  },
  render: function() {
    if (this.state.width === 0) {
      return null;
    }

    this.createRangeSelector();

    return App.create('svg', { width: this.state.width, height: this.state.height },
      App.create('g', { children: this.createBarChart() })
    );
  }
});
