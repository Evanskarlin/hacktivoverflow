const Question = require('../models/question')

class QuestionController {
    static create(req, res, next){
      let {title, description, tags} = req.body
      Question.create({
        title,
        description,
        tags,
        userId: req.loggedUser._id
      })
        .then(data => {
          res.status(201).json(data)
        })
        .catch(next)
    }
    static readAll(req, res, next){
      let condition = {}
      if(req.query.title || req.query.tag){
        condition = {
            $and:[]
        }
        if(req.query.title){
            condition.$and.push({'title': new RegExp(`${req.query.title}`, 'gi')})
        }
        if(req.query.tag){
            condition.$and.push({'tags': new RegExp(`${req.query.tag}`, 'gi')})
        }
      }
      Question.find(condition)
        .populate('userId')
        .populate('answersId')
        .then(data => {
          res.status(200).json(data)
        })
        .catch(next)
    }
    static upVote(req, res, next){
      let {id} = req.params
      Question.findOne({_id:id})
        .then(data => {
          let downArr = data.downvotes
          let upArr = data.upvotes
          if(data.userId == req.loggedUser._id){
            throw {
              status: 401,
              message: 'Cannot Upvote Your Own Question'
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
          return Question.findByIdAndUpdate({_id:id}, {
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
      Question.findOne({_id:id})
        .then(data => {
          let upArr = data.upvotes
          let downArr = data.downvotes
          if(data.userId == req.loggedUser._id){
            throw {
              status: 401,
              message: 'Cannot Downvote Your Own Question'
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
          return Question.findByIdAndUpdate({_id:id}, {
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
    static view(req, res, next){
      let {id} = req.params
      Question.findOne({_id:id})
        .then(data => {
          let index = data.views.indexOf(req.loggedUser._id)
          if(index == -1 && data.userId != req.loggedUser._id){
            let viewArr = data.views
            viewArr.push(req.loggedUser._id)
            return Question.findByIdAndUpdate({_id:id}, {
                views: viewArr
            },
            { 
              new: true
            })
          }
          else{
            res.status(200).json({views:"not add"})
          }
        })
        .then(data => {
          res.status(200).json(data)
        })
        .catch(next)
    }
    static readByUserId(req, res, next){
      let {_id} = req.loggedUser
      Question.find({userId:_id})
        .populate('userId')
        .then(data => {
          if (data) {
            res.status(200).json(data)
          }
          else {
            next({status: 404, message:"Question not Found"})
          }
        })
        .catch(next)
    }
    static readById(req, res, next){
      let {id} = req.params
      Question.findById(id)
        .populate('userId')
        .populate({
          path: 'answersId',
          model: 'Answer',
          populate: {
            path: 'userId',
            model: 'User'
          }
        })
        .then(data => {
          if (data) {
            res.status(200).json(data)
          }
          else{
            next({status: 404, message:"Question not Found"})
          }
        })
        .catch(next)
    }
    static update(req, res, next){
      let {title, description, tags} = req.body
      let {id} = req.params
      Question.findOneAndUpdate({_id:id},
        {
          title,
          description,
          tags
        }, 
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
    static delete(req, res, next){
      let {id} = req.params
      Question.findByIdAndDelete({_id:id})
        .then(data => {
          res.status(200).json(data)
        })
        .catch(next)
    }
}

module.exports = QuestionController