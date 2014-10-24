app.util.PathComposer = 
  d3.svg.line()
        .x(function(d) { return d.x; })
        .y(function(d) { return d.y; })
        .interpolate("cardinal")
        .tension(0.75);