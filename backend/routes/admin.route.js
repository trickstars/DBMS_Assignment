const express = require("express");
const { check, validationResult } = require("express-validator");
const adminCtrl = require("../controllers/admin.controller");
const auth = require("../middlewares/auth");
const admin = require("../middlewares/admin");
const router = express.Router();

router.get(
  "/user",
  /*
    #swagger.tags = ['Admin']
*/
  auth,
  admin,
  adminCtrl.getUsersInfo
);

router.get(
  "/post",
  /*
    #swagger.tags = ['Admin']
*/
  auth,
  admin,
  adminCtrl.getPostsInfo
);

router.get(
  "/:id_user",
  // #swagger.tags = ['Admin']
  auth,
  admin,
  adminCtrl.getUserProfile
);

router.post(
  "/change-password",
  // #swagger.tags = ['Admin']
  auth,
  admin,
  adminCtrl.changePassword
);

router.post(
  "/add-user",
  // #swagger.tags = ['Admin']
  auth,
  admin,
  adminCtrl.addUser
);

router.post(
  "/edit-user",
  // #swagger.tags = ['Admin']
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
  admin,
  adminCtrl.editUser
);

module.exports = router;
