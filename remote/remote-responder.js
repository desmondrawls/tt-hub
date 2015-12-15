var RemoteResponder = function(){this.collectionObject = {collection: 'NOT SET'}}

RemoteResponder.prototype.set = function(collectionObject, done){this.collectionObject = collectionObject; done.resolve(); return done.promise}
RemoteResponder.prototype.show = function(req, res){respondWith(req, res, this.collectionObject, 'show')}
RemoteResponder.prototype.index = function(req, res){respondWith(req, res, this.collectionObject, 'index')}
RemoteResponder.prototype.redirect = function(res, path){
    res.format({
        html: function(){res.redirect('/')},
        json: function(){res.status(201).send("")}
    })
}
function respondWith(req, res, collectionObject, view) {
    req.header('accept') == 'application/json' ? res.send(collectionObject) : res.render(view, {collectionObject: collectionObject})
}

exports.RemoteResponder = RemoteResponder