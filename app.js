'use strict';

require('node-jsx').install();

var express = require('express')
var renderer = require('react-engine')
var _ = require('lodash')
var app = express()
var engine = renderer.server.create()
var speakersAdapter = require('./speakers-adapter')
var daysAdapter = require('./days-adapter')
var middleware = require('./middleware')
var bodyParser = require('body-parser')
var methodOverride = require('method-override')

app.engine('.jsx', engine)

app.set('views', __dirname + '/public/views')
app.set('view engine', 'jsx')
app.set('view', renderer.expressView)


// override with POST having ?_method=DELETE
app.use(methodOverride('_method'))
app.use(bodyParser.urlencoded({ extended: true }))
app.use(express.static(__dirname + '/public'))
app.use('/stylesheets', express.static('stylesheets'));
app.use('/jquery', express.static(__dirname + '/node_modules/jquery/dist/'));
app.use(middleware.logRequest)
app.use(middleware.logResponse)

app.get('/speakers/', speakersAdapter.index)
app.get('/speakers/search', speakersAdapter.search)
app.post('/speakers/', speakersAdapter.create)
app.get('/speakers/:id', speakersAdapter.show)
app.put('/speakers/:id', speakersAdapter.update)
app.delete('/speakers/:id', speakersAdapter.destroy)
app.delete('/speakers/:id', speakersAdapter.destroy)

app.get('/days/', daysAdapter.index)
app.get('/days/search', daysAdapter.search)
app.post('/days/', daysAdapter.create)
app.get('/days/:id', daysAdapter.show)
app.put('/days/:id', daysAdapter.update)
app.delete('/days/:id', daysAdapter.destroy)
app.delete('/days/:id', daysAdapter.destroy)

app.listen(4000);

console.log('TechTalk client up on localhost:4000');

exports.app = app
