import { Schema, models, model, Document } from 'mongoose';

export interface IStreak extends Document {
    websiteUrl: string;
    websiteName: string;
    streakLength: number;
    streakStartDate: Date;
    target: number;
}

const StreakSchema: Schema<IStreak> = new Schema({
    websiteUrl: {
        type: String,
        required: true,
    },
    websiteName: {
        type: String,
        required: true,   
    },
    streakLength: {
        type:Number,
        default: 0,
    },
    streakStartDate: {
        type: Date,
        default: Date.now,
    },
    target: {
        type: Number,
        required: true,
    }
})

export default models.Streak ?? model('Streak', StreakSchema);
