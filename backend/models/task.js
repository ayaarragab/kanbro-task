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
    status: {
        type: String,
        enum: ['pending', 'in-progress', 'completed'],
        default: 'pending',
    },
    dueDate: {
        type: Date,
    },
    createdAt: {
        type: Date,
        default: Date.now,
    },
});


export default mongoose.model('Task', taskSchema);