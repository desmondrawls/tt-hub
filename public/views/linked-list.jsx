var React = require('react')
var itemsHelper = require('./../../helpers/collectionJson/items.js')
var _ = require('lodash')

var LinkedList = React.createClass({

    render: function(){
        var context = this

        function items(items) {
            return _.map(items, function (item) {
                return (
                    <li>
                        <a href={itemsHelper.getLink(item)}>{context.props.textFormatter(item)}</a>
                    </li>
                )
            })
        }

        return <ul>{items(this.props.items)}</ul>
    }
})

module.exports = LinkedList