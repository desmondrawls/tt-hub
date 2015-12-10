var React = require('react')
var Page = require('./page.jsx')
var NewForm = require('./new.jsx')
var Link = require('./link.jsx')
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
        var context = this

        function items(items) {
            return _.map(items, function (item) {
                return (
                    <li>
                        <a href={itemsHelper.getLink(item)}>{speakersHelper.getFullName(item)}</a>
                    </li>
                )
            })
        }

        return (
            <Page {...this.props}>
                <h1>TechTalk</h1>
                <h3>Speakers</h3>
                <ul>
                    {items(itemsHelper.getItems(this.state.collectionObject))}
                </ul>
                { this.state.adding ?
                    <NewForm
                        onCreate={this.onCreate}
                        onCancel={this.onCancel}
                        template={templateHelper.getTemplate(this.props.collectionObject)}
                        href={this.getPrimaryUrl()}/>
                : <Link onClick={context.onNew} text="New"/> }
            </Page>
        )
    },

    getPrimaryUrl: function(){
       return collectionHelper.getCollectionValue(collectionHelper.getCollection(this.state.collectionObject))
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