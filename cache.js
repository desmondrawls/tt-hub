var uri = 'mongodb://localhost:27017/test'
var mongoose = require('mongoose')
mongoose.connect(uri)
var db = mongoose.connection
db.on('error', console.error.bind(console, 'connection error:'))
db.once('open', function (callback) {
    console.log('db connected')
})
var Mixed = mongoose.Schema.Types.Mixed

var collectionJsonCollectionSchema = mongoose.Schema(
    {
        version: String,
        href: String,
        links: [{rel: String, href: String}],
        items: [{
            href: String,
            links: [{rel: String, href: String, prompt: String}],
            data: [{name: String, value: Mixed, prompt: String}]
        }],
        queries: [{
            rel: String,
            href: String,
            prompt: String,
            data: [{name: String, value: Mixed}]
        }],
        template: {
            data: [{name: String, value: Mixed, prompt: String}]
        }
    }, {strict: false})

var collectionJsonItemSchema = mongoose.Schema(
    {
        href: String,
        links: [{rel: String, href: String, prompt: String}],
        data: [{name: String, value: Mixed, prompt: String}]
    }
)

var collectionJsonTemplateSchema = mongoose.Schema(
    {
        data: [{name: String, value: Mixed, prompt: String}]
    }
)

var collectionJsonQuerySchema = mongoose.Schema(
    {
        rel: String, href: String, prompt: String,
        data: [
            {name: String, value: Mixed}
        ]
    }
)

exports.CollectionJsonCollection = mongoose.model('CollectionJsonCollection', collectionJsonCollectionSchema)
exports.CollectionJsonItem = mongoose.model('Item', collectionJsonItemSchema)
exports.CollectionJsonTemplate = mongoose.model('Template', collectionJsonTemplateSchema)
exports.CollectionJsonQuery = mongoose.model('Query', collectionJsonQuerySchema)