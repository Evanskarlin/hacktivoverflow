const router = require('express').Router()
const AnswerController = require('../controllers/AnswerController')
const {authentication, authorizationAnswer} = require('../middlewares/auth')

router.use(authentication)

router.post('/:questionId', AnswerController.create)
router.patch('/:id/upvote', AnswerController.upVote)
router.patch('/:id/downvote', AnswerController.downVote)

router.use('/:id', authorizationAnswer)

router.put('/:id', AnswerController.update)

module.exports = router