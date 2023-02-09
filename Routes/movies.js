let MoviesModel = require('../Models/MoviesModel')
let GenresModel = require('../Models/GenresModel')
let express = require('express')
let router = express.Router()

router.get('/',(request,response)=>{
    MoviesModel.find().sort({name:1})
    .populate('genre')
    .then(resolve=>response.send(resolve))
    .catch(reject=>response.status(400).send('Internal Error'))
})

router.get('/:id',(request,response)=>{
    MoviesModel.findById(request.params.id)
    .populate('genre')
    .then(resolve=>resolve?response.send(resolve):response.status(404).send("Movie Dosn't Exist"))
    .catch(reject=>response.status(400).send('Invalid Id'))
})

router.post('/',(request,response)=>{
    let {title, genre, dailyRentalRate, numberInStock} = request.body

    validateGenre(genre,(result)=>{
        if (result) {
            response.send(result)
        }
        else {
            let inputMovie = new MoviesModel({
                title,
                genre,
                dailyRentalRate,
                numberInStock
            })
        
            inputMovie.save()
            .then(resolve=>response.send(resolve))
            .catch(reject=>response.status(400).send(reject.message))
        }
    })
})

router.put('/:id',(request,response)=>{
    let {title, genre, dailyRentalRate, numberInStock} = request.body

    validateGenre(genre,(result)=>{
        if (result) {
            response.send(result)
        }
        else {
            MoviesModel.findById(request.params.id)
            .then(resolve=>{
        
                resolve.set({
                    title,
                    genre,
                    dailyRentalRate,
                    numberInStock
                })
        
                resolve.save()
                .then(resolve=>response.send(resolve))
                .catch(reject=>response.send(reject.message))
            })
            .catch(reject=>response.status(404).send('Please send a valid id'))
        }
    })
})

router.delete('/:id',(request,response)=>{
    MoviesModel.findByIdAndDelete(request.params.id)
    .populate('genre')
    .then(resolve=>resolve?response.send(resolve):response.status(404).send("Movie Dosn't Exist"))
    .catch(reject=>response.status(404).send('Invalid Id'))
})

function validateGenre(genreId,callback) {
    GenresModel.findById(genreId)
    .then(resolve=>resolve?callback(false):callback("Genre Dosn't Exists"))
    .catch(reject=>callback('Please Send a Valid Genre Id'))
}


module.exports = router