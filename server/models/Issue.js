const mongoose = require('mongoose');

const issueSchema = new mongoose.Schema({
    _id: String,
    title: { type: String, required: true },
    description: String,
    type: { type: String, enum: ['incident', 'bug', 'task'], required: true },
    priority: { type: String, enum: ['high', 'medium', 'low'], required: true },
    status: { type: String, enum: ['open', 'in_progress', 'resolved'], default: 'open' },
    createdBy: String,
    assignedTo: String,
    tags: [String],
}, { timestamps: true, _id: false });

module.exports = mongoose.model('Issue', issueSchema);
