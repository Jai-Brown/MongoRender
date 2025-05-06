const { Timestamp } = require('mongodb');
const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
    ocntent: String,
    author: {type: mongoose.Schema.Types.ObjectId, ref: 'Users'},
    timestamp: { type: Date, default: Date.now }
});

module.exports = mongoose.model('Messages', topicSchema);