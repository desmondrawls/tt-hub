var _ = require('lodash')

function layout(url, items, template) {
    return (
    {
        collection: {
            version: '1.0',
            href: url,
            links: [
                {rel: 'root', href: 'http://localhost:4000/'}
            ],
            items: items,
            queries: [],
            template: template
        }
    })
}

exports.layout = layout