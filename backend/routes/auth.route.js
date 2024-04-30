const express = require("express");
const { check, validationResult } = require("express-validator");
const authCtrl = require("../controllers/auth.controller");
const auth = require("../middlewares/auth");

const router = express.Router();
router.post(
  "/sign-in",
  /*
    #swagger.tags = ['Auth']
    #swagger.parameters['obj'] = {
                in: 'body',
                description: 'acc admin để test',
                required: true,
                schema: {
                    username: "HoaiTrang_Nguyen53",
                    password: "123456"
                }
            }
*/
  [
    check("username")
      .matches(/^[a-zA-Z0-9_.]+$/)
      .withMessage("Username must be alphanumeric")
      .isLength({ min: 5, max: 20 })
      .withMessage("Username must be between 5 and 20 characters"),
    check("password").isLength({ min: 3 }),
  ],
  (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      const errorMessages = errors.array().map((error) => {
        return `${error.path}: ${error.msg}`;
      });
      return res.status(422).json({ message: errorMessages.join(", ") });
    }
    authCtrl.signIn(req, res);
  }
);

router.post(
  "/sign-up",
  // #swagger.tags = ['Auth']
  [
    check("username")
      .matches(/^[a-zA-Z0-9_]+$/)
      .withMessage("Username must be alphanumeric")
      .isLength({ min: 5, max: 20 })
      .withMessage("Username must be between 5 and 20 characters"),
    check("phone")
      .optional({ nullable: true, checkFalsy: true })
      .isMobilePhone(),
    check("email").isEmail(),
    check("password_confirm").isLength({ min: 6 }),
    check("password").isLength({ min: 6 }),
  ],
  (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      const errorMessages = errors.array().map((error) => {
        return `${error.path}: ${error.msg}`;
      });
      return res.status(422).json({ message: errorMessages.join(", ") });
    }
    authCtrl.signUp(req, res);
  }
);

router.post(
  "/forgot-password",
  //  #swagger.tags = ['Auth']
  authCtrl.forgotPassword
);

router.get(
  "/test-auth",
  // #swagger.tags = ['Auth']
  auth,
  (req, res) => {
    res.json({ message: "You are authenticated" });
  }
);

module.exports = router;
