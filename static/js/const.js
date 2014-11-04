var App = { Model: {}, View: {}, Util: {}, Const: {}, Mixin: {} };

// aliases, in case of API change
App.create = React.createElement;
App.render = React.render;
App.types  = React.PropTypes;

App.Const.COLORS = ["#B1B1B1", "#548BD4", "#FF66CC", "#9DBB61", "#F59D56"];
App.Const.AXIS_KNOB_SIZE = 4;
App.Const.AXIS_KNOB_STROKE_WIDTH = 2;

App.Const.AXIS_LAYOUT_UNIFORM    = 0;
App.Const.AXIS_LAYOUT_HALF       = 1;
App.Const.AXIS_LAYOUT_ORTHOGONAL = 2;
App.Const.AXIS_LAYOUT_OPTIMAL    = 3;

App.Const.RANGE_SELECTOR_TRACK_HEIGHT = 4;
App.Const.RANGE_SELECTOR_TRACK_RADIUS = 2;
App.Const.RANGE_SELECTOR_KNOB_RADIUS = 10;

App.Const.STATS_CHART_NUM_BINS = 25;
App.Const.STATS_CHART_SPAN_RATIO = 0.2;
App.Const.STATS_CHART_RANGE_SELECTOR_HEIGHT_RATIO = 0.6
;