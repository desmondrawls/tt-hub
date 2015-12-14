var React = require('react')
var queriesHelper = require('./../../helpers/collectionJson/queries.js')
var _ = require('lodash')

var QueryCheckbox = React.createClass({
    render: function(){
        return (
            <span className="query-param">
                <input
                    type="checkbox"
                    name={this.getName()}
                    checked={this.getValue() ? "checked" : null}
                    onClick={this.onClick}/>
                <span>{this.getName()}</span>
            </span>
        )
    },

    onClick: function(event) {
        var query = _.clone(this.props.store.fetch(), true)
        var newQueryData = queriesHelper.copyDataWithValue(this.props.param, event.target.checked)
        query.data = queriesHelper.mergeData(queriesHelper.getData(query), newQueryData)
        this.props.store.update(query)
    },

    getName: function() {
        return queriesHelper.getDataName(this.props.param)
    },

    getValue: function() {
        return queriesHelper.getDataValue(this.props.param)
    }
})

module.exports = QueryCheckbox