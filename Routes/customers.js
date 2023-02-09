let CustomersModel = require('../Models/CustomerModel')
let express = require('express')
let router = express.Router()


router.get('/',(request,response)=>{
    CustomersModel.find().sort({name:1})
    .then(resolve=>response.send(resolve))
    .catch(reject=>response.status(400).send('Internal Error'))
})

router.get('/:id',(request,response)=>{
    CustomersModel.findById(request.params.id)
    .then(resolve=>resolve?response.send(resolve):response.status(404).send("Customer Dosn't Exist"))
    .catch(reject=>response.status(404).send("Invalid Id"))
})

router.post('/',(request,response)=>{
    let {name,phone,isGold} = request.body

    let inputCustomer = new CustomersModel({
        name:name,
        phone: phone,
        isGold:isGold
    })

    inputCustomer.save()
    .then(resolve=>response.send(resolve))
    .catch(reject=>response.status(400).send(reject.message))
})

router.put('/:id',(request,response)=>{
    let {name,phone,isGold} = request.body

    CustomersModel.findById(request.params.id)
    .then(resolve=>{

        resolve.set({
            name:name,
            phone: phone,
            isGold: isGold
        })

        resolve.save()
        .then(resolve=> response.send(resolve))
        .catch(reject=>response.send(reject.message))
    })
    .catch(reject=>response.status(404).send('Please send a valid id'))
})

router.delete('/:id',(request,response)=>{
    CustomersModel.findByIdAndDelete(request.params.id)
    .then(resolve=>response.send(resolve))
    .catch(reject=>response.status(404).send('Invalid Id'))
})

module.exports = router