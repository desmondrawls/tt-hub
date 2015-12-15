var LocalAdapter = require('./local-adapter.js').LocalAdapter
var hostUrl = 'http://localhost:4000'
var serverUrl = 'http://localhost:4000/'
var hostPath = '/'
var adapter = new LocalAdapter(hostUrl, hostPath, serverUrl)
var LocalResponder = require('./local-responder.js').LocalResponder
var responder = new LocalResponder()
var Controller = require('./controller.js').Controller
var controller = new Controller(adapter, responder)

function index(req, res)    {controller.index(req, res)}

exports.index = index