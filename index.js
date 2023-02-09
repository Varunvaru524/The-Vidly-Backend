let genres = require('./Routes/genres')
let customers = require('./Routes/customers')
let movies = require('./Routes/movies')
let mongoose = require('mongoose')
let express = require('express')
let app = express()

mongoose.set('strictQuery', true)
mongoose.connect('mongodb://localhost/The-Vidly-Backend')
.then(resolve=>console.log('Successfully connected to MongoDB'))
.catch(reject=>console.log('Failed to connected to MongoDB'))


app.use(express.json())
app.use('/api/genres',genres)
app.use('/api/customers', customers)
app.use('/api/movies',movies)


let port = process.env.PORT || 3000
app.listen(port,()=>console.log('Listning at port 3000...'))