const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const addressSchema = new Schema({
  street_address: {
    type: String,
    required: true,
  },
  ward: {
    type: Number,
    required: true,
  },
  district: {
    type: Number,
    required: true,
  },
});

const postSchema = new Schema({
  title: {
    type: String,
    required: true,
  },
  full_address: {
    type: addressSchema,
    required: true,
  },
  customer_type: [String],
  area: {
    type: Number,
    required: true,
  },
  price: {
    type: Number,
    required: true,
  },
  type: {
    type: Number,
    enum: [1, 2, 3, 4],
    required: true,
  },
  desc: String,
  expDate: Date,
  phone_num: String,
  status: {
    type: String,
    enum: ["PENDING", "ACCEPTED", "REJECTED"],
    default: "PENDING",
  },
  assets: [String],
  created_by: { type: Schema.Types.ObjectId, ref: "User", required: true },
  approved_by: { type: Schema.Types.ObjectId, ref: "User" },
  service_type: { type: Schema.Types.ObjectId, ref: "Service", required: true },
  createDate: { type: Date, default: Date.now },
});

module.exports = mongoose.model("Post", postSchema);
