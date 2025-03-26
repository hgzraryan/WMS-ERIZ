const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const Counter = require('./Counter');

// Define schema for product attributes
const OutgoingSchema = new Schema({
    id: {
      type: Number,
      required : true,
    },
    name: {
      type: String,
      required: true,
    },
    productListId: {
      type: Number,
      required: true,
    },
    outgoingCount: {
      type: Number,
      required: true,
    },
    balance: {
      type: Number,
      required: true,
    },
    warehouse: {
      type: Number,
      required: true,
    },
    price: {
      type: String,
    },
    barcode: {
      type: String,
    },
    currency: {
      type: String,
    },
  });
const OutgoingProductsSchema = new Schema({
  outgoingProductId: { 
    type: Number,
    unique: true,
    //required: true,
  }, 
  customer: {
    type: Number,
    required: true,
  },  
  driver: {
    type: Number,
    required: true,
  },
  actionDate: {
    type: String,
  },
  description: {
    type: String,
  },
  	sellingPrice: {
		type: Number,
	},
  outgoingList: {
    type: [OutgoingSchema],  // Array of outgoingList
    default: [],
  },
	
},{
    timestamps: {  createdAt: 'createdAt', updatedAt: 'updatedAt',  currentTime: () => new Date(Date.now() + 4 * 60 * 60 * 1000)} // Add 4 hours to the current time (GMT+4)
});



OutgoingProductsSchema.pre('save', async function (next) {
  const doc = this;
  const counter = await Counter.findByIdAndUpdate(
    { _id: 'outgoingProductId' },
    { $inc: { sequence_value: 1 } },
    { new: true, upsert: true }
  );
  doc.outgoingProductId = counter.sequence_value;
  next();
});

const OutgoingProducts = mongoose.model('OutgoingProducts', OutgoingProductsSchema);
module.exports = OutgoingProducts;