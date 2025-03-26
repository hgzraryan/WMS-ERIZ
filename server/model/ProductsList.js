const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const Counter = require('./Counter');





const productListSchema = new Schema({
  productListId: { 
    type: Number,
    unique: true,
    //required: true,
  },
 
  name: {
    type: String,
    required: true,
  },
  description: {
    type: String,
  },
  
  category: {
    type: Number,  // Min count of stock availability:Threshold level for reordering stock
    required: true,
  }
 
	
	
	
},{
    timestamps: {  createdAt: 'createdAt', updatedAt: 'updatedAt',  currentTime: () => new Date(Date.now() + 4 * 60 * 60 * 1000)} // Add 4 hours to the current time (GMT+4)
});



productListSchema.pre('save', async function (next) {
  const doc = this;
  const counter = await Counter.findByIdAndUpdate(
    { _id: 'productListId' },
    { $inc: { sequence_value: 1 } },
    { new: true, upsert: true }
  );
  doc.productListId = counter.sequence_value;
  next();
});

const ProductsList = mongoose.model('ProductsList', productListSchema);
module.exports = ProductsList;
