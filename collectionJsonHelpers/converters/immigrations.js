var _ = require('lodash')
var transformer = require('./layout.js')

function domesticateMolecule(backUrl, url, molecule){
    return transformer.layout(backUrl, url, molecule.collection.items, molecule.collection.template)
}

function domesticateMoleculeItems(molecule, items, url){
    molecule.collection.items = _.map(items, function(item){
        return domesticateItem(url + item.id, item)})
    return molecule
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

exports.domesticateMolecule = domesticateMolecule
exports.domesticateMoleculeItems = domesticateMoleculeItems
exports.domesticateItem = domesticateItem
exports.domesticateItems = domesticateItems
exports.registerItem = registerItem