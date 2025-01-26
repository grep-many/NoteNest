const mongoose = require('mongoose');

const TaskSchema = new mongoose.Schema({
    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'user'
    },
    title: {
        type: String,
        required: true
    },
    content: {
        type: String,
        required: true
    },
    status: {
        type: Boolean,
        default:false,
        required: true
    },
    tags: {
        type: [String],
        default: []
    },
    isPinned:{
        type:Boolean,
        default:false
    },
    createdAt: {
        type: Date,
        default: Date.now
    },
});

module.exports = mongoose.models.TaskSchema || mongoose.model('task', TaskSchema);