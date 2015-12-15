var _ = require('lodash')

function getCollection(molecule){
    return molecule.collection;
}

function getCollectionValue(collection, value){
    return collection[value]
}

exports.getCollection = getCollection
exports.getCollectionValue = getCollectionValue