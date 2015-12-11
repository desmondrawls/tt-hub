var React = require('react')
var queriesHelper = require('./../../helpers/collectionJson/queries.js')
var _ = require('lodash')

var QueryTextbox = React.createClass({
    render: function(){
        return (
            <span>
                <label>{this.getName()} : </label>
                <input
                    type="text"
                    name={this.getName()}
                    onChange={this.onChange}/>
            </span>
        )
    },

    onChange: function(event) {
        var context = this
        var newObject = _.clone(context.props.store.fetch(), true)
        var newQueryData = queriesHelper.copyDataWithValue(this.props.queryData, event.target.value)
        var queryToChange = _.find(newObject.collection.queries, function(query){ return query.name == context.props.query.name })
        queryToChange.data[0] = newQueryData
        this.props.store.update(newObject)
    },

    getName: function() {
        return queriesHelper.getDataName(this.props.queryData)
    },

    getValue: function() {
        return queriesHelper.getDataValue(this.state.queryData)
    },

    getDefaultValue: function() {
        return queriesHelper.getDataValue(this.props.queryData)
    }
})

module.exports = QueryTextbox