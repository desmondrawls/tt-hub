var _ = require('lodash')

function getAttributes(collectionJson){
    return collectionJson.collection.items[0].data;
}

function getAttribute(collectionJson, name){
    return _.find(getAttributes(collectionJson), function(attr){ return attr.name == name})
}

function getAttributeValue(collectionJson, name){
    return getValue(getAttribute(collectionJson, name))
}

function getAttributeName(collectionJson, name){
    return getName(getAttribute(collectionJson, name))
}

function getAttributePrompt(collectionJson, name){
    return getPrompt(getAttribute(collectionJson, name))
}

function getValue(attribute){
    return attribute.value
}

function getName(attribute){
    return attribute.name
}

function getPrompt(attribute){
    return attribute.prompt
}

function updateAttribute(collectionJson, name, value) {
    getAttribute(collectionJson, name)['value'] = value
}

function getItemAttributeValue(item, name){
    return getItemAttribute(item, name).value
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
exports.getAttributes = getAttributes
exports.getAttribute = getAttribute
exports.getAttributeValue = getAttributeValue
exports.getValue = getValue
exports.getAttributeName = getAttributeName
exports.getName = getName
exports.getAttributePrompt = getAttributePrompt
exports.getPrompt = getPrompt
exports.updateAttribute = updateAttribute
