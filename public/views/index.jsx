var React = require('react')
var Page = require('./page.jsx')
var NewButton = require('./new-button.jsx')
var LinkedList = require('./linked-list.jsx')
var SearchBar = require('./search-bar.jsx')
var _ = require('lodash')
var templateHelper = require('./../../helpers/collectionJson/template.js')
var itemsHelper = require('./../../helpers/collectionJson/items.js')
var typeHelper = require('./../../helpers/types.js')
var collectionHelper = require('./../../helpers/collectionJson/collection.js')
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
                <h1>TechTalk</h1>
                <h3>Speakers</h3>
                <SearchBar store={this.store} queries={this.getQueries(this.state.collectionObject)}/>
                <a href={this.getPrimaryUrl()}>Reset</a>
                <LinkedList items={itemsHelper.getItems(this.state.collectionObject)} textFormatter={typeHelper.getItemIdentifier}/>
                <NewButton store={this.store} template={this.getTemplate()} href={this.getPrimaryUrl()}/>
            </Page>
        )
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