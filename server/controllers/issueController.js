const Issue = require('../models/Issue');
const { validationResult } = require('express-validator');

// Seed data for initial population
const SEED_DATA = [
    {
        "_id": "ISSUE-1001",
        "title": "Login API returning 500",
        "description": "Users are unable to login due to internal server error.",
        "type": "incident",
        "priority": "high",
        "status": "open",
        "createdBy": "ashish",
        "assignedTo": "backend-team",
        "tags": ["auth", "backend", "production"],
        "createdAt": "2026-01-28T10:15:00Z",
        "updatedAt": "2026-01-28T10:15:00Z"
    },
    {
        "_id": "ISSUE-1002",
        "title": "UI breaks on mobile",
        "description": "Navbar overlaps content on small screens.",
        "type": "bug",
        "priority": "medium",
        "status": "in_progress",
        "createdBy": "frontend-team",
        "assignedTo": "ashish",
        "tags": ["ui", "responsive"],
        "createdAt": "2026-01-27T08:20:00Z",
        "updatedAt": "2026-01-28T09:00:00Z"
    },
    {
        "_id": "ISSUE-1003",
        "title": "Add incident filtering",
        "description": "Filter issues by status, priority, and type.",
        "type": "task",
        "priority": "low",
        "status": "resolved",
        "createdBy": "product-manager",
        "assignedTo": "frontend-team",
        "tags": ["feature", "dashboard"],
        "createdAt": "2026-01-25T12:00:00Z",
        "updatedAt": "2026-01-26T16:30:00Z"
    }
];

// Helper to generate readable IDs
const generateId = async () => {
    const count = await Issue.countDocuments();
    return `ISSUE-${1000 + count + 1 + Math.floor(Math.random() * 100)}`;
};

exports.getIssues = async (req, res) => {
    try {
        let issues = await Issue.find().sort({ createdAt: -1 });

        // Auto-seed if empty for better DX
        if (issues.length === 0) {
            await Issue.insertMany(SEED_DATA);
            issues = SEED_DATA;
        }

        res.json(issues);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

exports.createIssue = async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
    }

    try {
        const { title, description, type, priority, assignedTo, tags } = req.body;

        const newIssue = new Issue({
            _id: await generateId(),
            title,
            description,
            type,
            priority,
            status: 'open', // Default status
            assignedTo,
            tags: tags || [],
            createdBy: 'user'
        });

        await newIssue.save();

        // Emit real-time event
        req.io.emit('ISSUE_ADDED', newIssue);

        res.status(201).json(newIssue);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

exports.updateIssue = async (req, res) => {
    try {
        const { id } = req.params;
        const updatedIssue = await Issue.findByIdAndUpdate(id, req.body, { new: true });

        if (!updatedIssue) {
            return res.status(404).json({ message: "Issue not found" });
        }

        req.io.emit('ISSUE_UPDATED', updatedIssue);
        res.json(updatedIssue);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

exports.deleteIssue = async (req, res) => {
    try {
        const { id } = req.params;
        await Issue.findByIdAndDelete(id);

        req.io.emit('ISSUE_DELETED', id);

        res.json({ message: "Deleted successfully" });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

exports.resetIssues = async (req, res) => {
    try {
        await Issue.deleteMany({});
        await Issue.insertMany(SEED_DATA);

        req.io.emit('REFRESH_ALL');

        res.json({ message: "Reset successfully" });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};
