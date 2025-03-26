const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const Counter = require('./Counter');

const legalformsSchema = new Schema({
	legalformId:{
		type: Number,
		unique : true
	},
	name:{
		type: String,
	},
	additional:{
		type: String,
	}

},{
    timestamps: {  createdAt: 'createdAt', updatedAt: 'updatedAt',  currentTime: () => new Date(Date.now() + 4 * 60 * 60 * 1000)} // Add 4 hours to the current time (GMT+4)
});



legalformsSchema.pre('save', async function (next) {
  const doc = this;
  const counter = await Counter.findByIdAndUpdate(
    { _id: 'legalformId' },
    { $inc: { sequence_value: 1 } },
    { new: true, upsert: true }
  );
  doc.legalformId = counter.sequence_value;
  next();
});

const Legalforms = mongoose.model('Legalforms', legalformsSchema);
module.exports = Legalforms;
