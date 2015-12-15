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

function getTemplateData(molecule){
    return getTemplate(molecule).data
}

function getData(template){
    return template.data
}

function mergeTemplateData(existingTemplateData, newTemplateData){
    var index = _.indexOf(existingTemplateData, _.find(existingTemplateData, function(input){return input.name == newTemplateData.name}));
    var workingCopy = _.clone(existingTemplateData, true)
    workingCopy.splice(index, 1, newTemplateData)
    return workingCopy
}

exports.getPopulatedTemplate = getPopulatedTemplate
exports.getTemplate = getTemplate
exports.getData = getData
exports.getTemplateData = getTemplateData
exports.mergeTemplateData = mergeTemplateData