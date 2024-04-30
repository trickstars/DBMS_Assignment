const express = require("express");
// const { check, validationResult } = require("express-validator");
const paymentCtrl = require("../controllers/payment.controller");
const auth = require("../middlewares/auth");
// const admin = require("../middlewares/admin");
const user = require("../middlewares/user");

const router = express.Router();
router.post("/", auth, user, paymentCtrl.addNewPayment);
// router.get("/", auth, admin, paymentCtrl.getAllPayments);
router.get("/getPaymentsOfUser", auth, user, paymentCtrl.getPaymentsOfUser);
// router.get("/demo/:paymentId", paymentCtrl.chargeBackPayment)
// router.get("/:id", auth, paymentCtrl.getpaymentById);
// router.patch("/:id", auth, paymentCtrl.updatepayment);
// router.delete("/:id", auth, paymentCtrl.removepayment);

module.exports = router;