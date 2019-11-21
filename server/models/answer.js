const mongoose = require('mongoose')

let Schema = mongoose.Schema

let answerSchema = new Schema({
    description: {
      type:String,
      required: [true, 'Description is Required']
    },
    userId: {
      type: Schema.Types.ObjectId, 
      ref: "User"
    },
    upvotes: [{
      type: Schema.Types.ObjectId, 
      ref: "User", default:[]
    }],
    downvotes: [{
      type: Schema.Types.ObjectId, 
      ref: "User", default:[]
    }]
},
{
  timestamps:true, 
  versionKey: false
})

let Answer = mongoose.model('Answer',answerSchema)

module.exports = Answer