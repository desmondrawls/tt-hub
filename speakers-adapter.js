var express = require('express')
var Client = require('node-rest-client').Client
var debug = require('./app').debug
var immigrationsHelper = require('./helpers/collectionJson/immigrations.js')

client = new Client()

var Speaker = require('./db').CollectionJsonSpeaker

function index(req, res){
    var args = {
        headers:{"Content-Type": "application/json", "Accept": "application/json"}
    }
    client.get('http://localhost:3000/', args, function(speakersObject, response){
        respondWithSpeakers(req, res, immigrationsHelper.domesticateSpeakerObject('http://localhost:4000/speakers/', JSON.parse(speakersObject)))
    })
}

function create(req, res){
    console.log("creating speaker ", "with " + req.body)
    var args = {
        data: req.body,
        headers:{"Content-Type": "application/json", "Accept": "application/json"}
    }
    client.post('http://localhost:3000/', args, function(speakersObject, response){
        res.redirect('/speakers/')
    })
}

function show(req, res) {
    var args = {
        headers:{"Content-Type": "application/json", "Accept": "application/json"}
    }
    client.get('http://localhost:3000/' + req.params.id, args, function(speakerObject, response){
        new Speaker(JSON.parse(speakerObject).collection).save(function(err, speakerObject){
            respondWithSpeaker(res, immigrationsHelper.domesticateSpeakerObject('http://localhost:4000/speakers/' + speakerObject.id, {collection: speakerObject}))
        })
    })
}

function findAllSpeakers(){
    return Speaker.find({}, function(err, speakers){
        return speakers
    })
}

function update(req, res) {
    console.log("updating speaker " + req.params.id, "with " + req.body)
    Speaker.findById(req.params.id, function (err, speaker) {
        var args = {
            data: req.body,
            headers: {"Content-Type": "application/json", "Accept": "application/json"}
        }
        client.put(speaker.href, args, function (speakerObject, response) {
            res.send(speakerObject)
        })
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
            res.render('show', {speakerObject: speakerObject})
        },
        json: function () {
            res.send(speakerObject)

        }
    })
}

function respondWithSpeakers(req, res, speakersObject) {
    if(req.header('accept') == 'application/json'){
        res.send(speakersObject)
    } else {
        res.render('index', {speakersObject: speakersObject})
    }
}

exports.index = index
exports.create = create
exports.show = show
exports.update = update
exports.destroy = destroy