const express = require("express");
const { check, validationResult } = require("express-validator");
const userCtrl = require("../controllers/user.controller");
const {getPaymentsOfUser} = require("../controllers/payment.controller");
const auth = require("../middlewares/auth");
const user = require("../middlewares/user");

const router = express.Router();

router.get(
  "/:username",
  // #swagger.tags = ['User']
  [
    check("username")
      .matches(/^[a-zA-Z0-9._]+$/)
      .withMessage("Username must be alphanumeric"),
  ],
  (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      const errorMessages = errors.array().map((error) => {
        return `${error.path}: ${error.msg}`;
      });
      return res.status(422).json({ message: errorMessages.join(", ") });
    }
    userCtrl.getUserInfo(req, res);
  }
);

router.get('/user/payments',
// #swagger.tags = ['User']
 auth,
  user, 
  getPaymentsOfUser)

router.get(
  "/",
  // #swagger.tags = ['User']
  auth,
  userCtrl.getUserProfile
);

router.post(
  "/change-password",
  // #swagger.tags = ['User']
  auth,
  userCtrl.changePassword
);

router.post(
  "/edit",
  // #swagger.tags = ['User']
  /*
      #swagger.parameters['obj'] = {
    in: 'body',
    description: 'Allowed params:\n' +
      'username,\n' +
      'full_name,\n' +
      'phone,\n' +
      'email,\n' +
      'zalo,\n' +
      'facebook,\n' +
      'avatar with base64 type,\n',

    required: true,
  }
*/
  auth,
  userCtrl.editUser
);

module.exports = router;
