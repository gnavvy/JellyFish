App.View.ControlPanel = React.createClass({
  render: function() {
    return React.createElement('form', {className: "form-horizontal"}, 
      React.createElement('div', {className: "form-group"},
        React.createElement('label', {className: "control-label col-sm-3"}, "Dataset: "),
        React.createElement('div', {className: "col-sm-9"},
          React.createElement('select', {name: "account", className: "form-control"}, 
            React.createElement('option', null, "UCI - Wine")
          )
        )
      ), 
      React.createElement('div', {className: "line line-dashed b-b line-lg pull-in"}),
      React.createElement('div', {className: "form-group m-b-xs"},
        React.createElement('label', {className: "padder clear"}, "Star Coordinate Layout"),
        React.createElement('div', {className: "padder col-sm-6"},
          React.createElement('div', {className: "radio i-checks padder-sm"}, 
            React.createElement('label', null, 
              React.createElement('input', {type: "radio", name: "a", value: "option1", checked: true}), 
              React.createElement("i", null), " Uniform "
            )
          ), 
          React.createElement('div', {className: "radio i-checks padder-sm"}, 
            React.createElement('label', null, 
              React.createElement('input', {type: "radio", name: "a", value: "option2"}), 
              React.createElement("i", null), " Orthogonal "
            )
          )
        ),
        React.createElement('div', {className: "padder col-sm-6"},
          React.createElement('div', {className: "radio i-checks padder-sm"}, 
            React.createElement('label', null, 
              React.createElement('input', {type: "radio", name: "a", value: "option3"}),
              React.createElement("i", null), " 180 degree "
            )
          ), 
          React.createElement('div', {className: "radio i-checks padder-sm"}, 
            React.createElement('label', null, 
              React.createElement('input', {type: "radio", name: "a", value: "option4"}),
              React.createElement("i", null), " Optimal "
            )
          )
        )
      ),
      React.createElement('div', {className: "line line-dashed b-b line-lg pull-in"}),
      React.createElement('div', {className: "form-group m-b-xs"},
        React.createElement('label', {className: "padder clear"}, "View-3 Configuration"),
        React.createElement('label', {className: "control-label col-sm-3"}, "Value: "),
        React.createElement('div', {className: "col-sm-9"}
          // TODO two knob slider
        )
      )
    );
  }
});
