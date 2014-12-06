App.View.ControlPanel = React.createClass({
  onAxisLayoutChanged: function(ev) {
    console.log(ev.target.value);
  },
  onDatasetChanged: function(ev) {
    console.log(ev.target.value);
  },
  onProjectorChanged: function(ev) {
    console.log(ev.target.value);
  },
  render: function() {
    return App.create('form', { className: "form-horizontal" },
      App.create('div', { className: "form-group" },
        App.create('label', { className: "control-label col-sm-3" }, "Dataset: "),
        App.create('div', { className: "col-sm-9" },
          App.create('select', { className: "form-control", onChange: this.onDatasetChanged },
            App.create('option', { value: 'wine' }, "Wine"),
            App.create('option', { value: 'caltech' }, "Caltech"),
            App.create('option', { value: 'simplex5' }, "Simplex 5"),
            App.create('option', { value: 'wdbc' }, "WDBC")
          )
        )
      ),

      App.create('div', { className: "line line-dashed b-b line-lg pull-in" }),

      App.create('div', { className: "form-group m-b-xs" },
        App.create('label', { className: "padder clear" }, "Star Coordinate Layout"),
        App.create('div', { className: "padder col-sm-6" },
          App.create('div', { className: "radio i-checks padder-sm" },
            App.create('label', null, 
              App.create('input', { type: "radio", name: "layout", value: App.Const.AXIS_LAYOUT_UNIFORM,
                onChange: this.onAxisLayoutChanged, defaultChecked: true
              }),
              App.create("i", null), " Uniform "
            )
          ), 
          App.create('div', { className: "radio i-checks padder-sm" },
            App.create('label', null, 
              App.create('input', { type: "radio", name: "layout", value: App.Const.AXIS_LAYOUT_ORTHOGONAL,
                onChange: this.onAxisLayoutChanged
              }),
              App.create("i", null), " Orthogonal "
            )
          )
        ),
        App.create('div', { className: "padder col-sm-6" },
          App.create('div', { className: "radio i-checks padder-sm" },
            App.create('label', null, 
              App.create('input', { type: "radio", name: "layout", value: App.Const.AXIS_LAYOUT_HALF,
                onChange: this.onAxisLayoutChanged
              }),
              App.create("i", null), " Half Circle "
            )
          ), 
          App.create('div', { className: "radio i-checks padder-sm" },
            App.create('label', null, 
              App.create('input', { type: "radio", name: "layout", value: App.Const.AXIS_LAYOUT_OPTIMAL,
                onChange: this.onAxisLayoutChanged
              }),
              App.create("i", null), " Optimal "
            )
          )
        )
      ),

      App.create('div', { className: "line line-dashed b-b line-lg pull-in" }),

      App.create('div', { className: "form-group" },
        App.create('label', { className: "control-label col-sm-3" }, "Projector: "),
        App.create('div', { className: "col-sm-9" },
          App.create('select', { className: "form-control", onChange: this.onProjectorChanged },
            App.create('option', { value: 'TSNE' }, "TSNE"),
            App.create('option', { value: 'MDS' }, "MDS"),
            App.create('option', { value: 'Spectral' }, "Spectral"),
            App.create('option', { value: 'Isomap' }, "Isomap")
          )
        )
      )


//      App.create("div", {className: "slider slider-horizontal", style: "width: 210px;"},
//        App.create("div", {className: "slider-track"},
//        App.create("div", {className: "slider-selection", style: "left: 0%; width: 33.3333333333333%;"}),
//        App.create("div", {className: "slider-handle round", style: "left: 33.3333333333333%;"}),
//        App.create("div", {className: "slider-handle round hide", style: "left: 0%;"})
//      ),
//      App.create("div", {className: "tooltip top", style: "top: -30px; left: 56px;"},
//        App.create("div", {className: "tooltip-arrow"}),
//        App.create("div", {className: "tooltip-inner"}, "10")
//      ),
//      App.create("input", {className: "slider slider-horizontal form-control", type: "text", value: "", 'data-slider-min': "5", 'data-slider-max': "20",
//         'data-slider-step': "1", 'data-slider-value': "10", 'data-slider-orientation': "horizontal"})
//      )

    );
  }
});
