let UsersModel = require('../Models/Users')
let bcrypt = require('bcrypt')
let express = require('express')
let router = express.Router()

router.post('/',async (request,response)=>{
    let {email, name, password} = request.body

    let salt = await bcrypt.genSalt(10)
    password = await bcrypt.hash(password.toString(),salt)

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
