const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const Counter = require('./Counter');

const attributesSchema = new Schema({
	attributeId:{	
	   type: Number,
	   unique : true
	},
	name:{type: String},
	description:{type: String},
	categoryId: {type:Number}

},{
    timestamps: {  createdAt: 'createdAt', updatedAt: 'updatedAt',  currentTime: () => new Date(Date.now() + 4 * 60 * 60 * 1000)} // Add 4 hours to the current time (GMT+4)
});



attributesSchema.pre('save', async function (next) {
  const doc = this;
  const counter = await Counter.findByIdAndUpdate(
    { _id: 'attributeId' },
    { $inc: { sequence_value: 1 } },
    { new: true, upsert: true }
  );
  doc.attributeId = counter.sequence_value;
  next();
});

const ProductAtributes = mongoose.model('ProductAtributes', attributesSchema);
module.exports = ProductAtributes;
