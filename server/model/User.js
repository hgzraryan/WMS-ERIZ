const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const Counter = require('./Counter');

const userSchema = new Schema({
    userId:{	
	   type: Number,
	   unique : true
	},
    firstname: {
        type: String,
        required: true
    },
    lastname: {
        type: String,
        required: true
    },
    position: {
        type: String
    },
    birthday: {
		type: String
    },
    
    contact: {
    	phone: String,
        address: {
            street: String,
            city: String,
            state: String,
            country: String,
            zipCode: String,
        },
	emergencyContactName: String,
	emergencyContactNumber: String,
    },
    email: {
        type: String,
        required: true,
		unique : true
    },
	maritalStatus:{
                type:String,
                enum: ['married', 'single']
        },


    username: {
        type: String,
        required: true,
		unique : true
    },
	password: {
        type: String,
        required: true
    },
    additionalData: {
		type: String
	},
    roles: {
        User: {
            type: Number,
            default: 2001
        },
        Editor: Number,
        Admin: Number,
	    Sampler: Number,
	    Approver: Number,
	    Doctor: Number,
	    SuperAdmin: Number
    },
    gender: {
		type:String,
        //required: true,
		enum: ['Male', 'Female']
	},
    isActive: {
        type: Number,
        default: 0
    },
	workerId: {
        type: Number,
    },
    refreshToken: [String],
	
},
{
    timestamps: {  createdAt: 'createdAt', updatedAt: 'updatedAt',  currentTime: () => new Date(Date.now() + 4 * 60 * 60 * 1000)} // Add 4 hours to the current time (GMT+4)
});

userSchema.pre('save', async function (next) {
    const doc = this;
    
      if(!doc.userId){
          const counter = await Counter.findByIdAndUpdate(
              { _id: 'userId' },
              { $inc: { sequence_value: 1 } },
              { new: true, upsert: true }
          );
          doc.userId = counter.sequence_value;
      }
    
    
    next();
  });
  
  const Users = mongoose.model('Users', userSchema);
  module.exports = Users;
