const mongoose = require('mongoose')
const Schema = mongoose.Schema

const userSchema = new Schema({
  username: {
    type: String,
    unique: true,
  },
  password: {
    type: String,
    required: true,
  },
  role: {
    type: String,
    enum: ["ADMIN", "USER"],
    default: "USER",
  },
  status: {
    type: String,
    enum: ["ACTIVE", "BLOCKED"],
    default: "ACTIVE",
  },
  email: {
    type: String,
    unique: true,
    required: true,
  },
  full_name: String,
  phone: {
    type: String,
    required: true
  },
  zalo: String,
  facebook: String,
  balance: {
    type: Number,
    default: function () {
      if (this.role == "USER") return 0;
    },
  },
  avatar: String,
  tokenVersion: {
    type: Number,
    default: 0,
  },
  favorites: [{ type: Schema.Types.ObjectId, ref: "Post" }],
  posts_created: [{ type: Schema.Types.ObjectId, ref: "Post" }],
  posts_proved: [{ type: Schema.Types.ObjectId, ref: "Post" }],
  recharge_history: [{ type: Schema.Types.ObjectId, ref: "Recharge" }],
  payment_history: [{ type: Schema.Types.ObjectId, ref: "Payment" }],
});

module.exports = mongoose.model('User', userSchema) 