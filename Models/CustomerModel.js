let mongoose = require('mongoose')


let schema = new mongoose.Schema({
    name:{
        type:String,
        required:true,
        minlength:2
    },
    phone:{
        type:Number,
        required:true,
        validate:{
            validator:(e)=>e.toString().length==10,
            message:(props)=>"Phone number should be 10 characters"
        }
    },
    isGold:{
        type:Boolean,
        default:false
    }
})
let CustomersModel = mongoose.model('customers',schema)


module.exports = CustomersModel