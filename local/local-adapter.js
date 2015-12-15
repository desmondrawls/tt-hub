'use strict'

var express = require('express')
var Client = require('node-rest-client').Client
var layout = require('../collectionJsonHelpers/converters/layout.js')
var talksTransformer = require('./../collectionJsonHelpers/domain/talks-transformer.js')
var talksTranslater = require('./../collectionJsonHelpers/domain/talks-translater.js')
var client = new Client()
var Q = require('q');

var Talk = require('./../db').Talk

var LocalAdapter = function(hostRoot, hostPath, serverUrl){
    this.hostRoot = hostRoot
    this.hostPath = hostPath
    this.serverUrl = serverUrl
}

LocalAdapter.prototype.index = function(req, res, resolver) {
    var context = this
    var findTalks = Talk.find({}).exec()
    Q.when(findTalks).then(function(talks){
        var formattedTalks = layout.layout(context.hostRoot + context.hostPath, context.hostRoot + context.hostPath, talksTransformer.formatTalks(talks), talksTransformer.getTemplate());
        resolver.resolve(formattedTalks)
    }).done()
    return resolver.promise
}

LocalAdapter.prototype.create = function(req, res, resolver){
    var talk = talksTranslater.talkFromTemplateObject((req.body))
    new Talk(talk).save().then(function(talk){resolver.resolve(context.hostPath)})
    return resolver.promise
}


exports.LocalAdapter = LocalAdapter