const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const Counter = require('./Counter');

const partnersSchema = new Schema({
	partnerId:{	
	   type: Number,
	   unique : true
	},
	name:{	
	   type: String
	},
	companyType:{	
	   type: String,
       enum: ['Legal', 'Physical', 'Other'],
	},
	respPersonFullName:{	
	   type: String
	},
	bankName:{	
	   type: String
	},
	tin:{	
	   type: Number
	},
	bankAccNumber:{	
	   type: Number
	},
	currency:{	
	   type: String
	},
	 birthday: {
		type: String
    },
	partnerType:[],
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
	productCategories:[],
	additional:{	
	   type: String
	}

},{
    timestamps: {  createdAt: 'createdAt', updatedAt: 'updatedAt',  currentTime: () => new Date(Date.now() + 4 * 60 * 60 * 1000)} // Add 4 hours to the current time (GMT+4)
});



partnersSchema.pre('save', async function (next) {
  const doc = this;
  const counter = await Counter.findByIdAndUpdate(
    { _id: 'partnerId' },
    { $inc: { sequence_value: 1 } },
    { new: true, upsert: true }
  );
  doc.partnerId = counter.sequence_value;
  next();
});

const Partners = mongoose.model('Partners', partnersSchema);
module.exports = Partners;
