function logRequest(req, res, next) {
    console.log('---------------')
    console.log(req.method, ' with params ', req.params, 'and body ', req.body, ' at ' + req.path)
    var acceptsHTML = req.accepts('html');
    var acceptsJSON = req.accepts('json');
    var acceptsCollectionJson = req.accepts('application/vnd.collection+json');
    if(acceptsHTML){ console.log("ACCEPTING HTML")}
    if(acceptsJSON){ console.log("ACCEPTING JSON")}
    if(acceptsCollectionJson){ console.log("ACCEPTING COLLECTION JSON")}
    console.log("SENDING REQUEST WITH CONTENT_TYPE:", req.header('Content-Type'))
    console.log("ACCEPTING CONTENT_TYPE:", req.header('Accept'))
    console.log('---------------')
    next()
}

function logResponse(req, res, next) {
    res.format({
        html: function () {
            console.log("SET TO RESPOND WITH HTML")
        },
        json: function () {
            console.log("SET TO RESPOND WITH JSON")
        }
    })
    next()
}

function prioritizeJson(req, res, next) {
    if(req.accepts('json')){
        res.setHeader('Content-Type', 'application/json');
    }
}

exports.logRequest = logRequest
exports.logResponse = logResponse
exports.prioritizeJson = prioritizeJson