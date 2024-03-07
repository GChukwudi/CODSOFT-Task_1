const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({

    firstName: {
        type: String,
        trim: true,
        required: [true, 'Please add your first name'],
        maxlength: 32
    },
    lastName: {
        type: String,
        trim: true,
        required: [true, 'Please add your last name'],
        maxlength: 32
    },
    email: {
        type: String,
        trim: true,
        required: [true, 'Please add your email'],
        unique: true,
        match: [
            /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/,
            'Please add a valid email'
        ]
    },
    password: {
        type: String,
        required: [true, 'Please add a password'],
        minlength: [6, 'Password must be at least 6 characters long' ],
        // select: false
    },
    role: {
        type: Number,
        default: 0
    },
}, {timestamps: true});

// Password hash middleware
userSchema.pre('save', async function(next) {
    // Only run this function if password was actually modified
    if (!this.isModified('password')) {
        next();
    }
    // Hash the password
    this.password = await bcrypt.hash(this.password, 10);
    next();
});

module.exports = mongoose.model('User', userSchema);