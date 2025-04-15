const mongoose = require("mongoose")

const schema = mongoose.Schema

const studentAttendance = new schema(
    {
        roll_no : {type:Number,required:true},
        date : {type:String,required:true},
        time: {type:String,required:true}
    }
)
 
module.exports = mongoose.model("Student_Attendance",studentAttendance)