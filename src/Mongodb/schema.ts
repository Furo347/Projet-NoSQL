import mongoose, { Schema, Document, Model } from 'mongoose';

// Define the MongoDB URI
const MONGODB_URI = 'mongodb://localhost:27017';

// Define the schema
interface ScoreBoard extends Document {
    name: string;
    score: number;
}

const schema: Schema<ScoreBoard> = new Schema({
    name: String,
    score: Number,
});

// Define the model
const ScoreBoard: Model<ScoreBoard> = mongoose.model<ScoreBoard>('ScoreBoard', schema);

// Connect to MongoDB
async function main() {
    try {
        await mongoose.connect(MONGODB_URI);
        console.log('Connected to MongoDB');
    } catch (error) {
        console.error('Error connecting to MongoDB:', error);
    }
}

main();

export async function insertInMongo(name: string, score: number): Promise<void> {
    try {
        await ScoreBoard.create({ name, score });
        console.log('Data inserted successfully');
    } catch (error) {
        console.error('Error inserting data:', error);
    }
}
