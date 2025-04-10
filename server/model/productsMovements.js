const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const Counter = require('./Counter');


// // Define schema for product attributes
// const AttributeSchema = new Schema({
//   attributeName: {
//     type: String,
//     required: true,
//   },
//   attributeValue: {
//     type: String,
//     required: true,
//   },
// });


const productsMovementsSchema = new Schema({
    productsMovementsId: { 
    type: Number,
    unique: true,
    //required: true,
    },
  actionId: { 
    type: Number,
    required: true,
    //unique: true,
  }, 
  productName: {
    type: String,
    required: true,
  },
  currentProductId: {
    type: Number,
    required: true,
  },
  actionType: {
    type: String,
    required: true,
  },
  actionDate: {
    type: String,
    required: true,
  },
  expirationDate: {
    type: String,
    required: true,
  },
  expiredAlertDay: {
    type: String
  },
  price: {
    type: Number,
    required: true,
  },
  quantity: {
    type: Number,
    required: true,
  },
  unit: {
    type: String,
    required: true,
  },
  warehouse: {
    type: Number,
  },
  balance: {
    type: Number,
    required: true,
  },
  partner: {
    type: Number,
  },
  driver: {
    type: Number,
  },
  sellingPrice: {
	  type: Number, 
    required: true,
  },
  producedDate: {
	  type: String, 
    required: true,
  },
  boxCount: {
    type: Number,
    required: true,
  },
  unitWeight: {
    type: Number,
  },
  boxCapacity: {
    type: Number,
    required: true,
  },
  manufacturerId: {
    type: Number,
  },
  fromWarehouseId: {
    type: Number,
  },
		internalTransfer: {
    type: Boolean,
  },
  
},{
    timestamps: {  createdAt: 'createdAt', updatedAt: 'updatedAt',  currentTime: () => new Date(Date.now() + 4 * 60 * 60 * 1000)} // Add 4 hours to the current time (GMT+4)
});



productsMovementsSchema.pre('save', async function (next) {
  const doc = this;
  const counter = await Counter.findByIdAndUpdate(
    { _id: 'productsMovementsId' },
    { $inc: { sequence_value: 1 } },
    { new: true, upsert: true }
  );
  doc.productsMovementsId = counter.sequence_value;
  next();
});

const ProductsMovements = mongoose.model('ProductsMovements', productsMovementsSchema);
module.exports = ProductsMovements;
