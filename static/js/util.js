App.Util.PathComposer = d3.svg.line().x(function(d) { return d.x; })
  .y(function(d) { return d.y; }).interpolate("cardinal").tension(0.75);

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
    iframeFix: false,
    items: '.portlet-item',
    opacity: 0.6,
    helper: 'original',
    revert: true,
    forceHelperSize: true,
    placeholder: 'sortable-box-placeholder round-all',
    forcePlaceholderSize: true,
    tolerance: 'pointer'
    });
  });