var _ = require('lodash')
var attributesHelper = require('./attributes.js')
var collectionsHelper = require('./collection.js')

function getItems(collectionJson){
    return collectionsHelper.getCollection(collectionJson).items
}

function getFirstItem(collectionJson){
    return getFirst(getItems(collectionJson))
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