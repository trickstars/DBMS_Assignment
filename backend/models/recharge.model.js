const mongoose = require('mongoose')
const Schema = mongoose.Schema

const rechargeSchema = new Schema({
    date: {
        type: Date,
        required: true,
    },
    method: {
        type: String,
        required: true,
    },
    amount: {
        type: Number,
        required: true,
    },
    note: String,
    status: {
        type: String,
        enum: ['SUCCESS', 'FAILED'],
        required: true,
    }
})

module.exports = mongoose.model('Recharge', rechargeSchema)