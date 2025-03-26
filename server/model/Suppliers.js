const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const Counter = require('./Counter');





const supplierSchema = new Schema({
	supplierId: { 
		type: Number,
		unique: true,
	},
	name: {
		type: String,
		required: true,
	},
	director: {
		type: String,
		required: true,
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
	bankName: {
		type: String,
	},
	bankAccNumber: {
		type: String,
	},
	tin: {
		type: Number,
	},
	additional: {
		type: String,
	},
	description: {
		type: String,
	}

	
},{
    timestamps: {  createdAt: 'createdAt', updatedAt: 'updatedAt',  currentTime: () => new Date(Date.now() + 4 * 60 * 60 * 1000)} // Add 4 hours to the current time (GMT+4)
});



supplierSchema.pre('save', async function (next) {
  const doc = this;
  const counter = await Counter.findByIdAndUpdate(
    { _id: 'supplierId' },
    { $inc: { sequence_value: 1 } },
    { new: true, upsert: true }
  );
  doc.supplierId = counter.sequence_value;
  next();
});

const Suppliers = mongoose.model('Suppliers', supplierSchema);
module.exports = Suppliers;
