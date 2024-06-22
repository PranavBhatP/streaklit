import { Schema, model, models, Document, Types } from "mongoose";

export interface IUser extends Document {
  username: string;
  email: string;
  password: string;
  streaks: Types.ObjectId[];
  images: string[];
}

const UserSchema = new Schema<IUser>({
  username: { type: String, required: true },
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true },
  streaks: [{
    type: Schema.Types.ObjectId,
    ref: 'Streak',
  }],
  images: [{ type: String }]
});

export default models.User ?? model('User', UserSchema);
