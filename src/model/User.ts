import { Schema, model, models, Document, Types } from "mongoose";

export interface IUser extends Document {
  username: string;
  email: string;
  password: string;
  streaks: Types.ObjectId[];
}

const UserSchema = new Schema<IUser>({
  username: { type: String, required: true },
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true },
  streaks: [{
    type: Schema.Types.ObjectId,
    ref: 'Streak',
  }],
});

export default models.User ?? model('User', UserSchema);
