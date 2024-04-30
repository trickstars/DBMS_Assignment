const jwt = require("jsonwebtoken");
const moment = require("moment");
const mongoose = require("mongoose");
const Recharge = require("../models/recharge.model");
const User = require("../models/user.model");
const { successFilePath, failureFilePath } = require("../resources/export");

const createPaymentUrl = async (req, res) => {
  try {
    process.env.TZ = "Asia/Ho_Chi_Minh";
    let date = new Date();
    let createDate = moment(date).format("YYYYMMDDHHmmss");

    //get Merchant sever addess
    let ipAddr =
      req.headers["x-forwarded-for"] ||
      req.connection.remoteAddress ||
      req.socket.remoteAddress ||
      req.connection.socket.remoteAddress;

    //Merchant code
    // let tmnCode = config.get('vnp_TmnCode');
    let tmnCode = process.env.vnp_TmnCode;
    //Merchant secret key
    let secretKey = process.env.vnp_HashSecret;
    //Vnpay gateway
    let vnpUrl = process.env.vnp_Url;
    //Result url
    let returnUrl = process.env.vnp_ReturnUrl;

    let orderId = moment(date).format("DDHHmmss");
    let amount = req.body.amount;
    let bankCode = "";

    let locale = req.body.language;
    if (locale === null || locale === "" || locale === undefined) {
      locale = "vn";
    }
    let currCode = "VND";
    let vnp_Params = {};
    let userID = req.user.id;

    vnp_Params["vnp_Version"] = "2.1.0";
    vnp_Params["vnp_Command"] = "pay";
    vnp_Params["vnp_TmnCode"] = tmnCode;
    vnp_Params["vnp_Locale"] = locale;
    vnp_Params["vnp_CurrCode"] = currCode;
    vnp_Params["vnp_TxnRef"] = orderId;
    vnp_Params["vnp_OrderInfo"] = "Thanh toan cho KH:" + userID;
    vnp_Params["vnp_OrderType"] = "other";
    vnp_Params["vnp_Amount"] = amount * 100;
    vnp_Params["vnp_ReturnUrl"] = returnUrl;
    vnp_Params["vnp_IpAddr"] = ipAddr;
    vnp_Params["vnp_CreateDate"] = createDate;
    if (bankCode !== null && bankCode !== "") {
      vnp_Params["vnp_BankCode"] = bankCode;
    }

    vnp_Params = sortObject(vnp_Params);

    let querystring = require("qs");
    let signData = querystring.stringify(vnp_Params, { encode: false });
    let crypto = require("crypto");
    let hmac = crypto.createHmac("sha512", secretKey);
    let signed = hmac.update(Buffer.from(signData, "utf-8")).digest("hex");
    vnp_Params["vnp_SecureHash"] = signed;
    vnpUrl += "?" + querystring.stringify(vnp_Params, { encode: false });
    res.status(200).json({ paymentURL: vnpUrl });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: err });
  }
};

const vnpayReturn = async (req, res) => {
  try {
    let vnp_Params = req.query;

    let secureHash = vnp_Params["vnp_SecureHash"];

    delete vnp_Params["vnp_SecureHash"];
    delete vnp_Params["vnp_SecureHashType"];

    vnp_Params = sortObject(vnp_Params);
    let tmnCode = process.env.vnp_TmnCode;
    let secretKey = process.env.vnp_HashSecret;
    let querystring = require("qs");
    let signData = querystring.stringify(vnp_Params, { encode: false });
    let crypto = require("crypto");
    let hmac = crypto.createHmac("sha512", secretKey);
    let signed = hmac.update(Buffer.from(signData, "utf-8")).digest("hex");

    if (secureHash === signed) {
      res.sendFile(successFilePath);
    } else {
      res.sendFile(failureFilePath);
    }
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Lỗi máy chủ" });
  }
};
const updatePayment = async (vnp_Params) => {
  let orderInfo = vnp_Params["vnp_OrderInfo"];
  let result = orderInfo.split("%3A");
  let userID = result[1];
  let amount = vnp_Params["vnp_Amount"] / 100;
  let orderID = vnp_Params["vnp_TxnRef"];
  let status = vnp_Params["vnp_TransactionStatus"];
  if (status == "00") {
    status = "SUCCESS";
  } else status = "FAILED";

  // Create a new recharge and save it to the database
  const newRecharge = new Recharge({
    date: new Date(),
    method: "VNPAY",
    amount: amount,
    note: orderInfo,
    status: status,
  });
  let rechardID = null;
  await newRecharge
    .save()
    .then((savedRecharge) => {
      rechardID = savedRecharge._id;
    })
    .catch((error) => {
      console.error("Error saving recharge:", error);
    });
  await addRechargeToUser(userID, rechardID, amount);
};

const vnpayIPN = async (req, res) => {
  var vnp_Params = req.query;
  var secureHash = vnp_Params["vnp_SecureHash"];

  delete vnp_Params["vnp_SecureHash"];
  delete vnp_Params["vnp_SecureHashType"];

  vnp_Params = sortObject(vnp_Params);
  var secretKey = process.env.vnp_HashSecret;
  var querystring = require("qs");
  var signData = querystring.stringify(vnp_Params, { encode: false });
  var crypto = require("crypto");
  var hmac = crypto.createHmac("sha512", secretKey);
  var signed = hmac.update(Buffer.from(signData, "utf-8")).digest("hex");

  try {
    await updatePayment(vnp_Params);
  } catch (e) {
    console.log("Error when updating payment");
  }

  if (secureHash === signed) {
    var orderId = vnp_Params["vnp_TxnRef"];
    var rspCode = vnp_Params["vnp_ResponseCode"];
    //Kiem tra du lieu co hop le khong, cap nhat trang thai don hang va gui ket qua cho VNPAY
    res.status(200).json({ RspCode: "00", Message: "success" });
  } else {
    res.status(200).json({ RspCode: "97", Message: "Fail checksum" });
  }
};

const getAllRecharges = async (req, res) => {
  const userID = req.user.id;
  const paramID = req.params.userID;
  if (userID !== paramID)
    return res.status(402).json({ message: "ID truyền vào không đúng " });
  const user = await User.findOne({ _id: userID });
  if (!user) {
    return res
      .status(401)
      .json({ message: "Thông tin đăng nhập không chính xác" });
  }
  const rechargesIDs = user.recharge_history;
  getRechargesByIds(rechargesIDs)
    .then((recharges) => {
      res.status(200).json(recharges);
    })
    .catch((error) => {
      console.error("Error:", error);
      res.status(500).json({ message: "Lỗi máy chủ" });
    });
};
function sortObject(obj) {
  let sorted = {};
  let str = [];
  let key;
  for (key in obj) {
    if (obj.hasOwnProperty(key)) {
      str.push(encodeURIComponent(key));
    }
  }
  str.sort();
  for (key = 0; key < str.length; key++) {
    sorted[str[key]] = encodeURIComponent(obj[str[key]]).replace(/%20/g, "+");
  }
  return sorted;
}

const addRechargeToUser = async (userID, rechargeID, amount) => {
  try {
    const user = await User.findById(new mongoose.Types.ObjectId(userID));

    if (!user) {
      console.error("User not found");
      return;
    }

    // Step 2: Push the rechargeID into the recharge_history array
    user.recharge_history.push(new mongoose.Types.ObjectId(rechargeID));
    user.balance += amount;

    // Step 3: Save the user document to persist the changes
    const updatedUser = await user.save();
  } catch (error) {
    console.error("Error adding recharge to user:", error);
  }
};

async function getRechargesByIds(rechargeIds) {
  try {
    const recharges = await Recharge.find({
      _id: { $in: rechargeIds },
    })
      .lean()
      .exec();
    return recharges;
  } catch (error) {
    console.error("Error fetching recharges:", error);
    throw error;
  }
}

module.exports = {
  createPaymentUrl,
  vnpayReturn,
  vnpayIPN,
  getAllRecharges,
};
