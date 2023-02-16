let genres = require('./Routes/genres')
let customers = require('./Routes/customers')
let movies = require('./Routes/movies')
let users = require('./Routes/users')
let auth = require('./Routes/auth')
let errorMiddleware = require('./middleware/errorMiddleware')
let mongoose = require('mongoose')
let config = require('config')
let express = require('express')
let app = express()


process.on('uncaughtException',()=>{
    // Log error
    console.log('Caught the Uncaught Exception');
})
process.on('unhandledRejection',()=>{
    // Log error
    console.log('Caught the Unhandled Rejection');
})


if (!config.get('JwtPrivateKey')) {
    console.log("Faital Error: Jwt Private Key is not defined")
    process.exit()
}
if (!config.get('db')) {
    console.log("Faital Error: Database Connection String is not defined");
    process.exit()
}


mongoose.set('strictQuery', true)
mongoose.connect(config.get('db'))
.then(resolve=>console.log('Successfully connected to MongoDB'))
.catch(reject=>console.log('Failed to connected to MongoDB'))


app.use(express.json())
app.use('/api/genres',genres)
app.use('/api/customers', customers)
app.use('/api/movies',movies)
app.use('/api/users',users)
app.use('/api/auth',auth)
app.use(errorMiddleware)


let port = config.get('Port') || 3000
app.listen(port,()=>console.log('Listning at port 3000...'))