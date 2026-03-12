const express = require('express');

const router = express.Router();

const {createPrompt , getPrompt , getPromptById , updatePrompt , deletePrompt , upvotePrompt} = require('../controllers/promptController')


router.route('/').post(createPrompt).get(getPrompt)

router.route('/:id').get(getPromptById).put(updatePrompt).delete(deletePrompt)

router.route('/:id/upvote').post(upvotePrompt)

module.exports = router;