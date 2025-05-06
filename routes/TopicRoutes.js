const express = require('express');
const router = express.Router();
const topicController = require('../controllers/topicController');

router.get('/', topicController.listTopics);
router.post('/create', topicController.createTopic);
router.post('/:id/subscribe', topicController.subscribeTopic);
router.post('/:id/unsubscribe', topicController.unsubscribeTopic);
router.get('/stats', topicController.topicStats);

module.exports = router;
