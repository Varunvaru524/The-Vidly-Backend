let UsersModel = require('../Models/UsersModel')
let bcrypt = require('bcrypt')
let express = require('express')
let router = express.Router()

router.post('/',async (request,response)=>{
    let {email,password} = request.body

    response.send('Auth Post request')
})

module.exports = router