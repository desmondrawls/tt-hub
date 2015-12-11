var React = require('react')
var _ = require('lodash')
var queriesHelper = require('./../../helpers/collectionJson/queries.js')
var QueryCheckbox = require('./query-checkbox.jsx')

var SearchBar = React.createClass({
    render: function(){
        var context = this

        function queries(queries) {
            return _.map(queries, function(query){
                switch (queriesHelper.getDataType(queriesHelper.getData(query)[0])) {
                    case 'boolean': {
                        return <QueryCheckbox queryData={queriesHelper.getData(query)[0]} onChange={context.onChange}/>
                    }
                    case 'text': {
                        return (
                            <span>
                                <label>{queriesHelper.getDataName(queriesHelper.getData(query)[0])} : </label>
                                <input
                                    type="text"
                                    name={queriesHelper.getDataName(queriesHelper.getData(query)[0])}
                                />
                            </span>
                        )
                    }
                    default: {
                        return (
                            <span>
                                <a href={queriesHelper.getHref(query)}>{queriesHelper.getPrompt(query)}</a>
                            </span>
                        )
                    }
                }
            })
        }

        return <div>{queries(this.props.queries)}</div>
    },

    onChange: function(data){
        console.log("CHANGE:", data)
    }
})

module.exports = SearchBar