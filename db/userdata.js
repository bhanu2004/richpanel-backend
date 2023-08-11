const mongoose = require("mongoose");

const userSchema = new mongoose.Schema({
    name: String,
    email: String,
    password: String,
    status:Boolean,
    plan: Object,
    stDate: String,
    endDate:String,
 }
 
 );
const userdata = new mongoose.model('userdata',userSchema);

module.exports = userdata;