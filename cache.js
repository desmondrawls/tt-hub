var uri = 'mongodb://localhost:27017/test'
var mongoose = require('mongoose')
mongoose.connect(uri)
var db = mongoose.connection
db.on('error', console.error.bind(console, 'connection error:'))
db.once('open', function (callback) {
    console.log('db connected')
})
var Mixed = mongoose.Schema.Types.Mixed

var CollectionSchema = mongoose.Schema(
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

var ItemSchema = mongoose.Schema(
    {
        href: String,
        links: [{rel: String, href: String, prompt: String}],
        data: [{name: String, value: Mixed, prompt: String}]
    }
)

var TemplateSchema = mongoose.Schema(
    {
        data: [{name: String, value: Mixed, prompt: String}]
    }
)

var QuerySchema = mongoose.Schema(
    {
        rel: String, href: String, prompt: String,
        data: [
            {name: String, value: Mixed}
        ]
    }
)

exports.DayCollection = mongoose.model('DayCollection', CollectionSchema)
exports.DayItem = mongoose.model('DayItem', ItemSchema)
exports.DayTemplate = mongoose.model('DayTemplate', TemplateSchema)
exports.DayQuery = mongoose.model('DayQuery', QuerySchema)

exports.SpeakerCollection = mongoose.model('SpeakerCollection', CollectionSchema)
exports.SpeakerItem = mongoose.model('SpeakerItem', ItemSchema)
exports.SpeakerTemplate = mongoose.model('SpeakerTemplate', TemplateSchema)
exports.SpeakerQuery = mongoose.model('SpeakerQuery', QuerySchema)