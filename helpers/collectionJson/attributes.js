var _ = require('lodash')

function getAttributeValue(attribute){
    return attribute.value
}

function getAttributeName(attribute){
    return attribute.name
}

function getAttributePrompt(attribute){
    return attribute.prompt
}

function updateAttributeValue(attribute, value) {
    attribute['value'] = value
}

function getItemAttributeValue(item, name){
    return getAttributeValue(getItemAttribute(item, name))
}

function getItemAttribute(item, name){
    return _.find(getItemAttributes(item), function(attr){ return attr.name == name})
}

function getItemAttributes(item){
    return item.data
}

exports.getItemAttributes = getItemAttributes
exports.getItemAttribute = getItemAttribute
exports.getItemAttributeValue = getItemAttributeValue
exports.getAttributeValue = getAttributeValue
exports.getAttributeName = getAttributeName
exports.getAttributePrompt = getAttributePrompt
exports.updateAttributeValue = updateAttributeValue
