const express = require('express');
const {protect} = require('../middleware/authMiddleware')
const router = express.Router();

const {createPrompt , getPrompt , getPromptById , updatePrompt , deletePrompt , upvotePrompt} = require('../controllers/promptController')


router.route('/').post(protect,createPrompt).get(protect,getPrompt)

router.route('/:id').get(protect,getPromptById).put(protect,updatePrompt).delete(protect,deletePrompt)

router.route('/:id/upvote').post(protect,upvotePrompt)

module.exports = router;