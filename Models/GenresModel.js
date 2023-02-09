let mongoose = require('mongoose')


let schema = new mongoose.Schema({
    name:{
        type:String,
        required:true,
        minlength:2
    }
})
let GenresModel = mongoose.model('genres',schema)


module.exports = GenresModel