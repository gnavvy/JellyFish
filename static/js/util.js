App.Util.PathComposer = d3.svg.line().x(function(d) { return d.x; })
  .y(function(d) { return d.y; }).interpolate("cardinal").tension(0.75);

App.Util.getHistogram = function(array, numBins) {
  array = array || [];
  numBins = numBins || App.Const.STATS_CHART_NUM_BINS;

  var histogram = new Array(numBins);
  for (var i = 0; i < numBins;) {
    histogram[i++] = 0;
  }

  _.chain(array).countBy(function(v) {
    return Math.floor(v * numBins);
  }).each(function(count, idx) {
    histogram[idx] = count;
  });

  var max = Math.max.apply(Math, histogram);
  return _.map(histogram, function(bin) {
    return bin / max;
  });
};

App.Util.bound = function(val, lowerBound, upperBound) {
  return Math.min(Math.max(val, lowerBound), upperBound);
};

App.Mixin.SvgCircleMinxin = {
  propTypes: {
    x:           React.PropTypes.number,
    y:           React.PropTypes.number,
    radius:      React.PropTypes.number,
    color:       React.PropTypes.string,
    fillOpacity: React.PropTypes.number,
    strokeWidth: React.PropTypes.number
  }
}

// portlet
$('.portlet').each(function() {
  $(".portlet").sortable({
    connectWith: '.portlet',
    iframeFix: true,
    items: '.portlet-item',
    opacity: 0.5,
    helper: 'original',
    revert: true,
    forceHelperSize: true,
    placeholder: 'sortable-box-placeholder round-all',
    forcePlaceholderSize: true,
    tolerance: 'pointer'
  });
});