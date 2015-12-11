var React = require('react')
var queriesHelper = require('./../../helpers/collectionJson/queries.js')
var _ = require('lodash')

var QueryCheckbox = React.createClass({
    render: function(){
        console.log("BOTTOM DEETS", this.props.queryData)
        return (
            <span>
                <input
                    type="checkbox"
                    name={this.getName()}
                    defaultValue={this.getDefaultValue()}
                    checked={this.getValue() ? "checked" : null}
                    onClick={this.onClick}/>
                <span>{this.getName()}</span>
            </span>
        )
    },

    onClick: function(event) {
        var context = this
        var newObject = _.clone(context.props.store.fetch(), true)
        var newQueryData = queriesHelper.copyDataWithValue(this.props.queryData, event.target.checked)
        var queryToChange = _.find(newObject.collection.queries, function(query){ return query.name == context.props.query.name })
        queryToChange.data[0] = newQueryData
        this.props.store.update(newObject)
    },

    getName: function() {
        return queriesHelper.getDataName(this.props.queryData)
    },

    getValue: function() {
        return queriesHelper.getDataValue(this.props.queryData)
    },

    getDefaultValue: function() {
        return queriesHelper.getDataValue(this.props.queryData)
    }
})

module.exports = QueryCheckbox