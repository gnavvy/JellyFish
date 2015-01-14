App.View.ScatterPlot = React.createClass({
  displayName: 'ScatterPlot',
  propTypes: {
    containerId: React.PropTypes.string
  },
  renderer:     undefined,
  scene:        undefined,
  camera:       undefined,
  nodes:        undefined,
  edges:        undefined,
  getDefaultProps: function() {
    return {
      containerId: 'default-container',
      data: undefined
    };
  },
  getInitialState: function() {
    return {
      width:        0,
      height:       0,
      numNeighbors: 10,
      points: _.map(this.props.data, function(p) {
        return { 'x': p[0], 'y': p[1], 'val': p[2], 'cls': p[3], 'knn': p[4] };
      })
    };
  },
  componentWillMount: function() {
    this.renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true });
    this.scene = new THREE.Scene();
    this.camera = new THREE.OrthographicCamera();
    this.nodes = new THREE.PointCloud(new THREE.Geometry(), new THREE.PointCloudMaterial());
    this.edges = new THREE.Line(new THREE.Geometry(), new THREE.ShaderMaterial(), THREE.LinePieces);

    this.scene.add(this.camera);
    this.scene.add(this.nodes);
    this.scene.add(this.edges);
  },
  componentDidMount: function() {
    this.updateDimensions();
    this.updateGlContext();
    document.getElementById(this.props.containerId).appendChild(this.renderer.domElement);
    document.addEventListener("slider-value-changed-event", this.handleSliderValueChanged);
    window.addEventListener("resize", this.updateDimensions);
  },
  componentWillUnmount: function() {
    document.removeEventListener("slider-value-changed-event", this.handleSliderValueChanged);
    window.removeEventListener("resize", this.updateDimensions);
  },
  updateDimensions: function() {
    var container = $('#'+this.props.containerId);
    this.setState({ width: container.width(), height: container.width() });
  },
  shouldComponentUpdate: function(nextProps, nextState) {
    if (nextState.width !== this.state.width || nextState.height !== this.state.height) {
      console.log('dim:', this.state.width, this.state.height, '->', nextState.width, nextState.height);
      this.renderer.setSize(nextState.width, nextState.height);
      this.camera = new THREE.OrthographicCamera(-nextState.width, nextState.width,
        -nextState.height, nextState.height, -1, 1);
    }
    if (nextState.numNeighbors !== this.state.numNeighbors) {
      console.log('numNeighbors:', this.state.numNeighbors, '->', nextState.numNeighbors);
      this.updateGlContext();
    }
    return true;
  },
  handleSliderValueChanged: function(e) {
    if (e.detail.attributeId === 'Opacity') {
      this.setState({ edgeOpacity: e.detail.value});
    } else if (e.detail.attributeId === 'K') {
      this.setState({ numNeighbors: Math.round(e.detail.value * 10) });
    }
  },
  updateGlContext: function() {
    this.renderer.setSize(this.state.width, this.state.height);

    var w = this.state.width, h = this.state.height;
    this.camera = new THREE.OrthographicCamera(-w, w, -h, h, -1, 1);

    ///////////////////////////////////////////////////////////////////////////
    // init nodes /////////////////////////////////////////////////////////////
    ///////////////////////////////////////////////////////////////////////////

    var nodeColors = [];
    var points = this.state.points;
//    this.nodes.geometry.vertices.length = 0;
    for (var i = 0; i < points.length; i++) {
      this.nodes.geometry.vertices.push(new THREE.Vector3(
        points[i].x * this.state.width, points[i].y * this.state.height, 0
      ));
      nodeColors[i] = new THREE.Color(App.Const.COLORS[points[i].cls]);
    }
    this.nodes.geometry.colors = nodeColors;

    this.nodes.material.size = 2;
    this.nodes.material.sizeAttenuation = false;
    this.nodes.material.vertexColors = THREE.VertexColors;

    ///////////////////////////////////////////////////////////////////////////
    // init edges /////////////////////////////////////////////////////////////
    ///////////////////////////////////////////////////////////////////////////

    console.log(this.edges.material);

    this.edges.material.attributes = {
      customColor:   { type: 'c', value: [] },
      customOpacity: { type: 'f', value: [] }
    };
    this.edges.material.transparent = true;
    this.edges.material.linewidth = 1;
    this.edges.material.vertexShader = [
      'varying vec3 color;',
      'varying float opacity;',
      'attribute vec3 customColor;',
      'attribute float customOpacity;',
      'void main(void) {',
        'color = customColor;',
        'opacity = customOpacity;',
        'gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0);',
      '}'
    ].join('\n');
    this.edges.material.fragmentShader = [
      'varying vec3 color;',
      'varying float opacity;',
      'void main(void) {',
        'gl_FragColor = vec4(color, opacity);',
      '}'
    ].join('\n');

    this.edges.geometry.vertices.length = 0;
    this.edges.material.attributes.customColor.value.length = 0;
    this.edges.material.attributes.customOpacity.value.length = 0;

    for (var src = 0; src < points.length; src++) {
      for (var k = 0; k < this.state.numNeighbors; k++) {
        var p = points[src], q = points[points[src].knn[k]];
        this.edges.geometry.vertices.push(new THREE.Vector3(p.x * this.state.width, p.y * this.state.height, 0));
        this.edges.geometry.vertices.push(new THREE.Vector3(q.x * this.state.width, q.y * this.state.height, 0));
        this.edges.material.attributes.customColor.value.push(new THREE.Color(App.Const.COLORS[p.cls]));
        this.edges.material.attributes.customColor.value.push(new THREE.Color(App.Const.COLORS[q.cls]));
        this.edges.material.attributes.customOpacity.value.push(Math.sqrt((p.x-q.x)*(p.x-q.x)+(p.y-q.y)*(p.y-q.y))/4);
        this.edges.material.attributes.customOpacity.value.push(Math.sqrt((p.x-q.x)*(p.x-q.x)+(p.y-q.y)*(p.y-q.y))/4);
      }
    }

    console.log(this.edges.geometry.colors);

    // this.edges.geometry.colors = this.edges.material.attributes.customColor.value;
    this.edges.geometry.dynamic = true;
    this.edges.geometry.verticesNeedUpdate = true;

    this.renderer.render(this.scene, this.camera);

  },
  animate: function() {
    requestAnimationFrame(this.animate);
    this.update();
  },
  update: function() {
    // console.log(this.scene);
  },
  render: function() { return null; }
});
