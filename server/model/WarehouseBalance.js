const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const Counter = require('./Counter');


const warehouseBalanceSchema = new Schema({
  warehouseBalanceId: { 
    type: Number,
    unique: true,
    //required: true,
  }, 
  productListId: {
    type: Number,
  },
  balance: {
    type: Number,
  },
  unit: {
    type: String,
  }	
	
},{
    timestamps: {  createdAt: 'createdAt', updatedAt: 'updatedAt',  currentTime: () => new Date(Date.now() + 4 * 60 * 60 * 1000)} // Add 4 hours to the current time (GMT+4)
});



warehouseBalanceSchema.pre('save', async function (next) {
  const doc = this;
  const counter = await Counter.findByIdAndUpdate(
    { _id: 'warehouseBalanceId' },
    { $inc: { sequence_value: 1 } },
    { new: true, upsert: true }
  );
  doc.warehouseBalanceId = counter.sequence_value;
  next();
});

const WarehouseBalance = mongoose.model('WarehouseBalance', warehouseBalanceSchema);
module.exports = WarehouseBalance;
