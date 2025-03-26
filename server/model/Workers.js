const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const Counter = require('./Counter');


// Define schema for product attributes
/*
const AttributeSchema = new Schema({
  attributeName: {
    type: String,
    required: true,
  },
  attributeValue: {
    type: String,
    required: true,
  },
});
*/


const workerSchema = new Schema({
	workerId: { 
		type: Number,
		unique: true,
		//required: true,
	},
	additional: {
		type: String,
	},
	contact: {
    	phone: String,
    	email: String,
        address: {
            street: String,
            city: String,
            state: String,
            country: String,
            zipCode: String,
        }
	},

	dateOfBirth: {
		type: String,
	},
	emergencyContactName: {
		type: String,
	},

	emergencyContactNumber: {
		type: String,
	},

	fullName: {
		type: String,
	},
	gender: {
		type: String,
	},

	isActive: {
		type: Number,
	},
	maritalStatus: {
		type: String,
	},
	profileictureUrl: {
		type: String,
	},

	username: {
		type: String,
		required: true,
	},

	workerRole: {
		type: Number,
		required: true,
	}
 
	
	
	
},{
    timestamps: {  createdAt: 'createdAt', updatedAt: 'updatedAt',  currentTime: () => new Date(Date.now() + 4 * 60 * 60 * 1000)} // Add 4 hours to the current time (GMT+4)
});



workerSchema.pre('save', async function (next) {
  const doc = this;
  const counter = await Counter.findByIdAndUpdate(
    { _id: 'workerId' },
    { $inc: { sequence_value: 1 } },
    { new: true, upsert: true }
  );
  doc.workerId = counter.sequence_value;
  next();
});

const Workers = mongoose.model('Workers', workerSchema);
module.exports = Workers;
