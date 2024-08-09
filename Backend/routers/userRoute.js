const express = require('express');
const mongoose = require('mongoose');
const User = require('../models/user');
const router = express.Router();
const wrapAsync = require('../utils/wrapAsync');
const ExpressError = require('../utils/ExpressError');
const Joi = require('joi');
const passport = require('passport');
const taskSchema = Joi.object({
    title: Joi.string().required()
});

// Define userSchema for validation
const userSchema = Joi.object({
    name: Joi.string().required(),
    email: Joi.string().email().required(),
    password: Joi.string().required(),
    monday: Joi.array().items(taskSchema).optional(),
    tuesday: Joi.array().items(taskSchema).optional(),
    wednesday: Joi.array().items(taskSchema).optional(),
    thursday: Joi.array().items(taskSchema).optional(),
    friday: Joi.array().items(taskSchema).optional(),
    saturday: Joi.array().items(taskSchema).optional(),
    sunday: Joi.array().items(taskSchema).optional()
});

// Validation middleware
const validationUser = (req, res, next) => {
    const { error } = userSchema.validate(req.body);
    if (error) {
        const errMsg = error.details.map(el => el.message).join(",");
        throw new ExpressError(400, errMsg);
    } else {
        next();
    }
};

// Authentication middleware
function isLoggedIn(req, res, next) {
    if (req.isAuthenticated()) {
        return next();
    } else {
        res.status(401).json({ message: "You need to log in to access this route" });
    }
}

// Create User
router.post('/', validationUser, wrapAsync(async (req, res) => {
    const { name, email, password, monday, tuesday, wednesday, thursday, friday, saturday, sunday } = req.body;
    const userData = await User.create({
        name,
        email,
        password,
        monday,
        tuesday,
        wednesday,
        thursday,
        friday,
        saturday,
        sunday
    });
    res.status(201).json(userData);
}));

// Local sign up route
router.post('/signup', validationUser, wrapAsync(async (req, res) => {
    const { name, email, password } = req.body;
    const user = new User({ name, email, password });
    await user.save();
    req.login(user, err => {
        if (err) return next(err);
        res.status(201).json(user);
    });
}));


// Local login route
// router.post('/login', passport.authenticate('local', {
//     failureMessage: 'Invalid email or password.'
// }), (req, res) => {
//     res.json(req.user);
// });
router.post('/login', (req, res, next) => {
    passport.authenticate('local', (err, user, info) => {
        if (err) {
            return res.status(500).json(err);
        }
        if (!user) {
            return res.status(400).json({ message: info.message });
        }

        res.status(200).json({
            msg: info.message,
            token: info.token,
            userId: user._id.toString()
        });
    })(req, res, next);
});

router.get('/user',isLoggedIn,wrapAsync(async(req,res)=>{
    try {
        const userData=req.user;
        console.log(userData)
        res.json(userData);
    } catch (error) {
        console.log(`error from the route ${error}`)
    }
} ))


router.get('/', wrapAsync(async (req, res) => {
    res.send('<a href="/auth/google">Authenticate with Google</a>');
}));

// Read Single User
router.get('/:id', isLoggedIn, wrapAsync(async (req, res) => {
    const { id } = req.params;
    const singleUser = await User.findById(id);
    if (!singleUser) {
        throw new ExpressError(404, "User not found");
    }
    res.status(200).json(singleUser);
}));

// Delete User
router.delete('/:id', isLoggedIn, wrapAsync(async (req, res) => {
    const { id } = req.params;
    const singleUser = await User.findByIdAndDelete(id);
    if (!singleUser) {
        throw new ExpressError(404, "User not found");
    }
    res.status(200).json(singleUser);
}));

// Update User
router.patch('/update/:id', isLoggedIn, wrapAsync(async (req, res) => {
    const { id } = req.params;
    const updateUser = await User.findByIdAndUpdate(id, req.body, { new: true });
    if (!updateUser) {
        throw new ExpressError(404, "User not found");
    }
    res.status(200).json(updateUser);
}));

// Create Task for a Specific Day
router.post('/:id/tasks/:day', isLoggedIn, wrapAsync(async (req, res) => {
    const { id, day } = req.params;
    const { title } = req.body;
    const task = { title };
    
    const user = await User.findById(id);
    if (!user) {
        throw new ExpressError(404, "User not found");
    }

    if (!user[day]) {
        throw new ExpressError(400, "Invalid day");
    }

    user[day].push(task);
    await user.save();
    res.status(201).json(user);
}));

// Delete Task for a Specific Day
router.delete('/:id/tasks/:day/:taskId', isLoggedIn, wrapAsync(async (req, res) => {
    const { id, day, taskId } = req.params;

    const user = await User.findById(id);
    if (!user) {
        throw new ExpressError(404, "User not found");
    }

    if (!user[day]) {
        throw new ExpressError(400, "Invalid day");
    }

    user[day].id(taskId).remove();
    await user.save();
    res.status(200).json(user);
}));

module.exports = router;