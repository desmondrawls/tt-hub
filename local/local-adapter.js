'use strict'

var express = require('express')
var Client = require('node-rest-client').Client
var jsonTransformer = require('../collectionJsonHelpers/converters/transformer.js')
var talksHelper = require('./../collectionJsonHelpers/domain/talks.js')
var client = new Client()

var Collection = require('./../cache').CollectionJsonCollection
var Item = require('./../cache').CollectionJsonItem
var Template = require('./../cache').CollectionJsonTemplate
var Query = require('./../cache').CollectionJsonQuery
var Talk = require('./../db').Talk

var LocalAdapter = function(hostRoot, hostPath, serverUrl){
    this.hostRoot = hostRoot
    this.hostPath = hostPath
    this.serverUrl = serverUrl
}

LocalAdapter.prototype.index = function(req, res, resolver) {
    var context = this
    Talk.find({}, function(talks){
        var formattedTalks = jsonTransformer.layout(context.hostRoot + context.hostPath, context.hostRoot + context.hostPath, talksHelper.formatTalks(talks), talksHelper.getTemplate());
        resolver.resolve(formattedTalks)
    })
    return resolver.promise
}

exports.LocalAdapter = LocalAdapter