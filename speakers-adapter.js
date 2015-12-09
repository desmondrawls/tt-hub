var express = require('express')
var Client = require('node-rest-client').Client
var debug = require('./app').debug

client = new Client()

function index(req, res){
    var args = {
        headers:{"Content-Type": "application/json", "Accept": "application/json"}
    }
    client.get('http://localhost:3000/', args, function(speakersObject, response){
        respondWithSpeakers(res, speakersObject)
    })
}

function create(req, res){
    res.send('create endpoint successfully acquired')
}

function show(req, res) {
    var args = {
        headers:{"Content-Type": "application/json", "Accept": "application/json"}
    }
    client.get('http://localhost:3000/' + req.params.id, args, function(speakerObject, response){
        respondWithSpeaker(res, speakerObject)
    })
}

function update(req, res) {
    console.log("updating speaker " + req.params.id, "with " + req.body)
    var args = {
        data: req.body,
        headers:{"Content-Type": "application/json", "Accept": "application/json"}
    }
    client.put('http://localhost:3000/' + req.params.id, args, function(speakerObject, response){
        res.send(speakerObject)
    })
}

function destroy(req, res) {
    console.log("destroying speaker " + req.params.id)
    var args = {
        headers:{"Content-Type": "application/json", "Accept": "application/json"}
    }
    client.delete('http://localhost:3000/' + req.params.id, args, function(speakerObject, response){
        res.redirect('/speakers/')
    })}

function respondWithSpeaker(res, speakerObject) {
    res.format({
        html: function () {
            res.render('show', {speakerObject: JSON.parse(speakerObject)})
        },
        json: function () {
            res.send(speakerObject)

        }
    })
}

function respondWithSpeakers(res, speakersObject) {
    res.format({
        html: function () {
            res.render('index', {speakersObject: JSON.parse(speakersObject)})
        },
        json: function () {
            res.send(speakersObject)
        }
    })
}

exports.index = index
exports.create = create
exports.show = show
exports.update = update
exports.destroy = destroy