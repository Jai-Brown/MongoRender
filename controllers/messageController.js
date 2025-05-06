const Topic = require('../models/Topic');
const Message = require('../models/Message');
const observer = require('../utils/observer');

exports.postMessage = async (req, res) => {
  const { content } = req.body;
  const userId = req.session.userId;
  const topicId = req.params.id;

  const message = await Message.create({
    content,
    author: userId
  });

  const topic = await Topic.findById(topicId);
  topic.messages.push(message._id);
  await topic.save();

  // Notify observers
  observer.notify(topicId, content);

  res.redirect('/dashboard');
};
