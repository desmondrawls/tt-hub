var uri = 'mongodb://localhost:27017/test'

var mongoose = require('mongoose')
mongoose.connect(uri)

var db = mongoose.connection
db.on('error', console.error.bind(console, 'connection error:'))
db.once('open', function (callback) {
    console.log('db connected')
})

var talkSchema = mongoose.Schema({
    speaker_id: String,
    day_id: String
})

exports.Talk = mongoose.model('Talk', talkSchema)
