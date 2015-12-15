var _ = require('lodash')
var attributesHelper = require('./attributes.js')
var collectionsHelper = require('./collection.js')

function getItems(molecule){
    return collectionsHelper.getCollection(molecule).items
}

function getFirstItem(molecule){
    return getFirst(getItems(molecule))
}

function getFirst(items){
    return items[0]
}

function getLink(item) {
    return item.href
}

exports.getLink = getLink
exports.getItems = getItems
exports.getFirstItem = getFirstItem
exports.getFirst = getFirst