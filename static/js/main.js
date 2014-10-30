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
  React.render(App.View.Matrix(), document.getElementById('matrix'));
  React.render(App.View.ScatterPlot({ id: 'TSNE' }), document.getElementById('view-3'));
  React.render(App.View.ScatterPlot({ id: 'MDS' }), document.getElementById('view-4'));
})();