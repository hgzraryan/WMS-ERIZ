const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const Counter = require('./Counter');


// Define schema for product attributes
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


const IncomingProductsSchema = new Schema({
  incomingProductId: { 
    type: Number,
    unique: true,
    //required: true,
  },
 
  name: {
    type: String,
    required: true,
  },
  productIdent: {
    type: Number
  },
  description: {
    type: String,
  },
  SKU: {  // Stock Keeping Unit
    type: String,
    //unique: true,
    //required: true,
  },
  barcode: {
    type: String
  },
  productCategory: {
    type: Number,
  },
  currentProductId: {
    type: Number,
  },
 attributes: {
    type: [AttributeSchema],  // Array of attributes
    default: [],
  },
  stock: {
    type: Number,
    required: true,
    default: 0,
  },
  price: {
    type: Number,
    required: true,
  },
  currency:{
	type: String,
	required: true,
  },
  dimensions: {
    length: { type: Number },
    width: { type: Number },
    height: { type: Number},
    weight: { type: Number},  // Weight in kg or other unit
    volume: { type: Number},  // volume in litr or other unit
  },
  // supplier: {
  //   type: Number,
  // },
  boxCount: {
    type: Number,
  },
  unitWeight: {
    type: Number,
  },
  boxCapacity: {
    type: Number,
  },
  partner: {
    type: Number,
  },
  manufacturer: {
    type: Number,
  },
  fromWarehouseId: {
    type: Number,
  },
  driver: {
    type: Number,
    required: true,
  },
  countryOfOrigin:{
	  type: String,
  },  
  // reorderLevel: {
  //   type: Number,  // Min count of stock availability:Threshold level for reordering stock
  //   required: true,
  // },  
  quantity:{
    type: Number,
  },
  balance:{
    type: Number,
  },
  boxCountBalance:{
    type: Number,
  },
  quantityBalance:{
    type: Number,
  },
  palletCount:{
    type: Number,
  },
  producedDate:{
    type: String,
  },
  expiredAlertDay:{
    type: String,
  },	
  expirationDate:{
    type: String,
  },	
  actionDate:{
    type: String,
  },	
  userId:{
    type: Number,
  },
	
},{
    timestamps: {  createdAt: 'createdAt', updatedAt: 'updatedAt',  currentTime: () => new Date(Date.now() + 4 * 60 * 60 * 1000)} // Add 4 hours to the current time (GMT+4)
});



IncomingProductsSchema.pre('save', async function (next) {
  const doc = this;
  const counter = await Counter.findByIdAndUpdate(
    { _id: 'incomingProductId' },
    { $inc: { sequence_value: 1 } },
    { new: true, upsert: true }
  );
  doc.incomingProductId = counter.sequence_value;
  next();
});

const IncomingProducts = mongoose.model('IncomingProducts', IncomingProductsSchema);
module.exports = IncomingProducts;
