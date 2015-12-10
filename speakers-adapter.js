var express = require('express')
var Client = require('node-rest-client').Client
var debug = require('./app').debug
var immigrationsHelper = require('./helpers/collectionJson/immigrations.js')
var _ = require('lodash')
var Q = require('q');


client = new Client()

var Collection = require('./db').CollectionJsonCollection
var Item = require('./db').CollectionJsonItem
var hostUrl = 'http://localhost:4000/speakers/'
var serverUrl = 'http://localhost:3000/'

function index(req, res) {
    var args = {
        headers: {"Content-Type": "application/json", "Accept": "application/json"}
    }
    client.get(serverUrl, args, function (rawObject, response) {
        var object = JSON.parse(rawObject);
        var savePromises = _.map(object.collection.items, function (item) {
            return new Item(item).save()
        })
        Q.all(savePromises).then(function (items) {
            var partiallyDomesticatedObject = immigrationsHelper.domesticateObjectItems(object, items, hostUrl)
            respondWithCollectionObject(req, res, immigrationsHelper.domesticateObject(hostUrl, partiallyDomesticatedObject))
        }).done()
    })
}

function create(req, res){
    console.log("creating speaker ", "with " + req.body)
    var args = {
        data: req.body,
        headers:{"Content-Type": "application/json", "Accept": "application/json"}
    }
    client.post(serverUrl, args, function(object, response){
        res.redirect('/speakers/')
    })
}

function show(req, res) {
    Item.findById(req.params.id, function(err, item){
        var args = {
            headers:{"Content-Type": "application/json", "Accept": "application/json"}
        }
        client.get(item.href, args, function(speakerObject, response){
            new Collection(JSON.parse(speakerObject).collection).save(function(err, speakerObject){
                respondWithItemObject(res, immigrationsHelper.domesticateObject(hostUrl + speakerObject.id, {collection: speakerObject}))
            })
        })
    })
}

function update(req, res) {
    console.log("updating speaker " + req.params.id, "with " + req.body)
    Collection.findById(req.params.id, function (err, itemObject) {
        var args = {
            data: req.body,
            headers: {"Content-Type": "application/json", "Accept": "application/json"}
        }
        client.put(itemObject.href, args, function (remoteItemObject, response) {
            res.send(remoteItemObject)
        })
    })
}

function destroy(req, res) {
    console.log("destroying speaker " + req.params.id)
    Collection.findById(req.params.id, function (err, itemObject) {
        var args = {
            headers:{"Content-Type": "application/json", "Accept": "application/json"}
        }
        client.delete(itemObject.href, args, function(){
            res.redirect('/speakers/')
        })
    })
}

function respondWithItemObject(res, itemObject) {
    res.format({
        html: function () {
            res.render('show', {itemObject: itemObject})
        },
        json: function () {
            res.send(itemObject)

        }
    })
}

function respondWithCollectionObject(req, res, collectionObject) {
    if(req.header('accept') == 'application/json'){
        res.send(collectionObject)
    } else {
        console.log("SPEAKERS WITH HTML")
        res.render('index', {collectionObject: collectionObject})
    }
}

exports.index = index
exports.create = create
exports.show = show
exports.update = update
exports.destroy = destroy