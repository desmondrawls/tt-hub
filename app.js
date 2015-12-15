'use strict';

require('node-jsx').install();

var express = require('express')
var renderer = require('react-engine')
var _ = require('lodash')
var app = express()
var engine = renderer.server.create()
var middleware = require('./middleware')
var bodyParser = require('body-parser')
var methodOverride = require('method-override')

app.engine('.jsx', engine)

app.set('views', __dirname + '/public/views')
app.set('view engine', 'jsx')
app.set('view', renderer.expressView)


// override with POST having ?_method=DELETE
app.use(methodOverride('_method'))
app.use(bodyParser.urlencoded({extended: true}))
app.use(express.static(__dirname + '/public'))
app.use('/stylesheets', express.static('stylesheets'));
app.use('/jquery', express.static(__dirname + '/node_modules/jquery/dist/'));
app.use(middleware.logRequest)
app.use(middleware.logResponse)

var speakersController = require('./remote/speakers-controller')
app.get('/speakers/', speakersController.index)
app.get('/speakers/search', speakersController.search)
app.post('/speakers/', speakersController.create)
app.get('/speakers/:id', speakersController.show)
app.put('/speakers/:id', speakersController.update)
app.delete('/speakers/:id', speakersController.destroy)

var daysController = require('./remote/days-controller')
app.get('/days/', daysController.index)
app.get('/days/search', daysController.search)
app.post('/days/', daysController.create)
app.get('/days/:id', daysController.show)
app.put('/days/:id', daysController.update)
app.delete('/days/:id', daysController.destroy)

var talksController = require('./local/talks-controller')
app.get('/', talksController.index)

app.listen(4000);

console.log('TechTalk client up on localhost:4000');

exports.app = app
