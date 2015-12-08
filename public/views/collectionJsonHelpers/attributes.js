var _ = require('lodash')

function getAttributes(item){
    return item.collection.items[0].data;
}

function getAttribute(item, name){
    return _.find(getAttributes(item), function(attr){ return attr.name == name})
}

function updateAttribute(item, name, value) {
    getAttribute(item, name)['value'] = value
}

exports.getAttributes = getAttributes
exports.getAttribute = getAttribute
exports.updateAttribute = updateAttribute