
import noteRoutes from "./routes/noteRoutes.js"
import express from 'express';
import cors from 'cors';
import dotenv from "dotenv";
import mongoose from "mongoose";
dotenv.config();
const app = express();
const PORT = process.env.PORT || 5000;

app.use(cors());
app.use(express.json());


app.use('/api/notes', noteRoutes);
const uri = process.env.MONGODB_URI || process.env.MONGO_URI;

mongoose.connect(uri)
    .then(() => {
        console.log("MongoDB Connected successfully");
        app.listen(PORT, () => {
            console.log(`Server running on port ${PORT}`);
        });
    })
    .catch(err => {
        console.error("MongoDB connection error:", err);
    });