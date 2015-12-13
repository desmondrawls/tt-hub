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
        var query = _.clone(this.props.store.fetch(), true)
        var newQueryData = queriesHelper.copyDataWithValue(this.props.param, event.target.value)
        query.data = queriesHelper.mergeData(queriesHelper.getData(query), newQueryData)
        this.props.store.update(query)
    },

    getName: function() {
        return queriesHelper.getDataName(this.props.param)
    }
})

module.exports = QueryTextbox