import mongoose from 'mongoose';


const taskSchema = new mongoose.Schema({
    title: {
        type: String,
        required: true,
        trim: true,
    },
    description: {
        type: String,
        trim: true,
    },
    priority: {
        type: String,
        enum: ['low', 'medium', 'high'],
        default: 'medium',
    },
    completed: Boolean,
    createdAt: {
        type: Date,
        default: Date.now,
    },
});


export default mongoose.model('Task', taskSchema);