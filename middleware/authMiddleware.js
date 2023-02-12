let jwt = require('jsonwebtoken')
let config = require('config')

module.exports = function (request,response,next) {
    let token = request.header('x-auth-token')
    if (!token) return response.status(401).send('Access denied, No token provied')

    try {
        let decoded = jwt.verify(token, config.get('JwtPrivateKey'))
        request.decoded = decoded
        next()
    } catch (error) {
        response.status(400).send('Invalid JWT Token')
    }
}