var React = require('react')
var queriesHelper = require('./../../helpers/collectionJson/queries.js')

var QueryTextbox = React.createClass({
    getInitialState: function() {
        return {queryData: this.props.queryData}
    },

    render: function(){
        return (
            <span>
                <label>{this.getName} : </label>
                <input
                    type="text"
                    name={this.getName()}
                    onChange={this.onChange}/>
            </span>
        )
    },

    onChange: function(event) {
        var newQueryData = queriesHelper.copyDataWithValue(this.state.queryData, event.target.value)
        this.setState({queryData: newQueryData})
        this.props.onChange(newQueryData)
    },

    getName: function() {
        return queriesHelper.getDataName(this.state.queryData)
    },

    getValue: function() {
        return queriesHelper.getDataValue(this.state.queryData)
    },

    getDefaultValue: function() {
        return queriesHelper.getDataValue(this.props.queryData)
    }
})

module.exports = QueryTextbox