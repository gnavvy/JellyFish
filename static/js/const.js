var App = { Model: {}, View: {}, Util: {}, Const: {}, Mixin: {} };

// aliases, in case of API change
App.create = React.createElement;
App.render = React.render;
App.types  = React.PropTypes;

App.Const.COLORS5 = ["#B1B1B1", "#548BD4", "#FF66CC", "#9DBB61", "#F59D56"];
App.Const.COLORS10a = ["#E6E9ED", "#ED5565", "#4FC1E9", "#FFCE54", "#AC92EC", "#A0D468", "#5D9CEC", "#FC6E51", "#48CFAD", "#EC87C0"];
App.Const.COLORS10b = ["#CCD1D9", "#DA4453", "#3BAFDA", "#F6BB42", "#967ADC", "#8CC152", "#4A89DC", "#E9573F", "#37BC9B", "#D770AD"];
App.Const.COLORS = App.Const.COLORS10b;

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
App.Const.STATS_CHART_RANGE_SELECTOR_HEIGHT_RATIO = 0.6;