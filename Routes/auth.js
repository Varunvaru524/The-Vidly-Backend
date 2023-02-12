let UsersModel = require('../Models/UsersModel')
let config = require('config')
let jwt = require('jsonwebtoken')
let express = require('express')
let router = express.Router()

router.post('/', (request,response)=>{
    let {email,password} = request.body

    UsersModel.find({email,password})
    .then(resolve=>{
        if (resolve.length !== 0) {
        let result = {_id:resolve[0]._id, email: resolve[0].email, name:resolve[0].name}
        let token = jwt.sign(result,config.get('JwtPrivateKey'))
            response.send(token)
        }
        else response.send('Invalid Email or Password')
    })
    .catch(reject=>response.send("Internal Error"))
})

module.exports = router
