var _ = require('lodash')
var attributesHelper = require('./attributes.js')
var collectionsHelper = require('./collection.js')

function getPopulatedTemplate(template, item){
    _.each(attributesHelper.getItemAttributes(template), function(attribute){
        attribute['value'] = attributesHelper.getItemAttributeValue(item, attribute['name'])
    })
    return template;
}

function getTemplate(molecule){
    return collectionsHelper.getCollection(molecule).template
}

exports.getPopulatedTemplate = getPopulatedTemplate
exports.getTemplate = getTemplate