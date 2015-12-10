var _ = require('lodash')
var transformer = require('./transformer.js')

function domesticateSpeakerObject(url, speakerObject){
    return transformer.layout(url, speakerObject.collection.items, speakerObject.collection.template)
}

exports.domesticateSpeakerObject = domesticateSpeakerObject