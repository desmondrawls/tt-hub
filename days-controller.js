var Adapter = require('./remote-adapter.js').RemoteAdapter
var hostRoot = 'http://localhost:4000'
var serverUrl = 'http://localhost:3001/'
var hostPath = '/days/'

var Collection = require('./cache').DayCollectionJsonCollection
var Item = require('./cache').DayCollectionJsonItem
var Template = require('./cache').DayCollectionJsonTemplate
var Query = require('./cache').DayCollectionJsonQuery

var adapter = new Adapter(hostRoot, hostPath, serverUrl, Collection, Item, Template, Query)
var Responder = require('./remote-responder.js').RemoteResponder
var responder = new Responder()
var Controller = require('./controller.js').Controller
var controller = new Controller(adapter, responder)

function index(req, res)    {controller.index(req, res)}
function search(req, res)   {controller.search(req, res)}
function show(req, res)     {controller.show(req, res)}
function create(req, res)   {controller.create(req, res)}
function update(req, res)   {controller.update(req, res)}
function destroy(req, res)  {controller.destroy(req, res)}

exports.index = index
exports.search = search
exports.create = create
exports.show = show
exports.update = update
exports.destroy = destroy