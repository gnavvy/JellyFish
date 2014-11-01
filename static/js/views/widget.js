App.View.Widget = React.createClass({
  displayName: 'Widget',
  propTypes: {
    componentId:  App.types.string,
    context:      App.types.shape({
      showHeader: App.types.bool,
      showFooter: App.types.bool,
      isPortlet:  App.types.bool,
      isLeftmost: App.types.bool
    })
  },
  getDefaultProps: function() {
    return {
      componentId: 'default-widget',
      context: {
        method: 'default-method'
      },
      options: {
        showHeader: true,
        showFooter: true,
        isPortlet:  false,
        isLeftmost: false
      }
    };
  },
  getInitialState: function() {
    return {
      points:   undefined,
      width:    0,
      height:   0,
      headerId: this.props.componentId + '-header',
      bodyId:   this.props.componentId + '-body',
      footerId: this.props.componentId + '-footer'
    };
  },
  componentDidMount: function() {
    App.socket.emit('widget:mounted', { method: this.props.context.method });
    App.socket.on(this.props.context.method+':data', this.renderWidgetContent);
  },
  renderWidgetContent: function(res) {
    var xs = JSON.parse(res.x),
        ys = JSON.parse(res.y),
      vals = JSON.parse(res.val),
      clss = JSON.parse(res.cls);

    var points = _.zip(xs, ys, vals, clss);

    var histogram = new Array(App.Const.STATS_CHART_NUM_SEGMENTS);
    for (var i = 0; i < App.Const.STATS_CHART_NUM_SEGMENTS;) {
      histogram[i++] = 0;
    }  // there should be a more concise way of doing this

    _.chain(vals).countBy(function(v) {
      return Math.floor(v * App.Const.STATS_CHART_NUM_SEGMENTS);
    }).each(function(count, idx) {
      histogram[idx] = count;
    });

    var max = Math.max.apply(Math, histogram);
    histogram = _.map(histogram, function(bin) {
      return bin / max;
    });

    // ----------------------------------------

    // header content
    if (this.props.options.showHeader) {
      document.getElementById(this.state.headerId).innerHTML = this.props.context.method;
    }

    // body content
    App.render(App.View.ScatterPlot({
        containerId: this.state.bodyId, data: points
    }), document.getElementById(this.state.bodyId));

    // footer content
    if (this.props.options.showFooter) {
      App.render(App.View.StatsChart({
          containerId: this.state.footerId, data: histogram
      }), document.getElementById(this.state.footerId))
    }
  },
  render: function() {
    return App.create('section', { className: 'panel panel-info' },
      // header
      this.props.options.showHeader ? App.create('header', {
          className: 'panel-heading', id: this.state.headerId
        }
      ) : null,
      // body
      App.create('section', { className: 'panel-body' },
        App.create('div', { id: this.state.bodyId })
      ),
      // footer
      this.props.options.showFooter ? App.create('footer', { className: 'panel-footer' },
        App.create('div', { id: this.state.footerId })
      ) : null
    );
  }
});
