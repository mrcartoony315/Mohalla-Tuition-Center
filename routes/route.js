const express = require("express")
const admin_route = require("./adminRoute")
const tutor_route = require("./tutorRoute")

const router = express.Router();

router.use("/admin",admin_route)
router.use("/tutor",tutor_route)

module.exports=router