const mongoose = require("mongoose")

const schema = mongoose.Schema

const attendance_schema = new schema(
    {
        email:{type:String,required:true,ref:"user"},
        date : {type:String,required:true},
        time: {type:String,required:true}
    } 
)

module.exports = mongoose.model("Attendance",attendance_schema)