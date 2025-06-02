import mongoose, {Schema, Document} from "mongoose";

export interface User extends Document {
    name : string,
    email : string,
    role : string,
    password : string,
    avatar : string,
    provider : string,
    isProfileComplete : boolean
}
const UserSchema : Schema<User>  = new Schema({
    name : {
        type : String,
        required : true,
    },
    email : {
        type : String,
        required : true,
        unique : true,
    },
    role : {
        type : String,
        required : true,
        enum : ["user","organizer"],
        default : "user"
    },
    password : {
        type : String,
    },
    avatar : {
        type : String,
    },
    provider : {
        type : String,
        enum : ['google','credential'],
        default : "google"
    },
    isProfileComplete : {
        type : Boolean,
        default : false
    }
},{
    timestamps : true
})

UserSchema.pre("save", async function (next) {
    next()
})

const UserModel = (mongoose.models.User as mongoose.Model<User>) || mongoose.model<User>("User",UserSchema)

export default UserModel