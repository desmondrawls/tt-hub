var _ = require('lodash')
var collectionsHelper = require('./collection.js')

function getQueries(molecule){
    return collectionsHelper.getCollection(molecule).queries
}

function getPrompt(query){
    return query.prompt
}

function getHref(query){
    return query.href
}

function getData(query){
    return query.data
}

function getDataName(queryData){
    return queryData.name
}

function getDataValue(queryData){
    return queryData.value
}

function takesInput(query){
    return typeof getData(query) == 'object'
}

function getDataType(queryData){
    return queryData.type
}

function copyDataWithValue(queryData, value){
    var newQueryData = _.clone(queryData, true)
    return _.merge(newQueryData, {value: value})
}

function mergeData(existingQueryData, newQueryData){
    var index = _.indexOf(existingQueryData, _.find(existingQueryData, function(input){return input.name == newQueryData.name}));
    var workingCopy = _.clone(existingQueryData, true)
    workingCopy.splice(index, 1, newQueryData)
    return workingCopy
}

exports.getQueries = getQueries
exports.getPrompt = getPrompt
exports.getData = getData
exports.getHref = getHref
exports.getDataName = getDataName
exports.getDataValue = getDataValue
exports.takesInput = takesInput
exports.getDataType = getDataType
exports.copyDataWithValue = copyDataWithValue
exports.mergeData = mergeData