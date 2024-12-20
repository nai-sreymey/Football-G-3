const mongoose = require('mongoose');
const bcrypt = require('bcryptjs'); // Make sure bcrypt is installed

const UserSchema = new mongoose.Schema({
    email: { type: String, required: true, unique: true },
    name: { type: String, required: true },
    password: { type: String, required: true },
    role: { type: String, required: true },
    createdAt: { type: Date, default: Date.now },
    avatar: { type: String},
    updatedAt: { type: Date},
    createdBy: { type: Object},
    updatedBy: { type: mongoose.Schema.Types.ObjectId, ref: 'User'}
});

// Hash the password before saving the user
UserSchema.pre('save', async function (next) {
    if (!this.isModified('password')) return next();

    try {
        // Generate a salt
        const salt = await bcrypt.genSalt(10); // 10 is the default salt rounds value
        // Hash the password using the salt
        this.password = await bcrypt.hash(this.password, salt);
        next();
    } catch (error) {
        next(error);
    }
});

module.exports = mongoose.model('User', UserSchema);
