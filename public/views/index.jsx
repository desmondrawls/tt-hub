var React = require('react')
var Page = require('./page.jsx')
var NewButton = require('./new-button.jsx')
var LinkedList = require('./linked-list.jsx')
var SearchBar = require('./search-bar.jsx')
var _ = require('lodash')
var templateHelper = require('../../collectionJsonHelpers/extractors/template.js')
var itemsHelper = require('../../collectionJsonHelpers/extractors/items.js')
var typeHelper = require('../../collectionJsonHelpers/domain/types.js')
var collectionHelper = require('../../collectionJsonHelpers/extractors/collection.js')
var Store = require('./../stores/object.js')

var Index = React.createClass({
    getInitialState: function () {
        this.store = new Store.Object(this.props.collectionObject)
        return {
            collectionObject: this.store.fetch()
        }
    },

    componentWillMount: function () {
        this.store.addListener(this.onStoreUpdate)
    },

    onStoreUpdate: function(collectionObject) {
        this.setState({collectionObject: collectionObject})
    },

    render: function () {
        return (
            <Page {...this.props}>
                <h2>{typeHelper.getType(this.state.collectionObject)}</h2>
                <SearchBar store={this.store} query={this.getSearchQuery()}/>
                <NewButton store={this.store} template={this.getTemplate()} href={this.getPrimaryUrl()}/>
                <LinkedList items={itemsHelper.getItems(this.state.collectionObject)} textFormatter={typeHelper.getItemIdentifier}/>
            </Page>
        )
    },

    getSearchQuery: function(){
        return _.find(this.getQueries(this.state.collectionObject), function(query){ return query.rel == 'search' })
    },

    getPrimaryUrl: function(){
       return collectionHelper.getCollectionValue(collectionHelper.getCollection(this.state.collectionObject), 'href')
    },

    getTemplate: function(){
        return templateHelper.getTemplate(this.props.collectionObject)
    },

    getQueries: function(collectionObject){
        return collectionHelper.getCollectionValue(collectionHelper.getCollection(collectionObject), 'queries')
    }
})

module.exports = Index