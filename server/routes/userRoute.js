const express = require('express');
const router = express.Router();
const User = require('../models/userModel');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const authMiddleWare = require('../middlewares/authMiddleWare');

// Register new user
router.post('/register', async (req, res) => {
    try {
        const { email, password } = req.body;

        const userExists = await User.findOne({ email });
        if (userExists) {
            return res.status(200).send({ message: 'User already exists', success: false });
        }

        const salt = await bcrypt.genSalt(10);
        const hashedPassword = await bcrypt.hash(password, salt);

        const newUser = new User({ ...req.body, password: hashedPassword });
        await newUser.save();

        res.status(200).send({ message: 'User created successfully', success: true });
    } catch (error) {
        res.status(500).send({ message: 'Error creating user', success: false, error: error.message });
    }
});

// User login
router.post('/login', async (req, res) => {
    try {
        const { email, password } = req.body;
        const user = await User.findOne({ email });
        if (!user) {
            return res.status(200).send({ message: 'User does not exist', success: false });
        }

        const isMatch = await bcrypt.compare(password, user.password);
        if (!isMatch) {
            return res.status(200).send({ message: 'Incorrect password', success: false });
        }

        // Create JWT token
        const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET, { expiresIn: '1d' });

        res.status(200).send({ message: 'Login successful', success: true, data: { token } });
    } catch (error) {
        res.status(500).send({ message: 'Error logging in', success: false, error: error.message });
    }
});

// Protected route to get user info
router.get('/get-user-info-by-id', authMiddleWare, async (req, res) => {
    try {
        const user = await User.findById(req.params.id);
        if (!user) {
            return res.status(404).json({ message: 'User not found', success: false });
        }

        res.status(200).json({
            message: 'User found',
            success: true,
            data: { name: user.name, email: user.email }, // Add other user fields if needed
        });
    } catch (error) {
        res.status(500).json({ message: 'Error retrieving user', success: false, error: error.message });
    }
});

module.exports = router;









