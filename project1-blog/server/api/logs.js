const { Router } = require('express');
const router = Router();

const LogEntrty = require('../models/LogComments');

const Pusher = require('pusher');

const pusher = new Pusher({
  appId: '968835',
  key: '6a33f2e6e4b3290f9b48',
  secret: 'e4f6b266d4be27d9adb9',
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
