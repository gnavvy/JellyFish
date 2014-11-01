(function() {
  "use strict";

  App.socket = io.connect('http://' + document.domain + ':' + location.port);
  App.socket.on('connect', function() {
    App.socket.emit('my event', { data: 'I\'m connected!' });
  });
  App.socket.on('handshake', function(msg) {
    console.log('handshake: ', msg.data);
  });

  React.render(App.View.ControlPanel(), document.getElementById('control-panel'));
  React.render(App.View.Compass(), document.getElementById('compass'));

  React.render(App.View.Matrix({
    containerId: 'matrix'
  }), document.getElementById('matrix'));

  App.render(App.View.Widget({
      componentId: 'tsne-widget',
      context: { method: 'TSNE' }
    }),
    document.getElementById('column-2')
  );

//  React.render(App.View.ScatterPlot({
//    method: 'TSNE', containerId: 'view-3'
//  }), document.getElementById('view-3'));
//
//  React.render(App.View.StatsChart({
//    containerId: 'stats-3'
//  }), document.getElementById('stats-3'));

//  React.render(App.View.ScatterPlot({
//    method: 'MDS', containerId: 'view-4'
//  }), document.getElementById('view-4'));

  React.render(App.View.ScatterPlot({
    method: 'Spectral', containerId: 'view-5'
  }), document.getElementById('view-5'));

  React.render(App.View.ScatterPlot({
    method: 'Isomap', containerId: 'view-6'
  }), document.getElementById('view-6'));

})();