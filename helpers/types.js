var attributesHelper = require('./collectionJson/attributes.js')
var itemsHelper = require('./collectionJson/items.js')

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
        {'href': url + 'search', 'rel': 'booked', 'prompt': 'Find booked speakers', 'name': 'booked',
            'data':
                [
                    {'name': 'booked', 'value': true, 'type': 'boolean'}
                ]
        },
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


exports.getItemIdentifier = getItemIdentifier
exports.getQueries = getQueries