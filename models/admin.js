const mongoose = require("mongoose")

const schema = mongoose.Schema

const admin_schema = new schema(
    {
        name : {type : String, required: true},
        email:{type : String, required: true},
        phno: {type: Number, required: true},
        password : {type : String , required: true},
    },
    {timestamps:true}
)

module.exports = mongoose.model("admin",admin_schema)