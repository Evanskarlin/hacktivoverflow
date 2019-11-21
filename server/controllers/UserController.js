const User = require('../models/user')
const {comparePassword} = require('../helpers/bcryptjs')
const {generateToken} = require('../helpers/jwt')

class UserController {
    static register (req,res,next) {
        const {username,password,email,tags} = req.body
        User.create({username,password,email,tags})
            .then(result => {
                let payload = {email:result.email, _id:result._id}
                let token = generateToken(payload)
                res.status(201).json({token,username,tags})
            })
            .catch(next)
    }

    static login (req,res,next) {
        const {email,password} = req.body
        User.findOne({email})
        .then(user=>{
            if(user) {
              if(comparePassword(password,user.password)){
                let payload = {email:user.email, _id:user._id}
                let token = generateToken(payload)
                res.status(200).json({token, username:user.username, tags:user.tags})
              }
              else{
                next({ status:400, message:'Wrong Password' })
              }
            } else {
              next({ status:404, message:'Email Not Found' })
            }
        })
        .catch(next)
    }

    static findUser (req,res,next) {
      let {_id} = req.loggedUser
      User.findById({_id})
        .then(data => {
          res.status(200).json(data)
        })
        .catch(next)
    }

    static updateTags (req,res,next) {
      let {tags} = req.body
      let {_id} = req.loggedUser
      User.findOneAndUpdate({_id},
        {
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
}

module.exports = UserController