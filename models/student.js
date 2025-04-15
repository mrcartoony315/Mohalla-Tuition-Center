const mongoose = require("mongoose")

const schema = mongoose.Schema

const student_schema = new schema(
    {
        name: {type:String,required:true},
        rollno:{type:Number,required:true},
        age:{type:Number},
        fname:{type:String,required:true},
        fphno:{type:Number,required:true},
        center:{type:mongoose.Schema.Types.ObjectId, ref: "center",required:true},
        tutor:{type:mongoose.Schema.Types.ObjectId, ref: "user",required:true}
    },
    {timestamps:true}
)

module.exports = mongoose.model("Student",student_schema)