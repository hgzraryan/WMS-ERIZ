const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const Counter = require('./Counter');

const warehousesSchema = new Schema({
warehouseId:{	
	   type: Number,
	   unique : true
	},
	code:{	
	   type: Number
	},
	warehouseState:{	
	   type: Number
	},
	// warehouse type enum (main, mobile, other)
	type:{	
	   type: String,
       enum: ['Main', 'Mobile', 'Other'],
	},
	name:{	
	   type: String
	},
	balance:{	
	   type: Number
	},
	storekeeper:{	
	   type: Number
	},
	parentWarehouse:{	
	   type: Number
	},
	salesAllowed:{
		type: Number
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
	
	additional:{	
	   type: String
	},
	
	
	

},{
    timestamps: {  createdAt: 'createdAt', updatedAt: 'updatedAt',  currentTime: () => new Date(Date.now() + 4 * 60 * 60 * 1000)} // Add 4 hours to the current time (GMT+4)
});



warehousesSchema.pre('save', async function (next) {
  const doc = this;
  const counter = await Counter.findByIdAndUpdate(
    { _id: 'warehouseId' },
    { $inc: { sequence_value: 1 } },
    { new: true, upsert: true }
  );
  doc.warehouseId = counter.sequence_value;
  next();
});

const Warehouses = mongoose.model('Warehouses', warehousesSchema);
module.exports = Warehouses;
