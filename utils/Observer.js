class TopicObserver {
    constructor() {
      this.subscribers = new Map(); // topicId -> [userId, ...]
    }
  
    subscribe(topicId, userId) {
      if (!this.subscribers.has(topicId)) this.subscribers.set(topicId, []);
      this.subscribers.get(topicId).push(userId);
    }
  
    notify(topicId, message) {
      const users = this.subscribers.get(topicId) || [];
      users.forEach(uid => {
        console.log(`Notify User ${uid}: New message in Topic ${topicId} - ${message}`);
        // Extend: Save notification in DB or user inbox
      });
    }
  }
  
  module.exports = new TopicObserver();
  