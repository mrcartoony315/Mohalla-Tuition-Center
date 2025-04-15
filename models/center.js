const mongoose = require("mongoose");

const schema = mongoose.Schema;

const center_schema = new schema(
    {
        center: {type: String, required: true},
        centerCode: {type:String,required:true},
        city:{type:String,required:true},
        location: {type:String, required:true},
        postalCode:{type:Number,required:true},
        contactPerson:{type:String,required:true},
        contactNumber : {type : Number, required: true},
        centerImages:{type:[String], required:false},
    },
    {timestamps: true}
)

module.exports = mongoose.model("center",center_schema);