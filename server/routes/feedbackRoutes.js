const express = require('express');
const router = express.Router();
const feedbackController = require('../controllers/feedbackController');
const authMiddleware = require('../middleware/auth');
const { body } = require('express-validator');

// Get all feedback (Publicly visible)
router.get('/', feedbackController.getAllFeedback);

// Create new feedback (Protected)
router.post('/', [
    authMiddleware,
    body('rating').isFloat({ min: 1, max: 5 }).withMessage('Rating must be between 1 and 5'),
    body('comment').notEmpty().trim().isLength({ max: 500 }).withMessage('Comment is required within 500 chars')
], feedbackController.createFeedback);

module.exports = router;
