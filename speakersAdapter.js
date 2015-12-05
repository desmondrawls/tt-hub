function index(req, res){
    res.render('index', {
        speakers: ['Ada Lovelace', 'Charles Babbage', 'Claude Shannon']
    })
}

function create(req, res){
    res.send('create endpoint successfully acquired')
}

function show(req, res) {
    res.send('show endpoint successfully acquired')
}

function update(req, res) {
    res.send('update endpoint successfully acquired')
}

function destroy(req, res) {
    res.send('delete endpoint successfully acquired')
}

exports.index = index
exports.create = create
exports.show = show
exports.update = update
exports.destroy = destroy