'use strict';

require('node-jsx').install();

var express = require('express')
var renderer = require('react-engine')
var _ = require('lodash')
var app = express()
var engine = renderer.server.create()
var speakersAdapter = require('./speakers-adapter')
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
app.use(function (req, res, next) {
    console.log('---------------')
    console.log(req.method, ' with params ', req.params, 'and body ', req.body, ' at ' + req.path)
    console.log('---------------')
    next()
})

app.get('/speakers/', speakersAdapter.index)
app.post('/speakers/', speakersAdapter.create)
app.get('/speakers/:id', speakersAdapter.show)
app.put('/speakers/:id', speakersAdapter.update)
app.delete('/speakers/:id', speakersAdapter.destroy)

app.listen(4000);

console.log('TechTalk client up on localhost:4000');

exports.app = app
