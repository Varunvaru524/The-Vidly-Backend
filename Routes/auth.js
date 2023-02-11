let UsersModel = require('../Models/UsersModel')
let express = require('express')
let router = express.Router()

router.post('/', (request,response)=>{
    let {email,password} = request.body

    UsersModel.find({email,password})
    .then(resolve=>{
        if (resolve.length !== 0) {
            response.send("JWT Token")
        }
        else response.send('Invalid Email or Password')
    })
    .catch(reject=>response.send("Internal Error"))
})

module.exports = router
