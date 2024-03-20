import mongoose from 'mongoose';
import { ScoreBoardModel } from '../models/Scoreboard';

// Define the MongoDB URI
const MONGODB_URI = 'mongodb://localhost:27017';

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
export async function insertInMongo(name: string, points: number) {
    try {
        console.log('Data inserted successfully');
        return await ScoreBoardModel.create({ name, points });
    } catch (error) {
        console.error('Error inserting data:', error);
        throw error;
    }
}

// Retrieve function
export async function getScoreBoard(): Promise<{ name: string, points: number }[]> {
    try {
        const scores = await ScoreBoardModel.find({}, { _id: 0, __v: 0 }); // Exclude _id and __v fields
        return scores.map(score => ({ name: score.name, points: score.points }));
    } catch (error) {
        console.error('Error retrieving scores:', error);
        throw error;
    }
}

// Function to delete all data from the ScoreBoard collection
export async function deleteAllData() {
    try {
        const result = await ScoreBoardModel.deleteMany({});
        console.log(`${result.deletedCount} documents deleted from the ScoreBoard collection.`);
    } catch (error) {
        console.error('Error deleting data:', error);
        throw error;
    }
}