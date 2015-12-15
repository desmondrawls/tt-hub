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
var Store = require('./../stores/crystal.js')

var Index = React.createClass({
    getInitialState: function () {
        this.store = new Store.Crystal(this.props.molecule)
        return {
            molecule: this.store.fetch()
        }
    },

    componentWillMount: function () {
        this.store.addListener(this.onStoreUpdate)
    },

    onStoreUpdate: function(molecule) {
        this.setState({molecule: molecule})
    },

    render: function () {
        return (
            <Page {...this.props}>
                <h2>{typeHelper.getType(this.state.molecule)}</h2>
                <SearchBar store={this.store} query={this.getSearchQuery()}/>
                <NewButton store={this.store} template={this.getTemplate()} href={this.getPrimaryUrl()}/>
                <LinkedList
                    chain={this.props.chain}
                    templateInput={this.props.templateInput}
                    items={itemsHelper.getItems(this.state.molecule)}
                    textFormatter={typeHelper.getItemIdentifier}/>
            </Page>
        )
    },

    getSearchQuery: function(){
        return _.find(this.getQueries(this.state.molecule), function(query){ return query.rel == 'search' })
    },

    getPrimaryUrl: function(){
       return collectionHelper.getCollectionValue(collectionHelper.getCollection(this.state.molecule), 'href')
    },

    getTemplate: function(){
        return templateHelper.getTemplate(this.props.molecule)
    },

    getQueries: function(molecule){
        return collectionHelper.getCollectionValue(collectionHelper.getCollection(molecule), 'queries')
    }
})

module.exports = Index