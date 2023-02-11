let UsersModel = require('../Models/UsersModel')
let express = require('express')
let router = express.Router()

router.post('/',async (request,response)=>{
    let {email, name, password} = request.body

    new UsersModel({name,email,password})
    .save()
    .then(resolve=>response.send(resolve))
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
