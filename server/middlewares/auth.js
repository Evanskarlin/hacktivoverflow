const {verifyToken} = require('../helpers/jwt')
const User = require('../models/user')
const Question = require('../models/question')
const Answer = require('../models/answer')

function authentication(req, res, next){
    try {
      let decodedToken = verifyToken(req.headers.token)
      User.findById(decodedToken._id)
        .then(user => {
          if(user){
            req.loggedUser = decodedToken
            next()
          }
          else{
            next({
              status: 401,
              message: 'Authentication Failed'
          })
          }
        })
        .catch(next)
    }
    catch(err) {
      next({ 
        status: 401,
        message: err 
      })
    }
}

function authorizationQuestion(req, res, next){
  Question.findById(req.params.id)
    .then(question => {
      if(!question){
        next({ status: 404, message: 'Not Found' })
      }
      else if(question.userId == req.loggedUser._id){
        next()
      }
      else{
        next({ 
          status: 403, 
          message: 'Not Authorized' 
        })
      }
    })
    .catch(next)
}

function authorizationAnswer(req, res, next){
  Answer.findById(req.params.id)
    .then(answer => {
      if(!answer){
        next({ status: 404, message: 'Not Found' })
      }
      else if(answer.userId == req.loggedUser._id){
        next()
      }
      else{
        next({ 
          status: 403, 
          message: 'Not Authorized' 
        })
      }
    })
    .catch(next)
}

module.exports = {authentication, authorizationQuestion, authorizationAnswer} 