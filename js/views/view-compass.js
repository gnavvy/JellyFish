App.View.Compass = React.createClass({
  getInitialState: function() {
    return {
      width:   0,
      height:  0,
      numCols: 20,
      numRows: 20,
      data:    {}
    };
  },
  componentDidMount: function() {
    this.updateDimensions();
    this.constructMatrix();
    window.addEventListener("resize", this.updateDimensions);
  },
  componentWillUnmount: function() {
    window.removeEventListener("resize", this.updateDimensions);
  },
  updateDimensions: function() {
    var size = document.getElementById('compass').clientWidth;
    this.setState({ width: size, height: size });
  },
  constructMatrix: function() {
    if (this.state.width === 0 || this.state.height === 0) {
      return;
    }

    var elSize = this.state.width / this.state.numCols;

    var _this = this;
    var elements = _.range(this.state.numRows * this.state.numCols);
    elements = _.map(elements, function(el, idx) {
      return React.DOM.rect({
        className: "matrix-element",
        width:      elSize * 0.9,
        height:     elSize * 0.9,
        x:          elSize * (idx % _this.state.numCols) + elSize * 0.1,
        y:          elSize * Math.floor(idx / _this.state.numRows) + elSize * 0.1,
        rx:         elSize * 0.1,
        ry:         elSize * 0.1,
        fill:      "#55d",
        fillOpacity: _.random(10, 100)/100
      });
    });

    return elements;
  },
  render: function() {
    var matrix = this.constructMatrix();
    return React.DOM.svg({ width: this.state.width, height: this.state.height },
      React.DOM.g({ children: matrix })
    );
  }
});
