var React = require('react')
var Page = require('./page.jsx')
var Details = require('./details.jsx')
var EdittingButtons = require('./editting-buttons.jsx')
var DeleteButton = require('./delete-button.jsx')
var Link = require('./link.jsx')
var _ = require('lodash')
var $ = require('jquery')
var attributesHelper = require('./../../helpers/collectionJson/attributes.js')
var itemsHelper = require('./../../helpers/collectionJson/items.js')
var templateHelper = require('./../../helpers/collectionJson/template.js')
var speakersHelper = require('./../../helpers/speakers.js')
var collectionHelper = require('./../../helpers/collectionJson/collection.js')

var Show = React.createClass({
    getInitialState: function(){
        return {
            itemObject: this.props.itemObject,
            template: templateHelper.getPopulatedTemplate(templateHelper.getTemplate(this.props.itemObject), itemsHelper.getFirstItem(this.props.itemObject)),
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
                    attributes={context.getItemAttributes()}
                    onChange={context.handleAttributeChange}
                    edit={context.state.edit}
                />
                { context.state.edit ? <EdittingButtons onSave={context.onSave} onCancel={context.onCancel}/> : null }
                <p>
                    <Link onClick={context.onEdit} text="Edit"/>
                    <DeleteButton action={context.getPrimaryUrl(context.state.itemObject)}/>
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
        $.ajax(collectionHelper.getCollectionValue(collectionHelper.getCollection(context.state.itemObject), 'href'), {
            method: 'PUT',
            data: {'template': this.state.template},
            success: function(data){
                var itemObject = JSON.parse(data)
                context.setState({itemObject: itemObject})
                context.setState({template: templateHelper.getPopulatedTemplate(
                                                templateHelper.getTemplate(itemObject),
                                                itemsHelper.getFirstItem(itemObject))})
                context.onCancel()
            }
        })
    },

    getPrimaryUrl: function(object){
        return collectionHelper.getCollectionValue(collectionHelper.getCollection(object), 'href')
    },

    getItemAttributes: function(){
        return attributesHelper.getItemAttributes(itemsHelper.getFirstItem(this.state.itemObject))
    },

    getItemAttribute: function(attributeName){
        return attributesHelper.getItemAttributeValue(itemsHelper.getFirstItem(this.state.itemObject), attributeName)
    },

    onEdit: function(){
        this.setState({edit: true})
    },

    onCancel: function(){
        this.setState({edit: false})
    }
})

module.exports = Show