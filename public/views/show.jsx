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
            template: this.getPopulatedTemplate(this.props.speaker.collection.template, itemsHelper.getFirstItem(this.props.speaker)),
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
        var template = _.clone(this.state.template, true)
        attributesHelper.updateAttributeValue(
            attributesHelper.getItemAttribute(template, event.target.name),
            event.target.value)
        this.setState({template: template})
    },

    onSave: function(){
        var context = this
        $.ajax('/speakers/' + context.getSpeakerAttribute('id'), {
            method: 'PUT',
            data: {'template': this.state.template},
            success: function(data){
                var speaker = JSON.parse(data)
                context.setState({speaker: speaker})
                context.setState({template: context.getPopulatedTemplate(speaker, speaker.collection.template)})
                context.onCancel()
            }
        })
    },

    getPopulatedTemplate: function(template, item){
        _.each(attributesHelper.getItemAttributes(template), function(attribute){
            attribute['value'] = attributesHelper.getItemAttributeValue(item, attribute['name'])
        })
        return template;
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