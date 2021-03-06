var Q = require('q');

var Controller = function(adapter, responder){
    this.adapter = adapter
    this.responder = responder
}

Controller.prototype.index = function(req, res) {
    var context = this
    context.adapter.index(req, res, Q.defer())
        .then(function (molecule) {
            context.responder.set(molecule, Q.defer()).then(context.responder.index(req, res)).done()
        })
        .done()
}

Controller.prototype.search = function(req, res) {
    var context = this
    context.adapter.search(req, res, Q.defer())
        .then(function (molecule) {
            context.responder.set(molecule, Q.defer()).then(context.responder.index(req, res)).done()
        })
        .done()
}

Controller.prototype.show = function(req, res) {
    var context = this
    context.adapter.show(req, res, Q.defer())
        .then(function(molecule){
            context.responder.set(molecule, Q.defer()).then(context.responder.show(req, res)).done()
        })
        .done()
}

Controller.prototype.create = function(req, res) {
    var context = this
    context.adapter.create(req, res, Q.defer()).then(function(path){context.responder.redirect(res, path)}).done()
}

Controller.prototype.update = function(req, res) {
    var context = this
    context.adapter.update(req, res, Q.defer())
        .then(function(molecule){
            context.responder.set(molecule, Q.defer()).then(context.responder.show(req, res)).done()
        })
        .done()
}

Controller.prototype.destroy = function(req, res) {
    var context = this
    context.adapter.destroy(req, res, Q.defer()).then(function(path){context.responder.redirect(res, path)}).done()
}

exports.Controller = Controller