var _ = require('lodash')
var transformer = require('./transformer.js')

function domesticateObject(url, object){
    return transformer.layout(url, object.collection.items, object.collection.template)
}

function domesticateObjectItems(object, items, url){
    object.collection.items = _.map(items, function(item){ return domesticateItem(url + item.id, item)})
    return object
}

function domesticateItems(url, items){
    return _.map(items, function(item){ return domesticateItem(url + item.id, item) })
}

function domesticateItem(url, item){
    return _.merge(item, {href: url})
}

function registerItem(item){
    return function(url){
        return _.merge(item, {href: url})
    }
}

exports.domesticateObject = domesticateObject
exports.domesticateObjectItems = domesticateObjectItems
exports.domesticateItem = domesticateItem
exports.domesticateItems = domesticateItems
exports.registerItem = registerItem