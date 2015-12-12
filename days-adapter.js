var _ = require('lodash')
var Adapter = require('./adapter.js').Adapter
var Responders = require('./responders.js')
var hostUrl = 'http://localhost:4000/days/'
var serverUrl = 'http://localhost:3001/'
var hostPath = '/days/'
var adapter = new Adapter(hostUrl, serverUrl, hostPath)

function index(req, res)    {adapter.index(req, res, Responders.respondWithIndex)}
function search(req, res)   {adapter.search(req, res, Responders.respondWithIndex)}
function create(req, res)   {adapter.create(req, res)}
function show(req, res)     {adapter.show(req, res, Responders.respondWithShow)}
function update(req, res)   {adapter.update(req, res)}
function destroy(req, res)  {adapter.destroy(req, res)}

exports.index = index
exports.search = search
exports.create = create
exports.show = show
exports.update = update
exports.destroy = destroy