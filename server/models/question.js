const mongoose = require('mongoose')

let Schema = mongoose.Schema

let questionSchema = new Schema({
    title: {
      type:String,
      required: [true, 'Title is Required']
    },
    description: {
      type:String,
      required: [true, 'Description is Required']
    },
    tags: {
      type : Array,
      validate: {
        validator: function(v) {
          if(v.length > 0){
            return true
          }
          else{
            return false
          }
        },
        message: props => `Tags is required`
      }
    },
    userId: {
      type: Schema.Types.ObjectId,
      ref: "User"
    },
    answersId: [{
      type: Schema.Types.ObjectId, 
      ref: "Answer", 
      default:[]
    }],
    upvotes: {
      type: [Schema.Types.ObjectId], 
      ref: "User", 
      default:[]
    },
    downvotes: [{
      type: Schema.Types.ObjectId, 
      ref: "User", 
      default:[]
    }],
    views: [{
      type: Schema.Types.ObjectId, 
      ref: "User", 
      default:[]
    }]
}, 
{
  timestamps:true, 
  versionKey: false
})

let Question = mongoose.model('Question',questionSchema)

module.exports = Question
