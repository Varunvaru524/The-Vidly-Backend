let mongoose = require('mongoose')
let express = require('express')
let genresRoute = express.Router()


let genresSchema = new mongoose.Schema({
    name:{
        type:String,
        required:true,
        minlength:2
    }
})
let GenresModel = mongoose.model('genres',genresSchema)


genresRoute.get('/',(request,response)=>{
    GenresModel.find().sort({name:1})
    .then(resolve=>response.send(resolve))
    .catch(reject=>response.status(400).send('Internal Error'))
})

genresRoute.get('/:id',(request,response)=>{
    GenresModel.findById(request.params.id)
    .then(resolve=>response.send(resolve))
    .catch(reject=>response.status(404).send("Invalid"))
})

genresRoute.post('/',(request,response)=>{
    let inputGenre = new GenresModel({
        name:request.body.name
    })

    inputGenre.save()
    .then(resolve=>response.send(resolve))
    .catch(reject=>response.status(400).send(reject.message))
})

genresRoute.put('/:id',(request,response)=>{
    GenresModel.findById(request.params.id)
    .then(resolve=>{
        resolve.name = request.body.name
        resolve.save()
        .then(resolve=> response.send(resolve))
        .catch(reject=>response.send(reject.message))
    })
    .catch(reject=>response.status(404).send('Please send a valid id'))
})

genresRoute.delete('/:id',(request,response)=>{
    GenresModel.deleteOne({_id: request.params.id})
    .then(resolve=>response.send('Successfully Deleted'))
    .catch(reject=>response.status(404).send('Invalid Id'))
})

module.exports = genresRoute