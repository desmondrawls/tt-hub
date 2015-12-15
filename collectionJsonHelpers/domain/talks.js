var _ = require('lodash')

function getTemplate(){
    return {
        data: [
            {name: 'speaker_id', value: '', prompt: 'Speaker'},
            {name: 'day_id', value: '', prompt: 'Day'}
        ]
    }
}

function getLinks(url, backUrl){
    return [
        {rel: 'resource', href: url + 'speakers/'},
        {rel: 'resource', href: url + 'days/'}
    ]
}

function formatTalks(talks) {
    return _.reduce(talks, function(current, next){
        current.push(talk(next))
        return current
    }, [])
}

function formatTalk(talk) {
    return (
    {
        href: 'http://localhost:4000/talks/' + talk.id,
        data: [
            {name: 'id', value: talk.id, prompt: 'ID'},
            {name: 'speaker_id', value: talk.speaker_id, prompt: 'Speaker'},
            {name: 'day_id', value: talk.day_id, prompt: 'Day'},
        ],
        links: [
            {rel: 'funny', href: 'www.funnyordie.com', prompt: 'Funny site'}
        ]
    }
    )
}


exports.getTemplate = getTemplate
exports.getLinks = getLinks
exports.formatTalk = formatTalk
exports.formatTalks = formatTalks