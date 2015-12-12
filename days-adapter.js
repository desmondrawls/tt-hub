var _ = require('lodash')
var Adapter = require('./adapter.js').Adapter
var hostUrl = 'http://localhost:4000/days/'
var serverUrl = 'http://localhost:3001/'
var hostPath = '/days/'

function index(req, res) {new Adapter(hostUrl, serverUrl, hostPath).index(req, res)}
function search(req, res) {new Adapter(hostUrl, serverUrl, hostPath).search(req, res)}
function create(req, res) {new Adapter(hostUrl, serverUrl, hostPath).create(req, res)}
function show(req, res) {new Adapter(hostUrl, serverUrl, hostPath).show(req, res)}
function update(req, res) {new Adapter(hostUrl, serverUrl, hostPath).update(req, res)}
function destroy(req, res) {new Adapter(hostUrl, serverUrl, hostPath).destroy(req, res)}

exports.index = index
exports.search = search
exports.create = create
exports.show = show
exports.update = update
exports.destroy = destroy