var React = require('react')
var Page = require('./page.jsx')
var Index = require('./index.jsx')
var NewButton = require('./new-button.jsx')
var LinkedList = require('./linked-list.jsx')
var SearchBar = require('./search-bar.jsx')
var _ = require('lodash')
var Q = require('q');
var templateHelper = require('../../collectionJsonHelpers/extractors/template.js')
var itemsHelper = require('../../collectionJsonHelpers/extractors/items.js')
var typeHelper = require('./../../collectionJsonHelpers/domain/types.js')
var collectionHelper = require('../../collectionJsonHelpers/extractors/collection.js')
var Store = require('./../stores/crystal.js')

var Double = React.createClass({
    getInitialState: function () {
        this.store = new Store.Crystal(this.props.molecule)
        return {
            molecule: this.store.fetch(),
            resources: [],
            loaded: false
        }
    },

    componentWillMount: function () {
        this.store.addListener(this.onStoreUpdate)
    },

    onStoreUpdate: function(molecule) {
        this.setState({molecule: molecule})
    },

    componentDidMount: function(){
        this.fetchResources()
    },

    fetchResources: function(){
        var context = this
        var links =_.filter(context.props.molecule.collection.links, function(link){ return link.rel == 'resource' })
        var hrefs = _.map(links, function(link){ return link.href})
        var resourcePromises = _.map(hrefs, function(href){return context.fetchResource(href)})
        Q.all(resourcePromises).then(function(resources){
            context.setState({resources: resources})
            context.setState({loaded: true})
        })
    },

    fetchResource: function(href){
        return $.ajax(href, {
            method: 'GET',
            headers: {
                'Accept': 'application/json'
            },
            success: function(molecule){
                return molecule
            }
        })
    },

    render: function () {
        var context = this

        function resources(){
            return(
                <div>
                    <div className='tt-column left-half'>
                        <Index molecule={context.state.resources[0]}/>
                    </div>
                    <div className='tt-column right-half'>
                        <Index molecule={context.state.resources[1]}/>
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