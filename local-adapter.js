'use strict'

var express = require('express')
var Client = require('node-rest-client').Client
var debug = require('./app').debug
var immigrationsHelper = require('./helpers/collectionJson/immigrations.js')
var jsonTransformer = require('./helpers/collectionJson/transformer.js')
var queriesHelper = require('./helpers/collectionJson/queries.js')
var itemsHelper = require('./helpers/collectionJson/items.js')
var templateHelper = require('./helpers/collectionJson/template.js')
var talksHelper = require('./helpers/talks.js')
var _ = require('lodash')
var Q = require('q');
var client = new Client()

var Collection = require('./cache').CollectionJsonCollection
var Item = require('./cache').CollectionJsonItem
var Template = require('./cache').CollectionJsonTemplate
var Query = require('./cache').CollectionJsonQuery
var Talk = require('./db').Talk

var LocalAdapter = function(hostUrl, serverUrl, hostPath){
    this.hostUrl = hostUrl
    this.serverUrl = serverUrl
    this.hostPath = hostPath
}

LocalAdapter.prototype.index = function(req, res, resolver) {
    var context = this
    Talk.find({}, function(talks){
        var formattedTalks = jsonTransformer.layout(context.hostUrl, context.hostUrl, talksHelper.formatTalks(talks), talksHelper.getTemplate());
        resolver.resolve(formattedTalks)
    })
    return resolver.promise
}

exports.LocalAdapter = LocalAdapter