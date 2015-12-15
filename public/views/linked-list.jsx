var React = require('react')
var ListItem = require('./list-item.jsx')
var _ = require('lodash')

var LinkedList = React.createClass({
    render: function(){
        var context = this

        function items(items) {
            return _.map(items, function (item) {
                return (
                    <ListItem item={item} chain={context.props.chain} templateInput={context.props.templateInput}/>
                )
            })
        }

        return <ul>{items(context.props.items)}</ul>
    }
})

module.exports = LinkedList