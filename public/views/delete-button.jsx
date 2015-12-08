var React = require('react')
var _ = require('lodash')

var DeleteButton = React.createClass({
    render: function(){
        return (
            <form method='POST' action={this.props.action + '?_method=DELETE'} >
                <input type='submit' value='Delete'/>
            </form>
        )
    }
})

module.exports = DeleteButton