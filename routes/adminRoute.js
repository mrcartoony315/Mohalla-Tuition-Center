const express = require("express")
const admin_cntrls = require("../controllers/adminCtrl")
const tutor_cntrl = require("../controllers/tutorCtrl")
const { upload } = require("../utils/util")
const { deleteAdmin } = require("../controllers/adminCtrl");
const admin = require("../models/admin")
const router = express.Router()
// const jwt = require("jsonwebtoken")


router.post("/register",admin_cntrls.register)
router.post("/login",admin_cntrls.login)
router.get("/dashboard",admin_cntrls.dashboard)
router.post("/addCenter",admin_cntrls.addCenter)
router.post("/addTutor",tutor_cntrl.signup)
router.get("/getuserbyCenterid/:id",admin_cntrls.getusersbyCenterid)
router.get("/getallcenters",admin_cntrls.getallcenters)
router.get("/getAllStudents",admin_cntrls.allStudents)
router.get("/getAllStudentsAtCenter/:id",admin_cntrls.getAllStudentsAtCenter)
router.get("/getAllStudentsByTutorId/:id",admin_cntrls.getAllStudentsByTutor)
router.get("/getTutorsList",admin_cntrls.getUsersList)
router.delete("/removeUser",admin_cntrls.deleteUser)
router.delete("/deleteAdmin", deleteAdmin)
router.get("/attendanceOfAllStudents",tutor_cntrl.attedanceOfAllStudents)
router.get("/attendanceHistoryOfStudent",tutor_cntrl.attedanceHistoryOfStudent)
router.get("/attendanceListOfTutor",admin_cntrls.attedanceList)
router.get("/attendanceHistoryOfTutor",admin_cntrls.attedanceHistory)
router.delete("/deleteAttendance",admin_cntrls.deleteAttendance)


module.exports = router