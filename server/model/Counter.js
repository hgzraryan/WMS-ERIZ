const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const counterSchema = new Schema({
  _id: { type: String, required: true },
  sequence_value: { type: Number, default: 1 },
});

module.exports = mongoose.model('Counter', counterSchema);

