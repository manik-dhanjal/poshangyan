const mongoose = require('mongoose')
const Schema = mongoose.Schema
const PostSchema = new Schema({
  dataAddedBy: {
    type: String,
    required: 'Name is required'
  },
  label: {
    type: String,
    required: 'label is required'
  },
  source: {
    type: String,
    required: 'source is required'
  },
  languages: {
    type: String,
    required: 'languages is required'
  },
  targetAudience: {
    type: String,
    required: 'targetAudience is required'
  },
  themes: {
    type: String,
    required: 'themes is required'
  },
  postId: {
    type: String,
    required: 'postId is required',
    unique:true
  },
  totalDownloads:{
    type:Number,
    default:0
  },
  images:[{
    name:String,
    location:String,
    fileType:String,
    key:String,
    mimetype:{
      type:String,
      default:'others'
    },
  }],
  files:[{
    name:String,
    location:String,
    fileType:String,
    key:String,
    mimetype:{
      type:String,
      default:'others'
    },
    downloadsCount:{
      type: Number,
      default:0,
      index: true
    }
  }],
  link:String,
  createdAt:{
    type: Date,
    default: Date.now
  },
  },
{timestamps: true}
)

module.exports = mongoose.model('post', PostSchema)


