var Responder = function(){this.collectionObject = {collection: 'NOT SET'}}

Responder.prototype.set = function(collectionObject, done){this.collectionObject = collectionObject; done.resolve(); return done.promise}
Responder.prototype.show = function(req, res){respondWith(req, res, this.collectionObject, 'show')}
Responder.prototype.index = function(req, res){respondWith(req, res, this.collectionObject, 'index')}
Responder.prototype.double = function(req, res){respondWith(req, res, this.collectionObject, 'double')}

function respondWith(req, res, collectionObject, view) {
    req.header('accept') == 'application/json' ? res.send(collectionObject) : res.render(view, {collectionObject: collectionObject})
}

exports.Responder = Responder