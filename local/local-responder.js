var LocalResponder = function(){this.collectionObject = {collection: 'NOT SET'}}

LocalResponder.prototype.set = function(collectionObject, done){this.collectionObject = collectionObject; done.resolve(); return done.promise}
LocalResponder.prototype.index = function(req, res){respondWith(req, res, this.collectionObject, 'double')}
LocalResponder.prototype.redirect = function(res, path){
    res.format({
        html: function(){res.redirect('/')},
        json: function(){res.status(201).send("")}
    })
}

function respondWith(req, res, collectionObject, view) {
    req.header('accept') == 'application/json' ? res.send(collectionObject) : res.render(view, {collectionObject: collectionObject})
}

exports.LocalResponder = LocalResponder