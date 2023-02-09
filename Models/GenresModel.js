let mongoose = require('mongoose')


let genresSchema = new mongoose.Schema({
    name:{
        type:String,
        required:true,
        minlength:2
    }
})
let GenresModel = mongoose.model('genres',genresSchema)


module.exports = GenresModel