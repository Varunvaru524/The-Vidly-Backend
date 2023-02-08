let genresRoute = require('./Routes/genres')
let mongoose = require('mongoose')
let express = require('express')
let app = express()

mongoose.set('strictQuery', true)
mongoose.connect('mongodb://localhost/The-Vidly-Backend')
.then(resolve=>{console.log('Successfully connected to MongoDB')})
.catch(reject=>console.log('Failed to connected to MongoDB'))


app.use(express.json())
app.use('/api/genres',genresRoute)


let port = process.env.PORT || 3000
app.listen(port,()=>console.log('Listning at port 3000...'))