const mongoose = require('mongoose')
const Schema = mongoose.Schema

const paymentSchema = new Schema({
    user: {
        type: Schema.Types.ObjectId,
        ref: 'User',
        required: true
    },
    post: {
        type: Schema.Types.ObjectId,
        ref: 'Post',
        required: true
    },
    fee: {
        type: Number,
        required: true,
    },
    note: String,
    status: {
        type: String,
        enum: ['SUCCESS', 'FAILED'],
        default: 'SUCCESS',
    }
}, 
{
    timestamps: true
})

module.exports = mongoose.model('Payment', paymentSchema)