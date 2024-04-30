const express = require("express");
// const { check, validationResult } = require("express-validator");
const serviceCtrl = require("../controllers/service.controller");
const auth = require("../middlewares/auth");
const admin = require("../middlewares/admin");

const router = express.Router();
router.post("/", auth, admin, serviceCtrl.addNewService);
router.get("/", serviceCtrl.getAllServices);
router.get("/:id", auth, serviceCtrl.getServiceById);
router.patch("/:id", auth, admin, serviceCtrl.updateService);
router.delete("/:id", auth, admin, serviceCtrl.removeService);

module.exports = router;