(function() {
  "use strict";

  app.socket = io.connect('http://' + document.domain + ':' + location.port);
  app.socket.on('connect', function() {
    app.socket.emit('my event', { data: 'I\'m connected!' });
  });
  app.socket.on('handshake', function(msg) {
    console.log('handshake: ', msg.data);
  });

  React.renderComponent(app.view.ControlPanel(), document.getElementById('control-panel'));
  React.renderComponent(app.view.Compass(), document.getElementById('compass'));
  React.renderComponent(app.view.Matrix(), document.getElementById('matrix'));
})();