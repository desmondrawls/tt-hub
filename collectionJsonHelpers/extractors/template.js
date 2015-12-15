var _ = require('lodash')
var attributesHelper = require('./attributes.js')
var collectionsHelper = require('./collection.js')

function getPopulatedTemplate(template, item){
    _.each(attributesHelper.getItemAttributes(template), function(attribute){
        attribute['value'] = attributesHelper.getItemAttributeValue(item, attribute['name'])
    })
    return template;
}

function getTemplate(collectionJson){
    return collectionsHelper.getCollection(collectionJson).template
}

exports.getPopulatedTemplate = getPopulatedTemplate
exports.getTemplate = getTemplate