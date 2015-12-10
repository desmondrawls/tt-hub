var uri = 'mongodb://localhost:27017/test'

var mongoose = require('mongoose')
mongoose.connect(uri)

var db = mongoose.connection
db.on('error', console.error.bind(console, 'connection error:'))
db.once('open', function (callback) {
    console.log('db connected')
})

var collectionJsonSpeakerSchema = mongoose.Schema(
    {
        version: String,
        href: String,
        links: [{rel: String, href: String}],
        items: [{
            href: String,
            links: [{rel: String, href: String, prompt: String}],
            data: [{name: String, value: mongoose.Schema.Types.Mixed, prompt: String}]
        }],
        queries: [{
            rel: String,
            href: String,
            prompt: String,
            data: [{name: String, value: mongoose.Schema.Types.Mixed}]
        }],
        template: {
            data: [{name: String, value: mongoose.Schema.Types.Mixed, prompt: String}]
        }
    }, {strict: false})
exports.CollectionJsonSpeaker = mongoose.model('CollectionJsonSpeaker', collectionJsonSpeakerSchema)