const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const patientSchema = new Schema({
    firstName: {
        type: String,
        required: true
    },    
	lastName: {
        type: String,
        required: true
    },	
	midName: {
        type: String,
        required: true
    },	
    age: {
        type: Number,
        required: true
    },	
    email: {
        type: String,
    },	
	mobile: {
		type: Number,
	},
	handlingDate: {
		type: String,
	},
	totalPrice: {
		type: String,
	},
    address: {
        type: String,
    },
    researchList: [String],
    additional: {
        type: String,
    }	
});

module.exports = mongoose.model('Patients', patientSchema);