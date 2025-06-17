import mongoose from 'mongoose';
import bcrypt from "bcrypt";

const userSchema = mongoose.Schema({
    username: { 
        type: String,
        unique: true,
        required: true 
    },
    password: { type: String, required: true, validate: {
        validator: (v) => {
            return (
                v.length >= 8 &&
                /[a-z]/.test(v) && 
                /[A-Z]/.test(v) &&
                /[0-9]/.test(v)
            )
        },
        message: passwordNotValid => `${passwordNotValid.value} is not a valid password!`
    } },
    tasks: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Task' }],
    refresh_token: { type: String },
    created_at: { type: Date, default: Date.now }
});

userSchema.pre('save', async function(next) {
    if (!this.isModified('password')) return next();
    const hash = await bcrypt.hash(this.password, 10);
    this.password = hash;
    next();
});

export default mongoose.model('User', userSchema);