const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const Counter = require('./Counter');


const AttributeSchema = new Schema({
  attributeName: {
    type: String,
    required: true,
  },
  attributeUnit: {
    type: String,
    required: true,
  },
  attributeUnitLabel: {
    type: String,
    required: true,
  },
});


const productCategoriesSchema = new Schema({
  categoryId: { 
    type: Number,
    unique: true,
    //required: true,
  },
  name: {
    type: String,
    required: true,
	unique: true
  },
  description: {
    type: String,
  },
  parentCategoryId: {
    type: Number,
  },
  additional: {
    type: String,
  },
  attributs: {
    type: [AttributeSchema],  // Array of AttributeSchema objects
    default: [], // Default to an empty array if not provided
  },
  parrentCategory: {
	type: Number, 
  }
	
	
	
},{
    timestamps: {  createdAt: 'createdAt', updatedAt: 'updatedAt',  currentTime: () => new Date(Date.now() + 4 * 60 * 60 * 1000)} // Add 4 hours to the current time (GMT+4)
});



productCategoriesSchema.pre('save', async function (next) {
  const doc = this;
  const counter = await Counter.findByIdAndUpdate(
    { _id: 'categoryId' },
    { $inc: { sequence_value: 1 } },
    { new: true, upsert: true }
  );
  doc.categoryId = counter.sequence_value;
  next();
});

const ProductCategories = mongoose.model('ProductCategories', productCategoriesSchema);
module.exports = ProductCategories;
