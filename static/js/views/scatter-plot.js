App.View.ScatterPlot = React.createClass({
  displayName: 'ScatterPlot',
  propTypes: {
    containerId: React.PropTypes.string
  },
  getDefaultProps: function() {
    return {
      containerId: 'default-container',
      data: undefined
    };
  },
  getInitialState: function() {
    return {
      width:    0,
      height:   0,
      renderer: undefined,
      camera:   undefined,
      scene:    undefined,
      points: _.map(this.props.data, function(p) { 
        return { 'x': p[0], 'y': p[1], 'val': p[2], 'cls': p[3], 'knn': p[4] }; 
      }),
      edgeOpacity: 0.1,
      numNeighbors: 10
    };
  },
  componentDidMount: function() {
    this.updateDimensions();    
    this.initWebGlContext();
    document.getElementById(this.props.containerId).appendChild(this.state.renderer.domElement);
    window.addEventListener("resize", this.updateDimensions);
    this.updateDimensions();
  },
  componentWillUnmount: function() {
    window.removeEventListener("resize", this.updateDimensions);
  },
  updateDimensions: function() {
    this.setState({
      width: document.getElementById(this.props.containerId).clientWidth,
      height: document.getElementById(this.props.containerId).clientWidth
    });
  },
  initWebGlContext: function() {
    var renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true });
    renderer.setSize(this.state.width, this.state.height);

    var w = this.state.width, h = this.state.height;
    var camera = new THREE.OrthographicCamera(-w, w, -h, h, -1, 1);
    var scene = new THREE.Scene();
    scene.add(camera);
    
    scene.add(this.initEdges());
    scene.add(this.initNodes());

    this.setState({ renderer: renderer, camera: camera, scene: scene });
  },
  initNodes: function() {
    var points = this.state.points;

    var nodeColors = [];
    var nodeGeometry = new THREE.Geometry();
    var nodeMaterial = new THREE.PointCloudMaterial({
      size: 2, sizeAttenuation: false, vertexColors: THREE.VertexColors
    });
    for (var i = 0; i < points.length; i++) {
      nodeGeometry.vertices.push(new THREE.Vector3(
        points[i].x * this.state.width, points[i].y * this.state.height, 0
      ));
      nodeColors[i] = new THREE.Color(App.Const.COLORS[points[i].cls]);
    }
    nodeGeometry.colors = nodeColors;

    return new THREE.PointCloud(nodeGeometry, nodeMaterial);
  },
  initEdges: function() {
    var edgeMaterial = new THREE.ShaderMaterial( {
      attributes: { 
        customColor:   { type: 'c', value: [] },
        customOpacity: { type: 'f', value: [] }
      },
      transparent:    true,
      vertexShader:   [
        'varying vec3 color;',
        'varying float opacity;',
        'attribute vec3 customColor;',
        'attribute float customOpacity;',
        'void main(void) {',
          'color = customColor;',
          'opacity = customOpacity;',
          'gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0);',
        '}'
      ].join('\n'),
      fragmentShader: [
        'varying vec3 color;',
        'varying float opacity;',
        'void main(void) {',
          'gl_FragColor = vec4(color, opacity);',
        '}'
      ].join('\n')
    });
    edgeMaterial.linewidth = 1;

    var edgeColors = edgeMaterial.attributes.customColor.value;
    var edgeOpacities = edgeMaterial.attributes.customOpacity.value;
    var edgeGeometry = new THREE.Geometry();
    var maxDistance = this.state.width * 1.414;

    var points = this.state.points;
    for (var src = 0; src < points.length; src++) {
      for (var k = 0; k < this.state.numNeighbors; k++) {
        var tgt = points[src].knn[k];
        edgeGeometry.vertices.push(new THREE.Vector3(
          points[src].x * this.state.width, points[src].y * this.state.height, 0
        ));
        edgeGeometry.vertices.push(new THREE.Vector3(
          points[tgt].x * this.state.width, points[tgt].y * this.state.height, 0
        ));
        edgeColors.push(new THREE.Color(App.Const.COLORS[points[src].cls]));
        edgeColors.push(new THREE.Color(App.Const.COLORS[points[tgt].cls]));

        var dx = points[src].x - points[tgt].x;
        var dy = points[src].y - points[tgt].y;
        var d = Math.sqrt((dx * dx + dy * dy) / 16);

        edgeOpacities.push(d);
        edgeOpacities.push(d);
      }
    }
    edgeGeometry.colors = edgeColors;

    return new THREE.Line(edgeGeometry, edgeMaterial, THREE.LinePieces);
  },
  animate: function() {
    this.state.renderer.setSize(this.state.width, this.state.height);
    requestAnimationFrame(this.animate);
    this.render();
  },
  render: function() {
    if (this.state.renderer !== undefined) {
      this.state.renderer.render(this.state.scene, this.state.camera);
    }
    return null;
  }
});
