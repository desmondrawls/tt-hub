var React = require('react')
var Page = require('./page.jsx')
var Details = require('./details.jsx')
var EdittingButtons = require('./editting-buttons.jsx')
var DeleteButton = require('./delete-button.jsx')
var Link = require('./link.jsx')
var _ = require('lodash')
var $ = require('jquery')
var attributesHelper = require('../../collectionJsonHelpers/extractors/attributes.js')
var itemsHelper = require('../../collectionJsonHelpers/extractors/items.js')
var templateHelper = require('../../collectionJsonHelpers/extractors/template.js')
var collectionHelper = require('../../collectionJsonHelpers/extractors/collection.js')

var Show = React.createClass({
    getInitialState: function(){
        return {
            collectionObject: this.props.collectionObject,
            template: templateHelper.getPopulatedTemplate(templateHelper.getTemplate(this.props.collectionObject), itemsHelper.getFirstItem(this.props.collectionObject)),
            edit: false
        }
    },

    render: function(){
        var context = this

        return (
            <Page {...context.props}>
                <a href={this.getBackLink()}>Back to index</a>
                <h1>Speaker</h1>
                <Details
                    attributes={context.getItemAttributes()}
                    onChange={context.handleAttributeChange}
                    edit={context.state.edit}
                />
                { context.state.edit ? <EdittingButtons onSave={context.onSave} onCancel={context.onCancel}/> : null }
                <p>
                    <Link onClick={context.onEdit} text="Edit"/>
                    <DeleteButton action={context.getPrimaryUrl(context.state.collectionObject)}/>
                </p>
            </Page>
        )
    },

    getBackLink: function(){
        return _.find(this.props.collectionObject.collection.links, function(link){return link.rel == 'back'}).href
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
        $.ajax(collectionHelper.getCollectionValue(collectionHelper.getCollection(context.state.collectionObject), 'href'), {
            method: 'PUT',
            data: {'template': this.state.template},
            success: function(data){
                var collectionObject = JSON.parse(data)
                context.setState({collectionObject: collectionObject})
                context.setState({template: templateHelper.getPopulatedTemplate(
                                                templateHelper.getTemplate(collectionObject),
                                                itemsHelper.getFirstItem(collectionObject))})
                context.onCancel()
            }
        })
    },

    getPrimaryUrl: function(object){
        return collectionHelper.getCollectionValue(collectionHelper.getCollection(object), 'href')
    },

    getItemAttributes: function(){
        return attributesHelper.getItemAttributes(itemsHelper.getFirstItem(this.state.collectionObject))
    },

    getItemAttribute: function(attributeName){
        return attributesHelper.getItemAttributeValue(itemsHelper.getFirstItem(this.state.collectionObject), attributeName)
    },

    onEdit: function(){
        this.setState({edit: true})
    },

    onCancel: function(){
        this.setState({edit: false})
    }
})

module.exports = Show