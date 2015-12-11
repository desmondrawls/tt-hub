'use strict'

var _ = require('lodash')

var Object = function(object) {
    this.object = object
    this.listeners = []
}

Object.prototype.fetch = function() {
    return this.object
}

Object.prototype.update = function(object){
    this.object = object
    this.trigger()
}

Object.prototype.addListener = function(listener){
    this.listeners = this.listeners.concat(listener)
    console.log("Added a listener. Now: ", this.listeners)
}

Object.prototype.trigger = function(){
    var context = this
    _.each(this.listeners, function(listener){
        console.log('triggering with', context.object)
        listener(context.object)
    })
}

exports.Object = Object