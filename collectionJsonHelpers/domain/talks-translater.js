var _ = require('lodash')

function talks(collectionObject) {
    return _.map(collectionObject.collection.items, function(item){
        return talkFromAttributes(item.data)
    })
}

function talkFromAttributes(attributes){
    var talk = {}
    _.each(attributes, function(attribute){
        if(attribute.name != 'id'){
            talk[attribute.name] = attribute.value
        }
    })
    return talk
}

function templateAttributes(templateObject){
    return templateObject.template.data
}

function talkFromTemplateObject(templateObject){
    return talkFromAttributes(templateAttributes(templateObject))
}

exports.talks = talks
exports.talkFromTemplateObject = talkFromTemplateObject