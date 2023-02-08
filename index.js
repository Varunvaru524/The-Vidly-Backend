let express = require('express')
let app = express()



let port = process.env.PORT || 3000
app.listen(port,()=>console.log('Listning at port 3000...'))

