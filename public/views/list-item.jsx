var React = require('react')
var itemsHelper = require('../../collectionJsonHelpers/extractors/items.js')
var templateHelper = require('../../collectionJsonHelpers/extractors/template.js')
var attributesHelper = require('../../collectionJsonHelpers/extractors/attributes.js')
var _ = require('lodash')
var Details = require('./details.jsx')

var ListItem = React.createClass({
    render: function () {
        var context = this
        return (
            <li className="tt-item" onClick={context.onClick}>
                <a href={itemsHelper.getLink(context.props.item)}>{context.props.item.href}</a>
                <Details
                    attributes={context.getItemAttributes(context.props.item)}
                    onChange={context.handleAttributeChange}
                    edit={false}/>
            </li>
        )
    },

    onClick: function () {
        var context = this
        var molecule = _.clone(context.props.chain.fetch(), true)
        var newTemplateInput = _.merge(_.clone(context.props.templateInput), {value: attributesHelper.getItemAttributeValue(context.props.item, 'id')})
        molecule.collection.template.data = templateHelper.mergeTemplateData(templateHelper.getTemplateData(molecule), newTemplateInput)
        this.props.chain.update(molecule)
    },

    handleAttributeChange: function () {
    },

    getItemAttributes: function (item) {
        return attributesHelper.getItemAttributes(item)
    }
})

module.exports = ListItem