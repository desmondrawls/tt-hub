function respondWithShow(req, res, collectionObject) { respondWith(req, res, collectionObject, 'show') }
function respondWithIndex(req, res, collectionObject){ respondWith(req, res, collectionObject, 'index') }

function respondWith(req, res, collectionObject, view) {
    req.header('accept') == 'application/json' ? res.send(collectionObject) : res.render(view, {collectionObject: collectionObject})
}

exports.respondWithShow = respondWithShow
exports.respondWithIndex = respondWithIndex