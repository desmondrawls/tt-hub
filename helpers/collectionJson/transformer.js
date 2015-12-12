var _ = require('lodash')
var typesHelper = require('./../types.js')

function layout(backUrl, url, items, template) {
    return (
    {
        collection: {
            version: '1.0',
            href: url,
            links: [
                {rel: 'back', href: backUrl}
            ],
            items: items,
            queries: typesHelper.getQueries(url),
            template: template
        }
    })
}



exports.layout = layout