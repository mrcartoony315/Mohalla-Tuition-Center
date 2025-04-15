const tutor_Mdl = require("../models/tutor")
const center_Mdl = require("../models/center")
const student_Mdl = require("../models/student")
const attend_Mdl = require("../models/attendance")
const studentAttendance_Mdl = require("../models/stdAttendance")
const moment = require("moment")
const { responseGenerator,hashPassword,comparePassword,generateTokens } = require("../utils/util")
// const attend_model = require("../models/attendance")
// const studentsAttend_Model = require("../models/stdAttendance")



const signup = async(req,res) => {
    try {
        const data = req.body
        const existingUser = await tutor_Mdl.findOne({ email: data.email });
        if (existingUser) {
            throw new Error("Email Already exists in the list");
        }
        const centerExists = await center_Mdl.findOne({ _id: data.center });
        const allcenters = await center_Mdl.find()
        console.log(allcenters  )
        console.log(centerExists)
        if (!centerExists) {
            throw new Error("Center Doesn't exist...!!! Please contact admin to create center ....!!!!");
        }
        let id = await tutor_Mdl.countDocuments()
        id = id+1

        
        data.password=await hashPassword(data.password)
        // data.documentpath = req.file.path
        const user = new tutor_Mdl({
            ...data,
            id
        })
        await user.save()
        let resp = responseGenerator(true,"Tutor Added succesfully...!!!",user)
        res.status(200).json(resp)

    } catch (err) {
        console.log(err,"Error in signup ...!!!!")
        res.status(404).json({success:false,message:"Internal Server error"})
        
        
    }
}



const login = async(req,res) => {
    try {
        const {email,password} = req.body
        const user = await tutor_Mdl.findOne({email}).lean()
        if(user){
            const isPasswordMatches = await comparePassword(password,user.password)
            if(isPasswordMatches){
                const tokens = generateTokens({email, name : user.name, id : user.id})
                res.status(200).json({
                    success: true,
                    message : "Tutor LoggedIN successfully ...!!!",
                    data : {
                        name : user.name,
                        id : user.id,
                        tokens
                    }
                })
            }
        }else{
            let resp = responseGenerator(false, "Invalid email or password ...!!!")
            res.status(401).json(resp)
        }
    } catch (err) {
        console.log(err);
        let resp = responseGenerator(false);
        res.status(404).json(resp)
    }
}



const MarkAttendance = async(req,res) => {
    try {
        const email = req.body.email
        const today = moment().format("YYYY-MM-DD")
        const currentTime = moment().format("HH:MM")

        let attendance = await attend_Mdl.findOne({email,date:today})
        if(attendance){
            let resp = responseGenerator(true,"Already marked today's attendance...!!!")
            res.status(200).json(resp)
        }else{
            const newAttendance = new attend_Mdl({email,date:today,time:currentTime})
            await newAttendance.save()
            let resp = responseGenerator(true,"Attendance marked successfully ...!!!!")
            res.status(201).json(resp)
        }
    } catch (err) {
        console.log(err);
        let resp = responseGenerator(false);
        res.status(404).json(resp)
    }
}

const StudentAttendance = async(req,res) => {
    try {
        const roll_no = req.body.roll_no
        const today = moment().format("YYYY-MM-DD")
        const currentTime = moment().format("HH:MM")

        let attendance = await studentAttendance_Mdl.findOne({roll_no,date:today})
        if(attendance){
            let resp = responseGenerator(true,"Today's Attendance already marked....!!!!")
            console.log(studentAttendance_Mdl,attendance)
            res.status(400).json(resp)
        }
        let newAttendance = new studentAttendance_Mdl({roll_no,date:today,time:currentTime})
        await newAttendance.save()
        let resp = responseGenerator(true,"Attendance marked successfully ....!!!!",studentAttendance_Mdl)
        res.status(200).json(resp)
    } catch (err) {
        console.log(err);
        let resp = responseGenerator(false);
        res.status(404).json(resp)
    }
}

const createStudent = async(req,res) => {
    try {
        const data = req.body
        const student = await student_Mdl.findOne({name:data.name,fname:data.fname})
        if(student){
            throw new Error("Student already exist..!!!")
        }
        const count = await student_Mdl.countDocuments()
        const rollno = count+1
        const newStudent = new student_Mdl({
            ...data,
            rollno
        })
        await newStudent.save()
        let resp = responseGenerator(true,"Student added successfully...!!!!",newStudent)
        res.status(201).json(resp)
    } catch (err) {
        console.log(err);
        let resp = responseGenerator(false);
        res.status(404).json(resp)
    }
}


const attedanceOfAllStudents = async(req,res) => {
    try {
        const student = await studentAttendance_Mdl.find()
        if(student.length==0){
            let resp = responseGenerator(true,"No Attendance yet ...!!!!")
            res.status(200).json(resp)
        }
        let resp = responseGenerator(true,"Here is the list of the attendace of all students ...!!!!",student)
        res.status(200).json(resp)
    } catch (err) {
        console.log(err);
        let resp = responseGenerator(false);
        res.status(404).json(resp)
    }
}


const attedanceHistoryOfStudent = async(req,res) => {
    try {
        const rollno = req.body.roll_no
        const history = await studentAttendance_Mdl.find({roll_no:rollno})
        if(history==0){
            let resp = responseGenerator(true,"No attendance history of this student...!!!!")
            res.status(400).json(resp)
        }
        let resp = responseGenerator(true,"Here is the list of attendace of this student...!!!!",history)
        res.status(200).json(resp)
    } catch (err) {
        console.log(err);
        let resp = responseGenerator(false);
        res.status(404).json(resp)
    }
}

module.exports = {
    login,
    signup,
    MarkAttendance,
    createStudent,
    StudentAttendance,
    attedanceOfAllStudents,
    attedanceHistoryOfStudent
}