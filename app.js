'use strict';

require('node-jsx').install();
var express = require('express')
var renderer = require('react-engine')
var _ = require('lodash')
var app = express()
var engine = renderer.server.create()
var speakersAdapter = require('./speakersAdapter')

app.engine('.jsx', engine)
app.set('views', __dirname + '/public/views')
app.set('view engine', 'jsx')
app.set('view', renderer.expressView)

app.use(express.static(__dirname + '/public'))

app.get('/speakers/', speakersAdapter.index)
app.post('/speakers/', speakersAdapter.create)
app.get('/speakers/:id', speakersAdapter.show)
app.put('/speakers/:id', speakersAdapter.update)
app.del('/speakers/:id', speakersAdapter.destroy)

app.listen(4000);
console.log('TechTalk client up on localhost:4000');

exports.app = app
