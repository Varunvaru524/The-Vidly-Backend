let UsersModel = require('../Models/UsersModel')
let jwt = require('jsonwebtoken')
let config = require('config')
let express = require('express')
let router = express.Router()

router.post('/',async (request,response)=>{
    let {email, name, password} = request.body

    new UsersModel({name,email,password})
    .save()
    .then(resolve=>{
        let result = {_id:resolve._id, email: resolve.email, name:resolve.name}
        let token = jwt.sign(result,config.get('JwtPrivateKey'))
        response.send(token)
    })
    .catch(reject=>{
        if (reject.code == 11000) {
            response.send('User already registered')
        }
        else {
            response.send(reject.message)
        }
    })
})

module.exports = router
