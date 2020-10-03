import mongoose from 'mongoose';

const LogSchema = new mongoose.Schema({
    id: {
        type: String,
        required: true
    },
    userId: {
        type: String,
        required: true
    },
    title: {
        type: String,
        required: true
    },
    detail: {
        type: String
    },
    amount: {
        type: Number,
        required: true
    },
    currency: {
        type: Number,
        required: true
    },
    date: {
        type: String,
        required: true
    }
});

export default mongoose.model("Log", LogSchema);