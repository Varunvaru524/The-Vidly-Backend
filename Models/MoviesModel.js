let mongoose = require('mongoose')

let schema = mongoose.Schema({
    title:{
        type:String,
        required:true,
        minlength:3,
        maxlength:100
    },
    numberInStock:{
        type:Number,
        required:true,
        min:0,
        max:10000
    },
    dailyRentalRate:{
        type:Number,
        required:true,
        min:0,
        max:10000
    },
    genre:{
        type:mongoose.Schema.Types.ObjectId,
        required:true,
        ref:'genres'
    }
})
let MoviesModel = mongoose.model('movies',schema)

module.exports = MoviesModel