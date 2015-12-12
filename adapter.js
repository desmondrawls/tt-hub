'use strict'

var express = require('express')
var Client = require('node-rest-client').Client
var debug = require('./app').debug
var immigrationsHelper = require('./helpers/collectionJson/immigrations.js')
var jsonTransformer = require('./helpers/collectionJson/transformer.js')
var queriesHelper = require('./helpers/collectionJson/queries.js')
var itemsHelper = require('./helpers/collectionJson/items.js')
var templateHelper = require('./helpers/collectionJson/template.js')
var _ = require('lodash')
var Q = require('q');
var client = new Client()

var Collection = require('./db').CollectionJsonCollection
var Item = require('./db').CollectionJsonItem
var Template = require('./db').CollectionJsonTemplate
var Query = require('./db').CollectionJsonQuery

var Adapter = function(hostUrl, serverUrl, hostPath){
    this.hostUrl = hostUrl
    this.serverUrl = serverUrl
    this.hostPath = hostPath
}

Adapter.prototype.index = function(req, res, resolver) {
    var context = this
    var args = {
        headers: {"Content-Type": "application/json", "Accept": "application/json"}
    }
    client.get(context.serverUrl, args, function (rawObject, response) {
        var object = JSON.parse(rawObject);
        var clearTemplate = Template.remove({}).exec()
        var clearQueries = Query.remove({}).exec()
        var clearItems = Item.remove({}).exec()
        var addTemplate = new Template(templateHelper.getTemplate(object)).save()
        var addQueries = _.map(queriesHelper.getQueries(object), function (query) {return new Query(query).save()})
        var addItems = _.map(itemsHelper.getItems(object), function (item) {return new Item(item).save()})
        Q.all([clearTemplate, clearQueries, clearItems])
            .then(Q.when(addTemplate)
                .then(Q.all(addQueries).done())
                .then(Q.all(addItems)
                    .then(function (items) {
                        var partiallyDomesticatedObject = immigrationsHelper.domesticateObjectItems(object, items, context.hostUrl)
                        resolver.resolve(immigrationsHelper.domesticateObject(context.hostUrl, context.hostUrl, partiallyDomesticatedObject))
                    })
                .done())
            .done())
        .done()
    })
    return resolver.promise
}

Adapter.prototype.search = function(req, res, resolver) {
    var context = this
    var response = function (template, items) {
        var domesticatedItems = immigrationsHelper.domesticateItems(context.hostUrl, items);
        resolver.resolve(jsonTransformer.layout(context.hostUrl, context.hostUrl, domesticatedItems, template)
        )}
    var template = Template.find({}).exec()
    var items = Item.find().elemMatch('data', function (elem) {
        _.each(req.query, function (value, name) {elem.where('value').equals(value).where('name').equals(name)})
    }).exec()
    Q.spread([template, items], function (templates, items) {
        response(templates[0], items)
    })
    return resolver.promise
}

Adapter.prototype.create = function(req, res) {
    var context = this
    console.log("creating item ", "with " + req.body)
    var args = {
        data: req.body,
        headers: {"Content-Type": "application/json", "Accept": "application/json"}
    }
    client.post(context.serverUrl, args, function (object, response) {
        res.redirect(context.hostPath)
    })
}

Adapter.prototype.show = function(req, res, resolver) {
    var context = this
    Item.findById(req.params.id, function (err, item) {
        var args = {
            headers: {"Content-Type": "application/json", "Accept": "application/json"}
        }
        client.get(item.href, args, function (rawObject, response) {
            new Collection(JSON.parse(rawObject).collection).save(function (err, savedObject) {
                resolver.resolve(immigrationsHelper.domesticateObject(context.hostUrl, context.hostUrl + savedObject.id, {collection: savedObject}))
            })
        })
    })
    return resolver.promise
}

Adapter.prototype.update = function(req, res) {
    var context = this
    console.log("updating item " + req.params.id, "with " + req.body)
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

Adapter.prototype.destroy = function(req, res) {
    var context = this
    console.log("destroying item " + req.params.id)
    Collection.findById(req.params.id, function (err, itemObject) {
        var args = {
            headers: {"Content-Type": "application/json", "Accept": "application/json"}
        }
        client.delete(itemObject.href, args, function () {
            res.redirect(context.hostPath)
        })
    })
}

exports.Adapter = Adapter