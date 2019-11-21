const Answer = require('../models/answer')
const Question = require('../models/question')

class AnswerController {
  static create(req, res, next){
    let {description} = req.body
    let {questionId} = req.params
    let answer
    Answer.create({
      description,
      userId: req.loggedUser._id
    })
      .then(data => {
        answer = data
        return Question.findOneAndUpdate({_id:questionId}, {$push: {answersId: data._id}}, 
          { 
            new: true
          })
      })
      .then(data => {
        res.status(200).json(answer)
      })
      .catch(next)
  }
  static upVote(req, res, next){
    let {id} = req.params
    Answer.findOne({_id:id})
      .then(data => {
        let downArr = data.downvotes
        let upArr = data.upvotes
        if(data.userId == req.loggedUser._id){
          throw {
            status: 401,
            message: 'Cannot Upvote Your Own Answer'
          }
        }
        else if(data.upvotes.indexOf(req.loggedUser._id) == -1){
          upArr.push(req.loggedUser._id)
          let index = data.downvotes.indexOf(req.loggedUser._id)
          if(index != -1){
              downArr.splice(index, 1)
          }
        }
        else{
          let index = data.upvotes.indexOf(req.loggedUser._id)
          upArr.splice(index, 1)
        }
        return Answer.findByIdAndUpdate({_id:id}, {
          upvotes: upArr,
          downvotes: downArr
        },
        { 
          new: true
        })
      })
      .then(data => {
        res.status(200).json(data)
      })
      .catch(next)
  }
  static downVote(req, res, next){
    let {id} = req.params
    Answer.findOne({_id:id})
      .then(data => {
        let upArr = data.upvotes
        let downArr = data.downvotes
        if(data.userId == req.loggedUser._id){
          throw {
            status: 401,
            message: 'Cannot Downvote Your Own Answer'
          }
        }
        else if(data.downvotes.indexOf(req.loggedUser._id) == -1){
          downArr.push(req.loggedUser._id)
          let index = data.upvotes.indexOf(req.loggedUser._id)
          if(index != -1){
              upArr.splice(index, 1)
          }
        }
        else{
          let index = data.downvotes.indexOf(req.loggedUser._id)
          downArr.splice(index, 1)
        }
        return Answer.findByIdAndUpdate({_id:id}, {
          upvotes: upArr,
          downvotes: downArr
        },
        { 
          new: true
        })
      })
      .then(data => {
        res.status(200).json(data)
      })
      .catch(next)
  }
  static update(req, res, next){
    let {description} = req.body
    let {id} = req.params
    Answer.findByIdAndUpdate({_id:id}, { description },
      { 
        new: true,
        runValidators: true
      }
    )
      .then(data => {
        res.status(200).json(data)
      })
      .catch(next)
  }
}

module.exports = AnswerController