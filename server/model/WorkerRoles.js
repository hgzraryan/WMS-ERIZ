const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const Counter = require('./Counter');


const workerRoleSchema = new Schema({
	workerRoleId: { 
		type: Number,
		unique: true,
		//required: true,
	},
	name: {
		type: String,
		required: true,
	},
	type: {
		type: String,
		required: true,
		enum: [ "driver", "keeper", "worker" ],
	},
	isActive: {
        type: Number,
        default: 0
    },
	additional: {
		type: String,
	}
},{
    timestamps: {  createdAt: 'createdAt', updatedAt: 'updatedAt',  currentTime: () => new Date(Date.now() + 4 * 60 * 60 * 1000)} // Add 4 hours to the current time (GMT+4)
});



workerRoleSchema.pre('save', async function (next) {
  const doc = this;
  const counter = await Counter.findByIdAndUpdate(
    { _id: 'workerRoleId' },
    { $inc: { sequence_value: 1 } },
    { new: true, upsert: true }
  );
  doc.workerRoleId = counter.sequence_value;
  next();
});

const WorkerRoles = mongoose.model('WorkerRoles', workerRoleSchema);
module.exports = WorkerRoles;