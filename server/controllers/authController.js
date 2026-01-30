const User = require('../models/User');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

// Register User
exports.register = async (req, res) => {
    const { username, email, password } = req.body;
    try {
        let user = await User.findOne({ email });
        if (user) {
            return res.status(400).json({ msg: 'User already exists' });
        }

        user = new User({
            username,
            email,
            password
        });

        const salt = await bcrypt.genSalt(10);
        user.password = await bcrypt.hash(password, salt);

        // Auto-generate profile pic URL based on username
        user.profilePic = `https://ui-avatars.com/api/?name=${encodeURIComponent(username)}&background=random`;

        await user.save();

        const payload = {
            user: {
                id: user.id
            }
        };

        jwt.sign(
            payload,
            process.env.JWT_SECRET || 'secret',
            { expiresIn: 360000 },
            (err, token) => {
                if (err) throw err;
                res.json({ token, user: { id: user.id, username: user.username, profilePic: user.profilePic, isVerified: user.isVerified, bio: user.bio } });
            }
        );
    } catch (err) {
        console.error("Register Error:", err.message);
        res.status(500).json({
            msg: 'Server error during registration',
            // TODO: Remove detailed error in strict production later
            error: err.message
        });
    }
};

// Login User
exports.login = async (req, res) => {
    const { email, password } = req.body;
    try {
        let user = await User.findOne({ email });
        if (!user) {
            return res.status(400).json({ msg: 'Invalid Credentials' });
        }

        const isMatch = await bcrypt.compare(password, user.password);
        if (!isMatch) {
            return res.status(400).json({ msg: 'Invalid Credentials' });
        }

        const payload = {
            user: {
                id: user.id
            }
        };

        jwt.sign(
            payload,
            process.env.JWT_SECRET || 'secret',
            { expiresIn: 360000 },
            (err, token) => {
                if (err) throw err;
                res.json({ token, user: { id: user.id, username: user.username, profilePic: user.profilePic, isVerified: user.isVerified, bio: user.bio } });
            }
        );
    } catch (err) {
        console.error("Login Error:", err.message);
        res.status(500).json({
            msg: 'Server error during login',
            // TODO: Remove detailed error in strict production later
            error: err.message
        });
    }
};


// Get User Profile
exports.getProfile = async (req, res) => {
    try {
        const user = await User.findById(req.user.id).select('-password');
        res.json(user);
    } catch (err) {
        console.error(err.message);
        res.status(500).send('Server Error');
    }
};

// Update Profile
exports.updateProfile = async (req, res) => {
    const { username, profilePic, bio, isVerified } = req.body;
    try {
        let user = await User.findById(req.user.id);
        if (!user) return res.status(404).json({ msg: 'User not found' });

        if (username) user.username = username;
        if (profilePic) user.profilePic = profilePic;
        if (bio) user.bio = bio;
        if (typeof isVerified === "boolean") user.isVerified = isVerified; // Just for demo purposes

        await user.save();
        res.json(user);
    } catch (err) {
        console.error(err.message);
        res.status(500).send('Server Error');
    }
};
