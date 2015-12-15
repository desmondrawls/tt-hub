var _ = require('lodash')
var typesHelper = require('../domain/types.js')

function layout(backUrl, url, items, template) {
    return (
    {
        collection: {
            version: '1.0',
            href: url,
            links: typesHelper.getLinks(url, backUrl),
            items: items,
            queries: typesHelper.getQueries(url),
            template: template
        }
    })
}



exports.layout = layout