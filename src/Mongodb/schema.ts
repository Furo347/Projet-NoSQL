import mongoose, { Schema, Document, Model } from 'mongoose';

// Define the MongoDB URI
const MONGODB_URI = `mongodb://${process.env.MONGO_HOST}:${process.env.MONGO_PORT}`;

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
const ScoreBoardModel: Model<ScoreBoard> = mongoose.model<ScoreBoard>('ScoreBoard', schema);

// Connect to MongoDB
async function connectToMongo() {
    try {
        await mongoose.connect(MONGODB_URI);
        console.log('Connected to MongoDB');
    } catch (error) {
        console.error('Error connecting to MongoDB:', error);
    }
}

connectToMongo();

// Insert function
export async function insertInMongo(name: string, score: number) {
    try {
        console.log('Data inserted successfully');
        return await ScoreBoardModel.create({ name, score });
    } catch (error) {
        console.error('Error inserting data:', error);
        throw error;
    }
}

// Retrieve function
export async function getScoreBoard(): Promise<{ name: string, score: number }[]> {
    try {
        const scores = await ScoreBoardModel.find({}, { _id: 0, __v: 0 }); // Exclude _id and __v fields
        return scores.map(score => ({ name: score.name, score: score.score }));
    } catch (error) {
        console.error('Error retrieving scores:', error);
        throw error;
    }
}
