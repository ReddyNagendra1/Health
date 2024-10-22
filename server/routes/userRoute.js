const express = require('express');
const router = express.Router();
const User = require('../models/userModel');
const Doctor = require('../models/doctorModel')
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const authMiddleWare = require('../middlewares/authMiddleWare');

// Register new user
router.post('/register', async (req, res) => {
    try {

        const userExists = await User.findOne({ email: req.body.email });
        if (userExists) {
            return res.status(200).send({ message: 'User already exists', success: false });
        }

        const password = req.body.password;
        const salt = await bcrypt.genSalt(10);
        const hashedPassword = await bcrypt.hash(password, salt);
        req.body.password = hashedPassword;
        const newUser = new User(req.body);
        await newUser.save();

        res.status(200).send({ message: 'User created successfully', success: true });
    } catch (error) {
        res.status(500).send({ message: 'Error creating user', success: false, error: error.message });
    }
});

// User login
router.post('/login', async (req, res) => {
    try {
        // const { email, password } = req.body;
        const user = await User.findOne({ email: req.body.email });
        if (!user) {
            return res.status(200).send({ message: 'User does not exist', success: false });
        }

        const isMatch = await bcrypt.compare(req.body.password, user.password);
        if (!isMatch) {
            return res.status(200).send({ message: 'Incorrect password', success: false });
        } else {
            // Create JWT token
            const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET, { expiresIn: '1d' });
            res.status(200).send({ message: 'Login successful', success: true, data: { token } });
        }
    } catch (error) {
        res.status(500).send({ message: 'Error logging in', success: false, error: error.message });
    }
});

// Protected route to get user info
router.post('/get-user-info-by-id', authMiddleWare, async (req, res) => {
    try {
        const user = await User.findOne({ _id: req.body.userId });
        // user.password = undefined;
        if (!user) {
            return res.status(200).send({ message: 'User not found', success: false });
        } else {
            res.status(200).send({
                success: true, data: {
                    name: user.name,
                    email: user.email,
                }
            });
        }

    } catch (error) {
        res.status(500).send({ message: 'Error getting user info', success: false, error: error.message });
    }
});

router.post('/apply-doctor-account', authMiddleWare, async (req, res) => {
    try {
        const newDoctor = new Doctor({ ...req.body, status: 'pending' });
        await newDoctor.save();
        const adminUser = await User.findOne({ isAdmin: true });

        const unseenNotifications = adminUser.unseenNotifications
        unseenNotifications.push({
            type: 'new-doctor-request',
            message: `${newDoctor.firstName} ${newDoctor.lastName} has applied for a doctor account`,
            data: {
                doctorId: newDoctor._id,
                name: newDoctor.firstName + ' ' + newDoctor.lastName
            },
            onclickPath: '/admin/doctors'
        });
        await User.findByIdAndUpdate(adminUser._id, { unseenNotifications });
        res.status(200).send({
            success: true,
            message: 'Doctor account applied successfully',
        })
    } catch (error) {
        res.status(500).send({ message: 'Error applying doctor account', success: false, error: error.message });
    }
});

router.post('/mark-all-notifications-as-seen', authMiddleWare, async (req, res) => {
    try {
        const user = await User.findOne({ _id: req.body.userId });
        const unseenNotifications = user.unseenNotifications;
        const seenNotifications = user.seenNofications;
        seenNotifications.push(...unseenNotifications);
        user.unseenNotifications = [];
        user.seenNotifications = seenNotifications;
        const updatedUser = await user.save();
        updatedUser.password = undefined;
        res.status(200).send({
            success: true,
            message: "All notifications marked as seen",
            data: updatedUser,
        });
    } catch (error) {
        res.status(500).send({ message: 'Error applying doctor account', success: false, error: error.message });
    }
});

router.post('/delete-all-notifications', authMiddleWare, async (req, res) => {
    try {
        const user = await User.findOne({ _id: req.body.userId });

        user.seenNofications = [];
        user.unseenNofications = [];
        const updatedUser = await User.findByIdAndUpdate(user._id, user);
        updatedUser.password = undefined;
        res.status(200).send({
            success: true,
            message: "All notifications marked as seen",
            data: updatedUser,
        });
    } catch (error) {
        res.status(500).send({ message: 'Error applying doctor account', success: false, error: error.message });
    }
});

module.exports = router;









