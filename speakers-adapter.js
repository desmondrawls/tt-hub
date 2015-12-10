var express = require('express')
var Client = require('node-rest-client').Client
var debug = require('./app').debug
var immigrationsHelper = require('./helpers/collectionJson/immigrations.js')
var _ = require('lodash')
var Q = require('q');


client = new Client()

var Speaker = require('./db').CollectionJsonSpeaker
var Item = require('./db').CollectionJsonItem
var hostUrl = 'http://localhost:4000/speakers/'

function index(req, res) {
    var args = {
        headers: {"Content-Type": "application/json", "Accept": "application/json"}
    }
    client.get('http://localhost:3000/', args, function (rawSpeakersObject, response) {
        var speakersObject = JSON.parse(rawSpeakersObject);
        var savePromises = _.map(speakersObject.collection.items, function (item) {
            return new Item(item).save()
        })
        Q.all(savePromises).then(function (items) {
            var partiallyDomesticatedObject = immigrationsHelper.domesticateObjectItems(speakersObject, items, hostUrl)
            respondWithSpeakers(req, res, immigrationsHelper.domesticateObject(hostUrl, partiallyDomesticatedObject))
        }).done()
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
    Item.findById(req.params.id, function(err, item){
        var args = {
            headers:{"Content-Type": "application/json", "Accept": "application/json"}
        }
        client.get(item.href, args, function(speakerObject, response){
            new Speaker(JSON.parse(speakerObject).collection).save(function(err, speakerObject){
                respondWithSpeaker(res, immigrationsHelper.domesticateObject(hostUrl + speakerObject.id, {collection: speakerObject}))
            })
        })
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
    Speaker.findById(req.params.id, function (err, speaker) {
        var args = {
            headers:{"Content-Type": "application/json", "Accept": "application/json"}
        }
        client.delete(speaker.href, args, function(speakerObject, response){
            res.redirect('/speakers/')
        })
    })
}

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
        console.log("SPEAKERS WITH HTML")
        res.render('index', {speakersObject: speakersObject})
    }
}

exports.index = index
exports.create = create
exports.show = show
exports.update = update
exports.destroy = destroy