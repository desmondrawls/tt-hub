'use strict'

var express = require('express')
var Client = require('node-rest-client').Client
var immigrationsHelper = require('../collectionJsonHelpers/converters/immigrations.js')
var jsonTransformer = require('../collectionJsonHelpers/converters/layout.js')
var queriesHelper = require('../collectionJsonHelpers/extractors/queries.js')
var itemsHelper = require('../collectionJsonHelpers/extractors/items.js')
var templateHelper = require('../collectionJsonHelpers/extractors/template.js')
var _ = require('lodash')
var Q = require('q');
var client = new Client()

var RemoteAdapter = function(hostRoot, hostPath, serverUrl, collectionModel, itemModel, templateModel, queryModel){
    this.hostRoot = hostRoot
    this.hostPath = hostPath
    this.serverUrl = serverUrl
    this.CollectionModel = collectionModel
    this.ItemModel = itemModel
    this.TemplateModel = templateModel
    this.QueryModel = queryModel
}

RemoteAdapter.prototype.index = function(req, res, resolver) {
    var context = this
    var args = {
        headers: {"Content-Type": "application/json", "Accept": "application/json"}
    }
    client.get(context.serverUrl, args, function (rawObject, response) {
        var object = JSON.parse(rawObject);
        var clearTemplate = context.TemplateModel.remove({}).exec()
        var clearQueries = context.QueryModel.remove({}).exec()
        var clearItems = context.ItemModel.remove({}).exec()
        var addTemplate = new context.TemplateModel(templateHelper.getTemplate(object)).save()
        var addQueries = _.map(queriesHelper.getQueries(object), function (query) {return new context.QueryModel(query).save()})
        var addItems = _.map(itemsHelper.getItems(object), function (item) {return new context.ItemModel(item).save()})
        Q.all([clearTemplate, clearQueries, clearItems])
            .then(Q.when(addTemplate)
                .then(Q.all(addQueries).done())
                .then(Q.all(addItems)
                    .then(function (items) {
                        var partiallyDomesticatedObject = immigrationsHelper.domesticateObjectItems(object, items, context.hostRoot + context.hostPath)
                        resolver.resolve(immigrationsHelper.domesticateObject(context.hostRoot, context.hostRoot + context.hostPath, partiallyDomesticatedObject))
                    })
                .done())
            .done())
        .done()
    })
    return resolver.promise
}

RemoteAdapter.prototype.search = function(req, res, resolver) {
    var context = this
    var response = function (template, items) {
        var domesticatedItems = immigrationsHelper.domesticateItems(context.hostRoot + context.hostPath, items);
        resolver.resolve(jsonTransformer.layout(context.hostRoot, context.hostRoot + context.hostPath, domesticatedItems, template)
        )}
    var template = context.TemplateModel.find({}).exec()
    var items = context.ItemModel.find().elemMatch('data', function (elem) {
        _.each(req.query, function (value, name) {elem.where('value').equals(value).where('name').equals(name)})
    }).exec()
    Q.spread([template, items], function (templates, items) {
        response(templates[0], items)
    })
    return resolver.promise
}

RemoteAdapter.prototype.create = function(req, res) {
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

RemoteAdapter.prototype.show = function(req, res, resolver) {
    var context = this
    context.ItemModel.findById(req.params.id, function (err, item) {
        var args = {
            headers: {"Content-Type": "application/json", "Accept": "application/json"}
        }
        client.get(item.href, args, function (rawObject, response) {
            new context.CollectionModel(JSON.parse(rawObject).collection).save(function (err, savedObject) {
                resolver.resolve(immigrationsHelper.domesticateObject(context.hostRoot, context.hostRoot + context.hostPath + savedObject.id, {collection: savedObject}))
            })
        })
    })
    return resolver.promise
}

RemoteAdapter.prototype.update = function(req, res) {
    var context = this
    console.log("updating item " + req.params.id, "with " + req.body)
    this.CollectionModel.findById(req.params.id, function (err, itemObject) {
        var args = {
            data: req.body,
            headers: {"Content-Type": "application/json", "Accept": "application/json"}
        }
        client.put(itemObject.href, args, function (remoteItemObject, response) {
            res.send(remoteItemObject)
        })
    })
}

RemoteAdapter.prototype.destroy = function(req, res) {
    var context = this
    console.log("destroying item " + req.params.id)
    this.CollectionModel.findById(req.params.id, function (err, itemObject) {
        var args = {
            headers: {"Content-Type": "application/json", "Accept": "application/json"}
        }
        client.delete(itemObject.href, args, function () {
            res.redirect(context.hostPath)
        })
    })
}

exports.RemoteAdapter = RemoteAdapter