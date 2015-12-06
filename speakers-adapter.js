var express = require('express')
var Client = require('node-rest-client').Client
var debug = require('./app').debug

client = new Client()

function index(req, res){
    res.render('index', {
        speakers: ['Ada Lovelace', 'Charles Babbage', 'Claude Shannon']
    })
}

function create(req, res){
    res.send('create endpoint successfully acquired')
}

function show(req, res) {
    var args = {
        headers:{"Content-Type": "application/json", "Accept": "application/json"}
    }
    client.get('http://localhost:3000/' + req.params.id, args, function(speaker, response){
        respondWithSpeaker(res, speaker)
    })
}

function update(req, res) {
    res.send('update endpoint successfully acquired')
}

function destroy(req, res) {
    res.send('delete endpoint successfully acquired')
}

function respondWithSpeaker(res, speaker) {
    res.format({
        html: function () {
            res.render('show', {initialAttributes: JSON.parse(speaker).collection.items[0].data})
        },
        json: function () {
            res.send(speaker)

        }
    })
}

exports.index = index
exports.create = create
exports.show = show
exports.update = update
exports.destroy = destroy