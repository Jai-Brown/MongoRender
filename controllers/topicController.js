const Topic = require('../models/Topic');
const User = require('../models/User');
const Message = require('../models/Message');
const observer = require('../utils/observer');

// List all topics with subscription info
exports.listTopics = async (req, res) => {
  if (!req.session.userId) return res.redirect('/auth/login');

  const user = await User.findById(req.session.userId);
  const allTopics = await Topic.find({});
  
  const subscribedIds = user.subscribedTopics.map(t => t.toString());
  const unsubscribedTopics = allTopics.filter(t => !subscribedIds.includes(t._id.toString()));

  res.render('topics', {
    subscribed: allTopics.filter(t => subscribedIds.includes(t._id.toString())),
    unsubscribed: unsubscribedTopics
  });
};

// Create a new topic and auto-subscribe creator
exports.createTopic = async (req, res) => {
  const { name } = req.body;
  const user = await User.findById(req.session.userId);
  const newTopic = await Topic.create({ name });

  user.subscribedTopics.push(newTopic._id);
  await user.save();

  observer.subscribe(newTopic._id.toString(), user._id.toString());

  res.redirect('/dashboard');
};

// Subscribe to a topic
exports.subscribeTopic = async (req, res) => {
  const user = await User.findById(req.session.userId);
  const topicId = req.params.id;

  if (!user.subscribedTopics.includes(topicId)) {
    user.subscribedTopics.push(topicId);
    await user.save();
    observer.subscribe(topicId, user._id.toString());
  }

  res.redirect('/topics');
};

// Unsubscribe from a topic
exports.unsubscribeTopic = async (req, res) => {
  const user = await User.findById(req.session.userId);
  const topicId = req.params.id;

  user.subscribedTopics = user.subscribedTopics.filter(id => id.toString() !== topicId);
  await user.save();

  res.redirect('/topics');
};

// View dashboard with 2 latest messages per subscribed topic
exports.dashboard = async (req, res) => {
  if (!req.session.userId) return res.redirect('/auth/login');

  const user = await User.findById(req.session.userId).populate('subscribedTopics');
  const dashboardData = [];

  for (const topic of user.subscribedTopics) {
    const fullTopic = await Topic.findById(topic._id).populate({
      path: 'messages',
      options: { sort: { timestamp: -1 }, limit: 2 }
    });

    fullTopic.accessCount += 1;
    await fullTopic.save();

    dashboardData.push({
      topic: fullTopic.name,
      id: fullTopic._id,
      messages: fullTopic.messages
    });
  }

  res.render('dashboard', { topics: dashboardData });
};

// Show topic access statistics
exports.topicStats = async (req, res) => {
  const topics = await Topic.find({}, 'name accessCount');
  res.render('stats', { topics });
};
