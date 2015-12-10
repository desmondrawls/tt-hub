var attributesHelper = require('./collectionJson/attributes.js')
var itemsHelper = require('./collectionJson/items.js')

function getFullName(speaker) {
    return attributesHelper.getItemAttributeValue(speaker, 'first_name') + ' ' + attributesHelper.getItemAttributeValue(speaker, 'last_name')
}

function getLink(speaker) {
    return speaker.href
}

exports.getFullName = getFullName
exports.getLink = getLink