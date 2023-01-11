module.exports = {
    logger: (req, res, next) => {
        console.log('Logger start: '+ Date.now())
    
        next()
    
        console.log('Logger end: ' + Date.now())
    },
    requestTime: (req, res, next) => {
        req.requestTime = Date.now()

        next()
    },
    requestURL: (req, res, next) => {
        console.log('Request for: '+ req.originalUrl + ' at ' + req.requestTime)
    
        next()
    }
}