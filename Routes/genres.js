let GenresModel = require('../Models/GenresModel')
let mongoose = require('mongoose')
let express = require('express')
let router = express.Router()


router.get('/',(request,response,next)=>{
    GenresModel.find().sort({name:1})
    .then(resolve=>response.send(resolve))
    .catch(reject=>next(reject))
})

router.get('/:id',(request,response)=>{
    GenresModel.findById(request.params.id)
    .then(resolve=>resolve?response.send(resolve):response.status(404).send("Genre Dosn't Exist"))
    .catch(reject=>response.status(400).send("Invalid Id"))
})

router.post('/',(request,response)=>{
    let inputGenre = new GenresModel({
        name:request.body.name
    })

    inputGenre.save()
    .then(resolve=>response.send(resolve))
    .catch(reject=>response.status(400).send(reject.message))
})

router.put('/:id',(request,response)=>{
    GenresModel.findById(request.params.id)
    .then(resolve=>{
        resolve.name = request.body.name

        resolve.save()
        .then(resolve=> response.send(resolve))
        .catch(reject=>response.send(reject.message))
    })
    .catch(reject=>response.status(404).send('Please send a valid id'))
})

router.delete('/:id',(request,response)=>{
    GenresModel.deleteOne({_id: request.params.id})
    .then(resolve=>response.send('Successfully Deleted'))
    .catch(reject=>response.status(404).send('Invalid Id'))
})

module.exports = router