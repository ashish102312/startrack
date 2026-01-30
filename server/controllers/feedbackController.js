const Feedback = require('../models/Feedback');

// Clear legacy feedback without user data to prevent validation errors
// This is a one-time cleanup for development
(async () => {
    try {
        await Feedback.deleteMany({ user: { $exists: false } });
        console.log("Legacy feedback cleaned up");
    } catch (e) {
        console.error("Cleanup error", e);
    }
})();

exports.createFeedback = async (req, res) => {
    try {
        const { rating, comment } = req.body;

        const feedback = new Feedback({
            user: req.user.id,
            rating,
            comment
        });

        await feedback.save();

        // Return successful creation
        res.status(201).json(feedback);
    } catch (err) {
        console.error(err);
        res.status(500).json({ message: 'Server error' });
    }
};

exports.getAllFeedback = async (req, res) => {
    try {
        // Fetch all feedback, sorted by newest first
        const feedbacks = await Feedback.find()
            .sort({ createdAt: -1 })
            .populate('user', 'username profilePic isVerified bio');
        res.json(feedbacks);
    } catch (err) {
        console.error(err);
        res.status(500).json({ message: 'Server error' });
    }
};
