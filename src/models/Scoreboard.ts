import mongoose, { Model, Schema } from "mongoose";

// Define the schema
interface ScoreBoard extends Document {
  name: string;
  points: number;
}

const schema: Schema<ScoreBoard> = new Schema({
  name: String,
  points: Number,
});

// Define the model
export const ScoreBoardModel: Model<ScoreBoard> = mongoose.model<ScoreBoard>('ScoreBoard', schema);
