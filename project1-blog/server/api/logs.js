const { Router } = require('express');
const router = Router();
require('dotenv').config();

const LogEntrty = require('../models/LogComments');

const Pusher = require('pusher');

const pusher = new Pusher({
  appId: process.env.PUSER_APP_ID,
  key: process.env.PUSHER_KEY,
  secret: process.env.PUSHER_SECRETS,
  cluster: 'us2',
});

router.get('/', (req, res) => {
  LogEntrty.find().exec((err, comments) => {
    res.json({ comments });
  });
});

router.post('/', async (req, res, next) => {
  try {
    const logEntry = new LogEntrty(req.body);
    pusher.trigger('Blog-Comments', 'new-event', logEntry);
    const createdEntry = await logEntry.save();
    res.json(createdEntry);
  } catch (error) {
    next(error);
  }
});

module.exports = router;
