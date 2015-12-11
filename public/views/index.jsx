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

var Index = React.createClass({
    getInitialState: function () {
        return {
            collectionObject: this.props.collectionObject,
            adding: false
        }
    },

    render: function () {
        return (
            <Page {...this.props}>
                <h1>TechTalk</h1>
                <h3>Speakers</h3>
                <SearchBar queries={this.getQueries()}/>
                <LinkedList items={itemsHelper.getItems(this.state.collectionObject)} textFormatter={speakersHelper.getFullName}/>
                { this.state.adding ?
                    <NewForm
                        onCreate={this.onCreate}
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

    getQueries: function(){
        return collectionHelper.getCollectionValue(collectionHelper.getCollection(this.state.collectionObject), 'queries')
    },

    onCreate: function(collectionObject){
        this.setState({collectionObject: collectionObject})
    },

    onNew: function(){
        this.setState({adding: true})
    },

    onCancel: function(){
        this.setState({adding: false})
    }
})

module.exports = Index