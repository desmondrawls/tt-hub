var express = require('express')
var Client = require('node-rest-client').Client
var debug = require('./app').debug
var immigrationsHelper = require('./helpers/collectionJson/immigrations.js')
var jsonTransformer = require('./helpers/collectionJson/transformer.js')
var _ = require('lodash')
var Q = require('q');


client = new Client()

var Collection = require('./db').CollectionJsonCollection
var Item = require('./db').CollectionJsonItem
var Template = require('./db').CollectionJsonTemplate
var Query = require('./db').CollectionJsonQuery
var hostUrl = 'http://localhost:4000/speakers/'
var serverUrl = 'http://localhost:3000/'

function index(req, res) {
    var args = {
        headers: {"Content-Type": "application/json", "Accept": "application/json"}
    }
    client.get(serverUrl, args, function (rawObject, response) {
        var object = JSON.parse(rawObject);
        var clearTemplate = Template.remove({}).exec()
        var clearQueries = Query.remove({}).exec()
        var clearItems = Item.remove({}).exec()
        var addTemplate = new Template(object.collection.template).save()
        var queryPromises = _.map(object.collection.queries, function (query) {
            return new Query(query).save()
        })
        var itemPromises = _.map(object.collection.items, function (item) {
            return new Item(item).save()
        })
        Q.all([clearTemplate, clearQueries, clearItems])
            .then(Q.when(addTemplate)
                .then(Q.all(queryPromises).done())
                .then(Q.all(itemPromises)
                    .then(function (items) {
                        var partiallyDomesticatedObject = immigrationsHelper.domesticateObjectItems(object, items, hostUrl)
                        respondWithCollectionObject(req, res, immigrationsHelper.domesticateObject(hostUrl, partiallyDomesticatedObject))
                    })
                .done())
            .done())
        .done()
    })
}

function search(req, res) {
    var response = function (template, items) {
        console.log("SEARCHED ITEMS:", items)
        respondWithCollectionObject(req, res, jsonTransformer.layout(hostUrl, items, template))
    }
    var template = Template.find({}).exec()
    var items = Item.find().elemMatch('data', function (elem) {
        _.each(req.query, function (value, name) {
            elem.where('value').equals(value).where('name').equals(name)
        })
    }).exec()
    Q.spread([template, items], function (templates, items) {
        console.log("TEMPLATES:", templates)
        response(templates[0], items)
    })
}

function create(req, res) {
    console.log("creating speaker ", "with " + req.body)
    var args = {
        data: req.body,
        headers: {"Content-Type": "application/json", "Accept": "application/json"}
    }
    client.post(serverUrl, args, function (object, response) {
        res.redirect('/speakers/')
    })
}

function show(req, res) {
    Item.findById(req.params.id, function (err, item) {
        var args = {
            headers: {"Content-Type": "application/json", "Accept": "application/json"}
        }
        client.get(item.href, args, function (rawObject, response) {
            new Collection(JSON.parse(rawObject).collection).save(function (err, savedObject) {
                respondWithItemObject(res, immigrationsHelper.domesticateObject(hostUrl + savedObject.id, {collection: savedObject}))
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
            headers: {"Content-Type": "application/json", "Accept": "application/json"}
        }
        client.delete(itemObject.href, args, function () {
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
    if (req.header('accept') == 'application/json') {
        res.send(collectionObject)
    } else {
        console.log("SPEAKERS WITH HTML")
        res.render('index', {collectionObject: collectionObject})
    }
}

exports.index = index
exports.search = search
exports.create = create
exports.show = show
exports.update = update
exports.destroy = destroy