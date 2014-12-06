(function() {
  "use strict";

  App.socket = io.connect('http://' + document.domain + ':' + location.port);
  App.socket.on('connect', function() {
    App.socket.emit('my event', { data: 'I\'m connected!' });
  });
  App.socket.on('handshake', function(msg) {
    console.log('handshake: ', msg.data);
  });

  App.render(App.View.ControlPanel(), document.getElementById('control-panel'));

  // App.render(App.View.Compass(), document.getElementById('compass'));
  // App.render(App.View.Matrix({ containerId: 'matrix' }), 
  //   document.getElementById('matrix')
  // );

  App.render(App.View.Widget({ componentId: 'tsne-widget', context: { method: 'TSNE' } }),
    document.getElementById('tsne')
  );

  // App.render(App.View.Widget({ componentId: 'mds-widget', context: { method: 'MDS' } }),
  //   document.getElementById('mds')
  // );

  // App.render(App.View.Widget({ componentId: 'spectral-widget', context: { method: 'Spectral' } }),
  //   document.getElementById('spectral')
  // );

  // App.render(App.View.Widget({ componentId: 'isomap-widget', context: { method: 'Isomap' } }),
  //   document.getElementById('isomap')
  // );

})();