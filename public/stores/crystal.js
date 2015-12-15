'use strict'

var _ = require('lodash')

var Crystal = function(crystal) {
    this.crystal = crystal
    this.listeners = []
}

Crystal.prototype.fetch = function() {
    return this.crystal
}

Crystal.prototype.update = function(crystal){
    this.crystal = crystal
    this.trigger()
}

Crystal.prototype.addListener = function(listener){
    this.listeners = this.listeners.concat(listener)
}

Crystal.prototype.trigger = function(){
    var context = this
    _.each(this.listeners, function(listener){
        console.log('triggering crystal update with', context.crystal)
        listener(context.crystal)
    })
}

exports.Crystal = Crystal