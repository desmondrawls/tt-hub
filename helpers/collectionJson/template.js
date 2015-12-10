var _ = require('lodash')
var attributesHelper = require('./attributes.js')

function getPopulatedTemplate(template, item){
    _.each(attributesHelper.getItemAttributes(template), function(attribute){
        attribute['value'] = attributesHelper.getItemAttributeValue(item, attribute['name'])
    })
    return template;
}

function getTemplate(collectionObject){
    return collectionObject.collection.template
}

exports.getPopulatedTemplate = getPopulatedTemplate
exports.getTemplate = getTemplate