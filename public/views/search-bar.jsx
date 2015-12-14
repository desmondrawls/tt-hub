var React = require('react')
var _ = require('lodash')
var queriesHelper = require('./../../helpers/collectionJson/queries.js')
var QueryCheckbox = require('./query-checkbox.jsx')
var QueryTextbox = require('./query-textbox.jsx')
var collectionHelper = require('./../../helpers/collectionJson/collection.js')
var Store = require('./../stores/object.js')

var SearchBar = React.createClass({
    getInitialState: function(){
        this.store = new Store.Object(this.getDisabledSearchQuery())
        return {query: this.store.fetch()}
    },

    componentWillMount: function () {
        this.store.addListener(this.onStoreUpdate)
    },

    getDisabledSearchQuery: function(){
        var searchQuery = _.clone(this.props.query, true)
        searchQuery.data = _.map(searchQuery.data, function(dataItem) { return _.merge(dataItem, {disabled: true})})
        return searchQuery
    },

    onStoreUpdate: function(query) {
        this.setState({query: query})
    },

    getParams: function(){
        return queriesHelper.getData(this.state.query)
    },

    render: function(){
        var context = this

        function queryBuilder() {
            return _.map(context.getParams(), function(param){
                switch (queriesHelper.getDataType(param)) {
                    case 'boolean': { return <QueryCheckbox param={param} store={context.store}/> }
                    case 'text': { return <QueryTextbox param={param} store={context.store}/> }
                    default: {return (<span>UNREGISTERED PARAM TYPE</span>)}
                }
            })
        }

        return (
            <div className="search-bar">
                {queryBuilder()}
                <button className="tt-button" onClick={context.onReset}>RESET</button>
                <button className="tt-button" onClick={context.onSearch}>SEARCH</button>
            </div>
        )
    },

    onReset: function(){
        this.updateFromSearch('')
        this.setState({query: this.props.query})
    },

    onSearch: function() {
        var enabledParams = _.filter(this.getParams(), function(param){return param.enabled == true})
        var formattedEnabledParams = _.map(enabledParams, function (param) {return _.pick(param, ['name', 'value'])})
        this.updateFromSearch(formattedEnabledParams)
    },

    updateFromSearch: function(params){
        if(params.length == 0){return}
        var context = this
        var url = this.props.query.href + '?' + $.param(params)
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