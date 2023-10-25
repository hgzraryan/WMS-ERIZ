const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const reagentsSchema = new Schema({
    product_name: {
        type: String,
        required: true
    },
    description: {
        type: String,
        required: true
    },
	quantity_unit: {
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
	used_for: {
        type: String,
        required: true
    },
	vendor: {
        type: String,
        required: true
    }

});

module.exports = mongoose.model('Reagents', reagentsSchema);
