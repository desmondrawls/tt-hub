var LocalResponder = function(){this.molecule = {collection: 'NOT SET'}}

LocalResponder.prototype.set = function(molecule, done){this.molecule = molecule; done.resolve(); return done.promise}
LocalResponder.prototype.index = function(req, res){respondWith(req, res, this.molecule, 'double')}
LocalResponder.prototype.redirect = function(res, path){res.redirect(path)}

function respondWith(req, res, molecule, view) {
    req.header('accept') == 'application/json' ? res.send(molecule) : res.render(view, {molecule: molecule})
}

exports.LocalResponder = LocalResponder