var _ = require('lodash')
var transformer = require('./transformer.js')

function domesticateObject(url, object){
    return transformer.layout(url, object.collection.items, object.collection.template)
}

exports.domesticateObject = domesticateObject