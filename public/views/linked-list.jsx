var React = require('react')
var itemsHelper = require('./../../helpers/collectionJson/items.js')
var attributesHelper = require('./../../helpers/collectionJson/attributes.js')
var _ = require('lodash')
var Details = require('./details.jsx')

var LinkedList = React.createClass({

    render: function(){
        var context = this

        function items(items) {
            return _.map(items, function (item) {
                return (
                    <li className="tt-item">
                        <a href={itemsHelper.getLink(item)}>{context.props.textFormatter(item)}</a>
                        <Details
                            attributes={context.getItemAttributes(item)}
                            onChange={context.handleAttributeChange}
                            edit={false}
                        />
                    </li>
                )
            })
        }

        return <ul>{items(this.props.items)}</ul>
    },

    handleAttributeChange: function(){
    },

    getItemAttributes: function(item){
        console.log("ITEM TO SHOW", item)
        return attributesHelper.getItemAttributes(item)
    }
})

module.exports = LinkedList