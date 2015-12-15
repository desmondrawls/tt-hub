var _ = require('lodash')

function getCollection(jsonCollection){
    return jsonCollection.collection;
}

function getCollectionValue(collection, value){
    return collection[value]
}

exports.getCollection = getCollection
exports.getCollectionValue = getCollectionValue