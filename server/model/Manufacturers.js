const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const Counter = require("./Counter");

const manufacturersSchema = new Schema(
  {
    manufacturerId: {
      type: Number,
      unique: true,
      //required: true,
    },
    name: {
      type: String,
      required: true,
    },
    companyType: {
      type: String,
      enum: ["LLC", "IE", "Other"],
    },
    additionalData: {
      type: String,
    }
  },
  {
    timestamps: {
      createdAt: "createdAt",
      updatedAt: "updatedAt",
      currentTime: () => new Date(Date.now() + 4 * 60 * 60 * 1000),
    }, // Add 4 hours to the current time (GMT+4)
  }
);

manufacturersSchema.pre("save", async function (next) {
  const doc = this;
  const counter = await Counter.findByIdAndUpdate(
    { _id: "manufacturerId" },
    { $inc: { sequence_value: 1 } },
    { new: true, upsert: true }
  );
  doc.manufacturerId = counter.sequence_value;
  next();
});

const Manufacturers = mongoose.model("Manufacturers", manufacturersSchema);
module.exports = Manufacturers;
