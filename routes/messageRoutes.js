const express = require('express');
const router = express.Router();
const messageController = require('../controllers/messageController');

router.post('/:id/post', messageController.postMessage);

module.exports = router;
