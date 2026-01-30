const express = require('express');
const { body } = require('express-validator');
const router = express.Router();
const issueController = require('../controllers/issueController');

// Helper to inject IO into request for controller access
const withIO = (controller) => (req, res, next) => {
    req.io = req.app.get('io');
    return controller(req, res, next);
};

// Validation rules
const issueValidation = [
    body('title').isString().notEmpty().trim().escape().withMessage('Title is required'),
    body('type').isIn(['incident', 'bug', 'task']).withMessage('Invalid type'),
    body('priority').isIn(['high', 'medium', 'low']).withMessage('Invalid priority'),
    body('description').optional().isString().trim(),
];

router.get('/', issueController.getIssues);

router.post('/', issueValidation, withIO(issueController.createIssue));

router.patch('/:id', withIO(issueController.updateIssue));

router.delete('/:id', withIO(issueController.deleteIssue));

// Dev only reset
router.post('/reset', withIO(issueController.resetIssues));

module.exports = router;
