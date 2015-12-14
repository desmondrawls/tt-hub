var React = require('react')
var queriesHelper = require('./../../helpers/collectionJson/queries.js')
var _ = require('lodash')

var QueryTextbox = React.createClass({
    render: function(){
        return (
            <span className="query-param">
                <label>{this.getName()} : </label>
                <input
                    type="text"
                    name={this.getName()}
                    value={this.props.param.value}
                    onChange={this.onChange}/>
                <span onClick={this.toggleEnabled}>{this.props.param.enabled ? 'Disable ' : ' Enable'}</span>
            </span>
        )
    },

    toggleEnabled: function(){
        var query = _.clone(this.props.store.fetch(), true)
        var newQueryData = _.merge(this.props.param, {enabled: !this.props.param.enabled})
        query.data = queriesHelper.mergeData(queriesHelper.getData(query), newQueryData)
        this.props.store.update(query)
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