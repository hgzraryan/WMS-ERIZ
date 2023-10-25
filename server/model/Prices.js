const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const userSchema = new Schema({
    name: {
        type: String,
        required: true
    },
    price: {
        type: Number,
        required: true
    },
    unit: {
        type: String,
        required: true
    },
    currency: {
        type: String,
        required: true
    },    
    description: {
        type: String,
        required: true
    }
	
	
});

module.exports = mongoose.model('Prices', userSchema);
