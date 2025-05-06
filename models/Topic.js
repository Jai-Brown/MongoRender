const mongoose = require('mongoose');

const topicSchema = new mongoose.Schema({
  name: String,
  messages: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Message' }],
  accessCount: { type: Number, default: 0 }
});

module.exports = mongoose.model('Topics', topicSchema);