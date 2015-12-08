var _ = require('lodash')

function getItems(collectionJson){
    return collectionJson.collection.items
}

function getFirstItem(collectionJson){
    return getFirst(getItems(collectionJson))
}

function getFirst(items){
    return items[0]
}

exports.getItems = getItems
exports.getFirstItem = getFirstItem
exports.getFirst = getFirst