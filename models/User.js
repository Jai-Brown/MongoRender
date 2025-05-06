const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
  username: String,
  passwordHash: String,
  subscribedTopics: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Topic' }]
});

module.exports = mongoose.model('Users', userSchema);