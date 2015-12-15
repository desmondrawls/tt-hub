var React = require('react')
var _ = require('lodash')
var Details = require('./details.jsx')
var EdittingButtons = require('./editting-buttons.jsx')
var attributesHelper = require('../../collectionJsonHelpers/extractors/attributes.js')

var NewForm = React.createClass({
    getInitialState: function () {
        return { template: this.props.template }
    },

    render: function () {
        return (
            <div>
                <Details
                    attributes={attributesHelper.getItemAttributes(this.state.template)}
                    onChange={this.handleAttributeChange}
                    edit={true}
                />
                <EdittingButtons onSave={this.onSave} onCancel={this.onCancel}/>
            </div>
        )
    },

    onSave: function(){
        var context = this
        $.ajax(context.props.href, {
            method: 'POST',
            headers: {
                'Accept': 'application/json'
            },
            data: {'template': context.state.template},
            success: function(molecule){
                context.props.store.update(molecule)
                context.onCancel()
            }
        })
    },

    onCancel: function() {
        this.setState({ template: this.props.template })
        this.props.onCancel()
    },

    handleAttributeChange: function(event) {
        var template = _.clone(this.state.template, true)
        attributesHelper.updateAttributeValue(
            attributesHelper.getItemAttribute(template, event.target.name),
            event.target.value)
        this.setState({template: template})
    }
})

module.exports = NewForm