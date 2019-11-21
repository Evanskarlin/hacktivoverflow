const router = require('express').Router()
const QuestionController = require('../controllers/QuestionController')
const {authentication, authorizationQuestion} = require('../middlewares/auth')

router.get('/', QuestionController.readAll)

router.use(authentication)

router.post('/', QuestionController.create)
router.get('/myquestion', QuestionController.readByUserId)
router.get('/:id', QuestionController.readById)
router.patch('/:id/upvote', QuestionController.upVote)
router.patch('/:id/downvote', QuestionController.downVote)
router.patch('/:id/view', QuestionController.view)

router.use('/:id', authorizationQuestion)

router.put('/:id', QuestionController.update)
router.delete('/:id', QuestionController.delete)

module.exports = router