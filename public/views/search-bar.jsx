var React = require('react')
var _ = require('lodash')
var queriesHelper = require('./../../helpers/collectionJson/queries.js')
var QueryCheckbox = require('./query-checkbox.jsx')
var QueryTextbox = require('./query-textbox.jsx')
var collectionHelper = require('./../../helpers/collectionJson/collection.js')

var SearchBar = React.createClass({

    render: function(){
        var context = this

        function queries(queries) {
            return _.map(queries, function(query){
                switch (queriesHelper.getDataType(queriesHelper.getData(query)[0])) {
                    case 'boolean': {
                        return <QueryCheckbox query={query} queryData={queriesHelper.getData(query)[0]} store={context.props.store}/>
                    }
                    case 'text': {
                        return <QueryTextbox query={query} queryData={queriesHelper.getData(query)[0]} store={context.props.store}/>
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

        return (
            <div>
                {queries(context.props.queries)}
                <button onClick={context.onReset}>RESET</button>
                <button onClick={context.onSearch}>SEARCH</button>
            </div>
        )
    },

    onReset: function(){
        this.updateFromSearch('')
    },

    onSearch: function(){
        var params = _.reduce(this.props.queries, function(current, nextQuery){
            var nextParams = _.map(queriesHelper.getData(nextQuery), function(dataItem){
                return _.pick(dataItem, ['name', 'value'])
            })
            return current.concat(nextParams)
        },[])
        this.updateFromSearch(params)
    },

    updateFromSearch: function(params){
        var context = this
        var url = this.props.queries[0].href + '?' + $.param(params)
        $.ajax(url, {
            method: 'GET',
            headers: {
                'Accept': 'application/json'
            },
            success: function(collectionObject){
                context.props.store.update(collectionObject)
            }
        })
    }
})

module.exports = SearchBar