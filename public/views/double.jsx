var React = require('react')
var Page = require('./page.jsx')
var Index = require('./index.jsx')
var NewButton = require('./new-button.jsx')
var LinkedList = require('./linked-list.jsx')
var SearchBar = require('./search-bar.jsx')
var _ = require('lodash')
var Q = require('q');
var templateHelper = require('./../../helpers/collectionJson/template.js')
var itemsHelper = require('./../../helpers/collectionJson/items.js')
var typeHelper = require('./../../helpers/types.js')
var collectionHelper = require('./../../helpers/collectionJson/collection.js')
var Store = require('./../stores/object.js')

var Double = React.createClass({
    getInitialState: function () {
        this.store = new Store.Object(this.props.collectionObject)
        return {
            collectionObject: this.store.fetch(),
            resources: [],
            loaded: false
        }
    },

    componentWillMount: function () {
        this.store.addListener(this.onStoreUpdate)
    },

    onStoreUpdate: function(collectionObject) {
        this.setState({collectionObject: collectionObject})
    },

    componentDidMount: function(){
        console.log("FETCHED RESOURCES", this.fetchResources())
        this.fetchResources()
    },

    fetchResources: function(){
        var context = this
        var links =_.filter(context.props.collectionObject.collection.links, function(link){ return link.rel == 'resource' })
        console.log("LINKS:", links)
        var hrefs = _.map(links, function(link){ return link.href})
        console.log("HREFS:", hrefs)
        var resourcePromises = _.map(hrefs, function(href){return context.fetchResource(href)})
        Q.all(resourcePromises).then(function(resources){
            console.log("RESOURCES", resources)
            context.setState({resources: resources})
            context.setState({loaded: true})
        })
    },

    fetchResource: function(href){
        console.log("LINK TO", href)
        return $.ajax(href, {
            method: 'GET',
            headers: {
                'Accept': 'application/json'
            },
            success: function(collectionObject){
                console.log("FETCHED A RESOURCE:", collectionObject)
                return collectionObject
            }
        })
    },

    render: function () {
        var context = this

        function resources(){
            return(
                <div>
                    <div className='tt-column left-half'>
                        <Index collectionObject={context.state.resources[0]}/>
                    </div>
                    <div className='tt-column right-half'>
                        <Index collectionObject={context.state.resources[1]}/>
                    </div>
                </div>
            )
        }

        return (
            <Page {...this.props}>
                <h1>TechTalk</h1>
                {this.state.loaded ? resources() : null}
            </Page>
        )
    }
})

module.exports = Double