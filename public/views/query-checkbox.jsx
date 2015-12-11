var React = require('react')
var queriesHelper = require('./../../helpers/collectionJson/queries.js')

var QueryCheckbox = React.createClass({
    getInitialState: function() {
        return {queryData: this.props.queryData}
    },

    render: function(){
        return (
            <span>
                <input
                    type="checkbox"
                    name={this.getName()}
                    defaultValue={this.getDefaultValue()}
                    checked={this.state.value ? "checked" : null}
                    onClick={this.onClick}/>
                <span>{this.getName()}</span>
            </span>
        )
    },

    onClick: function(event) {
        var newQueryData = queriesHelper.copyDataWithValue(this.state.queryData, event.target.checked)
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

module.exports = QueryCheckbox