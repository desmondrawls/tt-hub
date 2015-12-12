var _ = require('lodash')
var Q = require('q');
var Adapter = require('./adapter.js').Adapter
var hostUrl = 'http://localhost:4000/days/'
var serverUrl = 'http://localhost:3001/'
var hostPath = '/days/'
var adapter = new Adapter(hostUrl, serverUrl, hostPath)
var Responder = require('./responders.js').Responder
var responder = new Responder()

function index(req, res) {
    adapter.index(req, res, Q.defer())
        .then(function (collectionObject) {
            responder.set(collectionObject, Q.defer()).then(responder.respondWithIndex(req, res)).done()
        })
        .done()
}
function search(req, res) {
    adapter.search(req, res, Q.defer())
        .then(function (collectionObject) {
            responder.set(collectionObject, Q.defer()).then(responder.respondWithIndex(req, res)).done()
        })
        .done()
}
function show(req, res) {
    adapter.show(req, res, Q.defer())
        .then(function(collectionObject){
            responder.set(collectionObject, Q.defer()).then(responder.respondWithShow(req, res)).done()
        })
        .done()
}
function create(req, res) {
    adapter.create(req, res)
}
function update(req, res) {
    adapter.update(req, res)
}
function destroy(req, res) {
    adapter.destroy(req, res)
}

exports.index = index
exports.search = search
exports.create = create
exports.show = show
exports.update = update
exports.destroy = destroy