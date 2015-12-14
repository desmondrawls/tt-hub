var LocalAdapter = require('./local-adapter.js').LocalAdapter
var hostUrl = 'http://localhost:4000'
var serverUrl = 'http://localhost:4000/'
var hostPath = '/'
var adapter = new LocalAdapter(hostUrl, hostPath, serverUrl)
var Responder = require('./responders.js').Responder
var responder = new Responder()
var Controller = require('./controller.js').Controller
var controller = new Controller(adapter, responder)

function index(req, res)    {controller.double(req, res)}

exports.index = index