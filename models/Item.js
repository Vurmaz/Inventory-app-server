const mongoose = require('mongoose')

const ItemSchema = new mongoose.Schema({
    name: {
        type: String,
        min:3,
        max:50,
        required: [true, 'Please provide name'],
        unique:true
    },
    category:{
        type: String,
        enum:['Fruit', 'Vegetables'],
        required:[true, 'Please provide category']
    },
    price: {
        type: Number,
        required:[true, 'Please provide price'],
    },
    numberInStock : {
        type:Number,
        required:[true, 'Please provide stock number']
    },
    URL: {
        type: String,
        required:[true, 'Please provide Image URL' ]

    }
})

module.exports = mongoose.model('Item', ItemSchema)