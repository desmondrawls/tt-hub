var React = require('react')
var Page = require('./page.jsx')
var Details = require('./details.jsx')
var EdittingButtons = require('./editting-buttons.jsx')
var DeleteButton = require('./delete-button.jsx')
var Link = require('./link.jsx')
var _ = require('lodash')
var $ = require('jquery')
var attributesHelper = require('./helpers/collectionJson/attributes.js')
var itemsHelper = require('./helpers/collectionJson/items.js')
var speakersHelper = require('./helpers/speakers.js')

var Show = React.createClass({
    getInitialState: function(){
        return {
            speaker: this.props.speaker,
            scratchSpeaker: this.props.speaker,
            edit: false
        }
    },

    render: function(){
        var context = this

        return (
            <Page {...context.props}>
                <a href="/speakers/">Back to all speakers</a>
                <h1>Speaker</h1>
                <Details
                    attributes={context.getSpeakerAttributes()}
                    onChange={context.handleAttributeChange}
                    edit={context.state.edit}
                />
                { context.state.edit ? <EdittingButtons onSave={context.onSave} onCancel={context.onCancel}/> : null }
                <p>
                    <Link onClick={context.onEdit} text="Edit"/>
                    <DeleteButton action={context.getSpeakerLink()}/>
                </p>
            </Page>
        )
    },

    handleAttributeChange: function(event){
        var scratchSpeaker = _.clone(this.state.scratchSpeaker, true)
        attributesHelper.updateAttributeValue(
            attributesHelper.getItemAttribute(itemsHelper.getFirstItem(scratchSpeaker), event.target.name),
            event.target.value)
        this.setState({scratchSpeaker: scratchSpeaker})
    },

    onSave: function(){
        var context = this
        $.ajax('/speakers/' + context.getSpeakerAttribute('id'), {
            method: 'PUT',
            data: this.state.scratchSpeaker,
            success: function(data){
                context.setState({speaker: JSON.parse(data)})
                context.onCancel()
            }
        })
    },

    getSpeakerAttributes: function(){
        return attributesHelper.getItemAttributes(itemsHelper.getFirstItem(this.state.speaker))
    },

    getSpeakerAttribute: function(attributeName){
        return attributesHelper.getItemAttributeValue(itemsHelper.getFirstItem(this.state.speaker), attributeName)
    },

    getSpeakerLink: function(){
        return speakersHelper.getLink(itemsHelper.getFirstItem(this.state.speaker))
    },

    onEdit: function(){
        this.setState({edit: true})
    },

    onCancel: function(){
        this.setState({edit: false})
    }
})

module.exports = Show