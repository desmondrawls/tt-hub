var LocalResponder = function(){this.collectionObject = {collection: 'NOT SET'}}

LocalResponder.prototype.set = function(collectionObject, done){this.collectionObject = collectionObject; done.resolve(); return done.promise}
LocalResponder.prototype.index = function(req, res){respondWith(req, res, this.collectionObject, 'double')}

function respondWith(req, res, collectionObject, view) {
    req.header('accept') == 'application/json' ? res.send(collectionObject) : res.render(view, {collectionObject: collectionObject})
}

exports.LocalResponder = LocalResponder