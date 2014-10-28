app.view.ControlPanel = React.createClass({
  render: function() {
    return React.DOM.form({className: "form-horizontal"}, 
      React.DOM.div({className: "form-group"}, 
        React.DOM.label({className: "control-label col-sm-2"}, "Data: "), 
        React.DOM.div({className: "col-sm-10"}, 
          React.DOM.select({name: "account", className: "form-control"}, 
            React.DOM.option(null, "UCI - Wine")
          )
        )
      ), 
      React.DOM.div({className: "line line-dashed b-b line-lg pull-in"}), 
      React.DOM.div({className: "form-group m-b-xs"}, 
        React.DOM.label({className: "control-label padder"}, "Layout Algorithms"), 
        React.DOM.div({className: "padder"}, 
          React.DOM.div({className: "radio i-checks padder-sm"}, 
            React.DOM.label(null, 
              React.DOM.input({type: "radio", name: "a", value: "option1", checked: true}), 
              React.DOM.i(null), " Uniform"
            )
          ), 
          React.DOM.div({className: "radio i-checks padder-sm"}, 
            React.DOM.label(null, 
              React.DOM.input({type: "radio", name: "a", value: "option2"}), 
              React.DOM.i(null), " Orthogonal"
            )
          ), 
          React.DOM.div({className: "radio i-checks padder-sm"}, 
            React.DOM.label(null, 
              React.DOM.input({type: "radio", name: "a", value: "option2"}), 
              React.DOM.i(null), " 180 degree"
            )
          ), 
          React.DOM.div({className: "radio i-checks padder-sm"}, 
            React.DOM.label(null, 
              React.DOM.input({type: "radio", name: "a", value: "option2"}), 
              React.DOM.i(null), " Optimal"
            )
          )
        )
      )
    );
  }
});
