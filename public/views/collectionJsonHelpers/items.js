var _ = require('lodash')

function getItems(collectionJson){
    return collectionJson.collection.items
}

exports.getItems = getItems