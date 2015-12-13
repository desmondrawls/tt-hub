var attributesHelper = require('./collectionJson/attributes.js')
var talksHelper = require('./talks.js')

function getType(collectionObject){
    console.log("COLLECTIONOBJ", collectionObject)
    if(collectionObject.collection.href.indexOf('speakers') > -1){
        return 'speakers'
    }
    if(collectionObject.collection.href.indexOf('days') > -1){
        return 'days'
    }
    if(collectionObject.collection.href.indexOf('talks') > -1){
        return 'talks'
    }
}

function getItemIdentifier(item){
    if(item.href.indexOf('speakers') > -1){
        return getFullName(item)
    }
    if(item.href.indexOf('days') > -1){
        return getDate(item)
    }
}

function getFullName(speaker) {
    return attributesHelper.getItemAttributeValue(speaker, 'first_name') + ' ' + attributesHelper.getItemAttributeValue(speaker, 'last_name')
}

function getDate(day) {
    return attributesHelper.getItemAttributeValue(day, 'date')
}

function getQueries(url){
    if(url.indexOf('speakers') > -1){
        return getSpeakerQueries(url)
    }
    if(url.indexOf('days') > -1){
        return getDayQueries(url)
    }
}
function getSpeakerQueries(url){
    return [
        {'href': url + 'search', 'rel': 'name', 'prompt': 'Search by name', 'name': 'name',
            'data':
                [
                    {'name': 'first_name', 'value': '', 'type': 'text'}
                ]
        }
    ]
}

function getDayQueries(url){
    return [
        {'href': url + 'search', 'rel': 'conflict', 'prompt': 'Find days with conflicts', 'name': 'conflict',
            'data':
                [
                    {'name': 'conflict', 'value': true, 'type': 'boolean'}
                ]
        },
        {'href': url + 'search', 'rel': 'host', 'prompt': 'Search by host', 'name': 'host',
            'data':
                [
                    {'name': 'host', 'value': '', 'type': 'text'}
                ]
        }
    ]
}


function getLinks(url, backUrl){
    if(url.indexOf('speakers') > -1){
        return [{rel: 'back', href: backUrl}]
    }
    if(url.indexOf('days') > -1){
        return [{rel: 'back', href: backUrl}]
    }
    return talksHelper.getLinks(url, backUrl)
}


exports.getItemIdentifier = getItemIdentifier
exports.getQueries = getQueries
exports.getType = getType
exports.getLinks = getLinks