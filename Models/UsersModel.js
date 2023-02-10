let mongoose = require('mongoose')

let schema = new mongoose.Schema({
    name:{
        type:String,
        required:true,
        minlength:2,
        maxlength:100
    },
    email:{
        type:String,
        unique:true,
        required:true,
        minlength:5,
        maxlength:100
    },
    password:{
        type:String,
        required:true,
        minlength:3,
        maxlength:1000
    }
})
let UsersModel = mongoose.model('users',schema)

module.exports = UsersModel