const mongoose=require("mongoose")

const schema = mongoose.Schema

const user_schema = new schema(
    {
        name : {type : String, required: true},
        id : {type : Number, required: true},
        phno : {type : Number, required: true},
        email : {type : String,required: true},
        password : {type: String, required : true},
        center : {type : mongoose.Schema.Types.ObjectId , required : true, ref : "center"},
        timing : {type: String ,required : true},
        specialization: { type: String, required: true },
        // documentPath: { type: String, required: true }
    },
    {timestamps : true} 
)
// center : {type : mongoose.Schema.Types.ObjectId , required : true, ref : "center",},
module.exports = mongoose.model("user",user_schema)