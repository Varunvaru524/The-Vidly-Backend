module.exports = function (error,request,response,next) {
    // log Error
    response.status(500).send('Internal Error')
}