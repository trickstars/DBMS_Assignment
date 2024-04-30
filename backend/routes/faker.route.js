const express = require("express");
// const { check, validationResult } = require("express-validator");
const fakerCtrl = require("../controllers/faker.controller");
// const auth = require("../middlewares/auth");

const router = express.Router();
router.get("/fakeUser",
    // #swagger.tags = ['Faker']
    fakerCtrl.fakeNewUser);
router.get("/fakePost"
    // #swagger.tags = ['Faker']
    , fakerCtrl.fakeNewPost);
router.get(
  "/fakeRecharge",
  // #swagger.tags = ['Faker']
  fakerCtrl.fakeNewRecharge
);

module.exports = router;