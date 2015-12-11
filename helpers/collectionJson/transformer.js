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
            queries: queries(),
            template: template
        }
    })
}

function queries() {
    return [
        {'href': 'http://localhost:4000/speakers/search', 'rel': 'booked', 'prompt': 'Find booked speakers', 'name': 'booked',
            'data':
                [
                    {'name': 'booked', 'value': true, 'type': 'boolean'}
                ]
        },
        {'href': 'http://localhost:4000/speakers/search', 'rel': 'name', 'prompt': 'Search by name', 'name': 'name',
            'data':
                [
                    {'name': 'name', 'value': '', 'type': 'text'}
                ]
        }
    ]
}

exports.layout = layout