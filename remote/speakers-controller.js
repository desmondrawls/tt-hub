var hostRoot = 'http://localhost:4000'
var serverUrl = 'http://localhost:3000/'
var hostPath = '/speakers/'

var Collection = require('./../cache').SpeakersCollectionJsonCollection
var Item = require('./../cache').SpeakersCollectionJsonItem
var Template = require('./../cache').SpeakersCollectionJsonTemplate
var Query = require('./../cache').SpeakersCollectionJsonQuery

var RemoteAdapter = require('./remote-adapter.js').RemoteAdapter
var adapter = new RemoteAdapter(hostRoot, hostPath, serverUrl, Collection, Item, Template, Query)
var RemoteResponder = require('./remote-responder.js').RemoteResponder
var responder = new RemoteResponder()
var Controller = require('./../controller.js').Controller
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