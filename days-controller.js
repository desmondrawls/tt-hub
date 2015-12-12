var _ = require('lodash')
var Adapter = require('./adapter.js').Adapter
var hostUrl = 'http://localhost:4000/days/'
var serverUrl = 'http://localhost:3001/'
var hostPath = '/days/'
var adapter = new Adapter(hostUrl, serverUrl, hostPath)
var Responder = require('./responders.js').Responder
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