const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const Counter = require('./Counter');

const customersSchema = new Schema({

	customerId:{ 
		type: Number,
		unique : true
	},
	name:{type: String,},
	code:{ 
		type: Number,
		unique : true
	},
	legalForm:{
		type: Number,
	},
	contact: {
		email: String,
		phone: String,
		addPhone: String,
		address:{
			street:String,
			city:String,
			state:String,
			country:String,
			zipCode:String
			
		}
	},
	mainCurrency:{
		type: String,
	},
	priceList:{
		type: Number,
	},
	status:{
		type: String,
		enum: ['Active', 'Disabled'],
	},
	additional:{
		type: String,
	}

},{
    timestamps: {  createdAt: 'createdAt', updatedAt: 'updatedAt',  currentTime: () => new Date(Date.now() + 4 * 60 * 60 * 1000)} // Add 4 hours to the current time (GMT+4)
});



customersSchema.pre('save', async function (next) {
  const doc = this;
  const counter = await Counter.findByIdAndUpdate(
    { _id: 'customerId' },
    { $inc: { sequence_value: 1 } },
    { new: true, upsert: true }
  );
  doc.customerId = counter.sequence_value;
  next();
});

const Customers = mongoose.model('Customers', customersSchema);
module.exports = Customers;
