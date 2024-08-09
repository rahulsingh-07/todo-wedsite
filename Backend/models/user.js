require('dotenv').config()
const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

// Define taskSchema
const taskSchema = new Schema({
    title: {
        type: String,
        required: true
    },
    done: { type: Boolean, 
        default: false },
}, { timestamps: true });

// Define userSchema
const userSchema = new Schema({
    name: {
        type: String,
        required: true,
      
    },
    photo: String,
    password: {
        type: String,
        required: true,
       
    },
    email: {
        type: String,
        required: true,
       
    },
    monday: [taskSchema],
    tuesday: [taskSchema],
    wednesday: [taskSchema],
    thursday: [taskSchema],
    friday: [taskSchema],
    saturday: [taskSchema],
    sunday: [taskSchema]
}, { timestamps: true });

// Password hashing middleware
userSchema.pre('save', async function(next) {
    if (!this.isModified('password')) return next();
    try {
        this.password = await bcrypt.hash(this.password, 12);
   
    } catch (error) {
        next(error);
    }
});

// Compare password method
userSchema.methods.comparePassword = async function(candidatePassword) {
    return bcrypt.compare(candidatePassword, this.password);
};

//JWT json web token
// Generate token method
userSchema.methods.generateToken = function() {
    try {
        const token = jwt.sign({ 
            userId: this._id.toString() ,
            email:this.email,
             },
             process.env.JWT_SECRET,
             {
                expiresIn:"30d"
             }
    );
    return token
    } catch (error) {
        console.error('Error generating token:', error);
        return null;
    }
};

const User = mongoose.model('User', userSchema); // Corrected model name
module.exports = User;
