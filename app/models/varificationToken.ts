import mongoose from "mongoose";
const verificationTokenSchema = new mongoose.Schema({
    email : {type : String, required : true},
    token : {type : String, required : true},
    expiresAt : {type : Date, required : true},
    name : {type : String,required : true},
    password : {type : String, require : true}
})

export const VerificationToken = mongoose.models.VerificationToken || mongoose.model("VerificationToken", verificationTokenSchema);
