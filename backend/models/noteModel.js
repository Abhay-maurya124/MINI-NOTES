import mongoose from 'mongoose';

const noteSchema = new mongoose.Schema({
    title: {
        type: String,
        required: [true, 'Title is required'],
        trim: true
    },
    description: {
        type: String,
        required: [true, 'Description is required']
    },
    createdAt: {
        type: Date,
        default: Date.now
    }
});

export default mongoose.model('Note', noteSchema);
