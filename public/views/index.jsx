var React = require('react')
var Page = require('./page.jsx')
var _ = require('lodash')
var attributesHelper = require('./collectionJsonHelpers/attributes.js')
var itemsHelper = require('./collectionJsonHelpers/items.js')

var Index = React.createClass({
    getInitialState: function(){
        return {
            speakers: this.props.speakers,
        }
    },

    render: function(){
        function speakers(speakers) {
            return _.map(speakers, function(speaker) {
                return (
                    <li>{attributesHelper.getItemAttributeValue(speaker, 'first_name')}</li>
                )
            })
        }
        return (
            <Page {...this.props}>
                <h1>TechTalk</h1>
                <h3>Speakers</h3>
                <ul>
                    {speakers(itemsHelper.getItems(this.state.speakers))}
                </ul>
            </Page>
        )
    }
})

module.exports = Index