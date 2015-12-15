var RemoteResponder = function(){this.molecule = {collection: 'NOT SET'}}

RemoteResponder.prototype.set = function(molecule, done){this.molecule = molecule; done.resolve(); return done.promise}
RemoteResponder.prototype.show = function(req, res){respondWith(req, res, this.molecule, 'show')}
RemoteResponder.prototype.index = function(req, res){respondWith(req, res, this.molecule, 'index')}
RemoteResponder.prototype.redirect = function(res, path){res.redirect(path)}

function respondWith(req, res, molecule, view) {
    req.header('accept') == 'application/json' ? res.send(molecule) : res.render(view, {molecule: molecule})
}

exports.RemoteResponder = RemoteResponder