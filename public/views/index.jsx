var React = require('react')
var Page = require('./page.jsx')
var NewForm = require('./new.jsx')
var Link = require('./link.jsx')
var LinkedList = require('./linked-list.jsx')
var SearchBar = require('./search-bar.jsx')
var _ = require('lodash')
var templateHelper = require('./../../helpers/collectionJson/template.js')
var itemsHelper = require('./../../helpers/collectionJson/items.js')
var speakersHelper = require('./../../helpers/speakers.js')
var collectionHelper = require('./../../helpers/collectionJson/collection.js')
var Store = require('./../stores/object.js')

var Index = React.createClass({
    getInitialState: function () {
        this.store = new Store.Object(this.props.collectionObject)
        return {
            collectionObject: this.store.fetch(),
            adding: false
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
                <LinkedList items={itemsHelper.getItems(this.state.collectionObject)} textFormatter={speakersHelper.getFullName}/>
                { this.state.adding ?
                    <NewForm
                        store={this.store}
                        onCancel={this.onCancel}
                        template={templateHelper.getTemplate(this.props.collectionObject)}
                        href={this.getPrimaryUrl()}/>
                : <Link onClick={this.onNew} text="New"/> }
            </Page>
        )
    },

    getPrimaryUrl: function(){
       return collectionHelper.getCollectionValue(collectionHelper.getCollection(this.state.collectionObject), 'href')
    },


    getQueries: function(collectionObject){
        var queries = collectionHelper.getCollectionValue(collectionHelper.getCollection(collectionObject), 'queries')
        console.log("passing down queries", queries[1].data[0])
        return queries
    },

    onNew: function(event){
        event.preventDefault()
        this.setState({adding: true})
    },

    onCancel: function(){
        this.setState({adding: false})
    }
})

module.exports = Index