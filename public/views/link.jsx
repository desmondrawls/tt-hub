var React = require('react')

var Link = React.createClass({
  render: function(){
      return <a href='#' onClick={this.props.onClick}>{this.props.text}</a>
  }
})

module.exports = Link