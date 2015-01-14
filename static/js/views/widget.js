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
      clss = JSON.parse(res.cls),
      knns = JSON.parse(res.knn);

    var points = _.zip(xs, ys, vals, clss, knns.data);
    var histogram = App.Util.getHistogram(vals);

    // header content
    if (this.props.options.showHeader) {
      document.getElementById(this.state.headerId).innerHTML = this.props.context.method;
    }

    // body content
    // App.render(App.View.ScatterPlotSvg({
    App.render(App.View.ScatterPlot({
      containerId: this.state.bodyId, data: points
    }), document.getElementById(this.state.bodyId));

    // footer content
    if (this.props.options.showFooter) {
      App.render(App.View.StatsChart({
        containerId: this.state.footerId, data: histogram
      }), document.getElementById(this.state.footerId));
    }
  },
  render: function() {
    return App.create('section', { className: 'panel panel-default' },
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
