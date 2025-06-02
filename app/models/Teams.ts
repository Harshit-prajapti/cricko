import mongoose, {Schema, Document, ObjectId} from "mongoose";
import { getServerSession } from "next-auth";
interface Team extends Document {
    tournamentId : ObjectId,
    name : string,
    owner : string,
    contact : string,
    email : string,
    players : [{name : string, age : string,contact : string,jersey : string,role : string}]
    points : number,
    netRunRate : number,
    captain : {name : string, age : string,contact : string,jersey : string,role : string},
    viceCaptain : {name : string, age : string,contact : string,jersey : string,role : string},
    substitutes : [{name : string, age : string,contact : string,jersey : string,role : string}]
}

const TeamSchema:Schema<Team> = new Schema({
    tournamentId : {
        type : mongoose.Schema.Types.ObjectId,
        ref : "cricketTournaments",
        required : true,
    },
    name : {
        type : String, 
        required : true,
    },
    owner : {
        type : String,
        required : true,
    },
    points : {
        type : Number,
        required : true,
        default : 0
    },
    netRunRate : {
        type : Number,
        required : true,
        default : 0,
    },
    players : [{
        name : {
            type : String,
            required : true,
        },
        age : {
            type : String,
            required : true,
        },
        contact : {
            type : String,
            required : true,
        },
        jersey : {
            type : String,
            required : true,
        },
        role : {
            type : String,
            required : true,
        }
    }],
    captain : {
        name : {
            type : String,
            required : true,
        },
        age : {
            type : String,
            required : true,
        },
        contact : {
            type : String,
            required : true,
        },
        jersey : {
            type : String,
            required : true,
        },
        role : {
            type : String,
            required : true,
        }
    },
    viceCaptain : {
        name : {
            type : String,
            required : true,
        },
        age : {
            type : String,
            required : true,
        },
        contact : {
            type : String,
            required : true,
        },
        jersey : {
            type : String,
            required : true,
        },
        role : {
            type : String,
            required : true,
        }
    },
    substitutes : [{
        name : {
            type : String,
            required : true,
        },
        age : {
            type : String,
            required : true,
        },
        contact : {
            type : String,
            required : true,
        },
        jersey : {
            type : String,
            required : true,
        },
        role : {
            type : String,
            required : true,
        }
    }]

})

const TeamModel = (mongoose.models.teams as mongoose.Model<Team>) || mongoose.model<Team>("teams",TeamSchema)

export default TeamModel