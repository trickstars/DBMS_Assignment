"use strict";
const Payment = require("../models/payment.model")

const addNewPayment = async (req, res) => {

    const userBalance = req.user.balance;
    if(userBalance === undefined) return res.status(400).json({message: "Cannot find your balance information"})
    if(req.body === undefined || req.body.fee === undefined) return res.status(400).json({message: "Cannot find fee information in your request"})
    if(userBalance < req.body.fee) return res.status(403).json({message: "Your balance is not enough"})

    const newPayment = new Payment(req.body);

    newPayment.save()
    .then((payment) => 
    {
        const userRef = req.user;
        userRef.balance = userRef.balance - req.body.fee;
        userRef.save()
        .then(() => res.json(payment))
        // potential error (crash app)
    })
    .catch(err => {
        // console.log("bruh")
        res.status(500).json({
            message: "Internal Server Error",
            error: err.message
        })
    })
};

const getAllPayments = async (req, res) => {
    Payment.find({})
    .then(payments => {
        if(payments.length == 0) res.status(404).json({message: "No payments found"});
        else res.json(payments);
    })
    .catch(err => {
        res.status(500).json({
            message: "Internal Server Error",
            error: err.message
        })
    })
};

const getPaymentsOfUser = async (req, res) => {
    // console.log(req.user.id)
    // if(req.user._id != req.params.userId) return res.status(400).json({message: "Your userId is not the same as in your token"})

    Payment.find({user: req.user._id})
    .then(payments => {
        if(payments.length == 0) res.status(404).json({message: "No payments found"});
        else res.json(payments);
    })
    .catch(err => {
        res.status(500).json({
            message: "Internal Server Error",
            error: err.message
        })
    })
};

// const getpaymentById = async (req, res) => {
//     payment.findById(req.params.id)
//     .then(payment => {
//         if(!payment) res.status(404).json({message: "Cannot find payment"});
//         res.json(payment);
//     })
//     .catch(err => {
//         res.status(500).json({
//             message: "Internal Server Error",
//             error: err.message
//         })
//     })
// }

// const updatepayment = async (req, res) => {
//     payment.findByIdAndUpdate(req.params.id, req.body)
//     .then(payment => {
//         if(!payment) res.status(404).json({message: "Cannot find payment"});
//         res.json(payment);
//     })
//     .catch(err => {
//         res.status(500).json({
//             message: "Internal Server Error",
//             error: err.message
//         })
//     })
// }

const chargeBackPayment = async (postId) => {
    const User = require('../models/user.model')
    const payment = await Payment.findOne({post: postId}).exec();
    if(!payment) throw new Error(`Cannot find payment of the post' ${postId}`);
    if(payment.status === 'FAILED') throw new Error('The payment is updated already');
    payment.status = "FAILED";
    payment.save();

    const user = await User.findById(payment.user).exec()
    if(!user) throw new Error('Cannot refer to the user in payment');
    user.balance += payment.fee;
    user.save().then('Chargeback successful');
}

// const removepayment = async (req, res) => {
//     payment.findByIdAndDelete(req.params.id)
//     .then(payment => {
//         if(!payment) res.status(404).json({message: "Cannot find payment"});
//         res.json(payment);
//     })
//     .catch(err => {
//         res.status(500).json({
//             message: "Internal Server Error",
//             error: err.message
//         })
//     })
// }

module.exports = {
  addNewPayment,
  getAllPayments,
  getPaymentsOfUser,
  chargeBackPayment
//   getpaymentById,
//   updatepayment,
//   removepayment
};
