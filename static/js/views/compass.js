App.View.Compass = React.createClass({
  getInitialState: function() {
    return {
    axes: [{
        "c": 0,
        "data": {
            0.0: 0,
            1.0: 0.0,
            0.4: 0.0,
            0.8: 0.0,
            0.6: 0.0,
            0.2: 0.0
        },
        "w": 2
    }, {
        "c": 1,
        "data": {
            0.0: 0,
            1.0: 0.91166303345136745,
            0.4: 0.14014073945823363,
            0.8: 0.080426174541341697,
            0.6: 0.22531503900414754,
            0.2: 0.079597682349101265
        },
        "w": 2
    }, {
        "c": 2,
        "data": {
            0.0: 0,
            1.0: 0.01932239496547733,
            0.4: 0.96112990921916008,
            0.8: 0.0059820555542185105,
            0.6: 0.97721489579993104,
            0.2: 0.0095303853313050135
        },
        "w": 2
    }, {
        "c": 3,
        "data": {
            0.0: 0,
            1.0: 0.38373327044866989,
            0.4: 0.70793719717168369,
            0.8: 0.53219982881534178,
            0.6: 0.60648864582324113,
            0.2: 0.66275966939453845
        },
        "w": 2
    }, {
        "c": 4,
        "data": {
            0.0: 0,
            1.0: 0.31882903362279424,
            0.4: 0.75004379258783682,
            0.8: 0.54638445992553697,
            0.6: 0.62866493379396571,
            0.2: 0.71395968248890607
        },
        "w": 2
    }, {
        "c": 5,
        "data": {
            0.0: 0,
            1.0: 0.38898592284081229,
            0.4: 0.67597043319261418,
            0.8: 0.51920689414458709,
            0.6: 0.58255796113249403,
            0.2: 0.65634714636382407
        },
        "w": 2
    }, {
        "c": 6,
        "data": {
            0.0: 0,
            1.0: 0.37621619594580463,
            0.4: 0.69823802309173366,
            0.8: 0.52446284012507594,
            0.6: 0.62458213493657333,
            0.2: 0.65067014366097309
        },
        "w": 2
    }, {
        "c": 7,
        "data": {
            0.0: 0,
            1.0: 0.38897583673403707,
            0.4: 0.67604159928441165,
            0.8: 0.51920744691072096,
            0.6: 0.58255144655484203,
            0.2: 0.65642689005914534
        },
        "w": 2
    }, {
        "c": 8,
        "data": {
            0.0: 0,
            1.0: 0.40287300810729754,
            0.4: 0.67552669316092562,
            0.8: 0.54256744980189997,
            0.6: 0.62799745882426994,
            0.2: 0.65898377930254681
        },
        "w": 2
    }, {
        "c": 9,
        "data": {
            0.0: 0,
            1.0: 0.40734511694759096,
            0.4: 0.67782009169337976,
            0.8: 0.53862364154067144,
            0.6: 0.62990928980985783,
            0.2: 0.65752016640750477
        },
        "w": 2
    }, {
        "c": 10,
        "data": {
            0.0: 0,
            1.0: 0.39510751875266731,
            0.4: 0.65850512077906997,
            0.8: 0.53508327504224296,
            0.6: 0.61420062176514534,
            0.2: 0.65324370438703483
        },
        "w": 2
    }, {
        "c": 11,
        "data": {
            0.0: 0,
            1.0: 0.39932760569049291,
            0.4: 0.66318180356108725,
            0.8: 0.53149987525822251,
            0.6: 0.62822472576152222,
            0.2: 0.64575648207744951
        },
        "w": 2
    }, {
        "c": 12,
        "data": {
            0.0: 0,
            1.0: 0.41730122143948489,
            0.4: 0.6961264403360381,
            0.8: 0.5443424635413846,
            0.6: 0.64934813129513302,
            0.2: 0.65597134675312141
        },
        "w": 2
    }, {
        "c": 13,
        "data": {
            0.0: 0,
            1.0: 0.39510342921744418,
            0.4: 0.65850670842955328,
            0.8: 0.53508783938748428,
            0.6: 0.61420741701812087,
            0.2: 0.65324097762744793
        },
        "w": 2
    }, {
        "c": 14,
        "data": {
            0.0: 0,
            1.0: 0.45279961863036494,
            0.4: 0.61665671754945262,
            0.8: 0.52943261600447145,
            0.6: 0.54673340277867954,
            0.2: 0.60622930067827285
        },
        "w": 2
    }, {
        "c": 15,
        "data": {
            0.0: 0,
            1.0: 0.68129863042784711,
            0.4: 0.95393003502166029,
            0.8: 0.91240322599232415,
            0.6: 0.97812880564076188,
            0.2: 0.98196122045378886
        },
        "w": 2
    }, {
        "c": 16,
        "data": {
            0.0: 0,
            1.0: 0.64407595395124095,
            0.4: 0.089479654762665409,
            0.8: 0.85520012148276725,
            0.6: 0.89310344296988708,
            0.2: 0.10436099643415717
        },
        "w": 2
    }, {
        "c": 17,
        "data": {
            0.0: 0,
            1.0: 0.97764158199486906,
            0.4: 0.080716386439455001,
            0.8: 0.1893248353668385,
            0.6: 0.15945023145907086,
            0.2: 0.10212205978130513
        },
        "w": 2
    }, {
        "c": 18,
        "data": {
            0.0: 0,
            1.0: 0.34027393096577491,
            0.4: 0.80754180356168226,
            0.8: 0.6773403958278682,
            0.6: 0.78815870734982107,
            0.2: 0.73561000506713636
        },
        "w": 2
    }, {
        "c": 19,
        "data": {
            0.0: 0,
            1.0: 0.64390618301623925,
            0.4: 0.04541895074439594,
            0.8: 0.85767522053556844,
            0.6: 0.99337941379642813,
            0.2: 0.91984271257688222
        },
        "w": 2
    }, {
        "c": 20,
        "data": {
            0.0: 0,
            1.0: 0.68448860470129635,
            0.4: 0.1237960027621902,
            0.8: 0.8350382049973657,
            0.6: 0.95826147737085032,
            0.2: 0.93966178695981761
        },
        "w": 2
    }, {
        "c": 21,
        "data": {
            0.0: 0,
            1.0: 0.34097138796108228,
            0.4: 0.7918268602255728,
            0.8: 0.64023218524091297,
            0.6: 0.77682810415295556,
            0.2: 0.72070902985717822
        },
        "w": 2
    }],

      points: undefined,
      width:  0,
      height: 0
    };
  },
  componentDidMount: function() {
    this.updateDimensions();
    window.addEventListener("resize", this.updateDimensions);
//    App.socket.emit('compass:mounted');
//    App.socket.on('compass:data', this.updateCompass);
  },
  componentWillUnmount: function() {
    window.removeEventListener("resize", this.updateDimensions);
  },
  updateDimensions: function() {
    var size = document.getElementById('compass').clientWidth;
    this.setState({ width: size, height: size });
  },
  updateCompass: function(res) {
    var axes = _.map(JSON.parse(res.axes), function(axis) {
      return { 'c': 1, 'w': 3, 'data': axis };
    });

    var points = _.map(JSON.parse(res.data), function(p) {
      return { 'c': 3, 'w': 2, 'data': p };
    });

    this.setState({ axes: axes, points: points });
  },
  composeAxes: function(cx, cy, r) {
    return _.map(this.state.axes, function(axis) {
      return App.create(App.View.Axis, {
        cx:          cx, 
        cy:          cy, 
        radius:      r, 
        color:       App.Const.COLORS[axis.c%10],
        strokeWidth: axis.w,
        data:        axis.data
      });
    });
  },
  plotPoints: function(cx, cy, r) {
    return _.map(this.state.points, function(axis) {
      return App.create(App.View.Axis, {
        cx:          cx, 
        cy:          cy, 
        radius:      r, 
        color:       App.Const.COLORS[axis.c],
        strokeWidth: axis.w,
        data:        axis.data
      });
    });
  },
  constructCompass: function() {
    if (this.state.width === 0 || this.state.height === 0) {
      return;
    }

    var cx = this.state.width / 2;
    var cy = this.state.height / 2;
    
    return App.create('g', null,
      App.create('circle', { cx: cx, cy: cy, r: cx*0.90, stroke: "#eee", fillOpacity: 0 }),
      App.create('circle', { cx: cx, cy: cy, r: cx*0.45, stroke: "#eee", fillOpacity: 0 }),
      App.create('line', { x1: cx, y1: cy, x2: cx* 2, y2: cy, stroke: "#eee"}),
      App.create('line', { x1: cx, y1: cy, x2: cx, y2: cy* 2, stroke: "#eee"}),
      App.create('line', { x1: cx, y1: cy, x2: cx*-2, y2: cy, stroke: "#eee"}),
      App.create('line', { x1: cx, y1: cy, x2: cx, y2: cy*-2, stroke: "#eee"}),
      App.create('g', { children: this.composeAxes(cx, cy, cx*0.9) }),
//      App.create('g', { children: this.plotPoints(cx, cy, cx*0.9) }),
      App.create('circle', { cx: cx, cy: cy, r: cx * 0.03, stroke: "#eee", fill: "#fff" })
    );
  },
  render: function() {
    return App.create('svg', {
      width: this.state.width, 
      height: this.state.height 
    }, this.constructCompass());
  }
});
