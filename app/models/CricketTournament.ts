import mongoose, {Schema, Document, ObjectId} from "mongoose";

export interface CricketTournament extends Document {
    name: string;
    city : string;
    venue: string;
    completeTeam : [ObjectId]
    fees: number;
    over: number;
    ballType: string;
    organizerName: string;
    number: string;
    description: string;
    startDate: Date;
    endDate: Date;
    organizerId: ObjectId;
    isActive: boolean;
    resgistrationDate : Date,
    teams : number
}

const CricketTournamentSchema: Schema<CricketTournament> = new Schema({
    name : {
        type: String,
        required: true,
    },
    city: {
        type: String,
        required: true,
    },
    venue: {
        type: String,
        required: true,
    },
    fees: {
        type: Number,
        required: true,
    },
    over: {
        type: Number,
        required: true,
    },
    ballType: {
        type: String,
        enum: ['tennis', 'leather'],
        default: 'tennis',
    },
    organizerName: {
        type: String,
        required: true,
    },
    number: {
        type: String,
        required: true,
    },
    description: {
        type: String,
        required: true,
    },
    resgistrationDate : {
        type : Date,
        required : true,
    },
    teams : {
        type : Number,
        required : true,
    },
    completeTeam : {
        type : [mongoose.Schema.Types.ObjectId]
    },
    startDate: {
        type: Date,
        required: true,
    },
    endDate: {
        type: Date,
        required: true,
    },
    organizerId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Users',
        required: true,
    },
    isActive: {
        type: Boolean,
        default: true,
    }

}, {
    timestamps: true
});


const CricketTournamentModel = (mongoose.models.CricketTournament as mongoose.Model<CricketTournament>) || mongoose.model<CricketTournament>("CricketTournament", CricketTournamentSchema);
export default CricketTournamentModel;