const mongoose = require('mongoose')
const Schema = mongoose.Schema
const PostSchema = new Schema({
  ETag: {
    type: String,
  },
  thumbETag: {
    type: String,
  },
  dataAddedBy: {
    type: String,
    required: 'Name is required'
  },
  Key: {
    type: String,
    required: 'Key is required'
  },
  label: {
    type: String,
    required: 'label is required'
  },
  mimetype: {
    type: String,
    required: 'mimetype is required'
  },
  thumbBucket: {
    type: String,
  },
  thumbLocation: {
    type: String,
  },
  Bucket: {
    type: String,
    required: 'Bucket is required'
  },
  thumbKey: {
    type: String,
  },
  Location: {
    type: String,
    required: 'Location is required'
  },
  source: {
    type: String,
    required: 'source is required'
  },
  languages: {
    type: String,
    required: 'languages is required'
  },
  showFileName: {
    type: String,
    required: 'showFileName is required'
  },

  targetAudience: {
    type: String,
    required: 'targetAudience is required'
  },
  mediaType: {
    type: String,
    required: 'mediaType is required'
  },
  themes: {
    type: String,
    required: 'themes is required'
  },
  thumbkey: {
    type: String,
  },
  postId: {
    type: String,
    required: 'postId is required'
  },
  thumbshowFileName: {
    type: String,
  },
  downloadsCount:{
    type: Number,
    default:0
  },
  createdAt:{
    type: Date,
    default: Date.now
  },

  },
{timestamps: true}
)

module.exports = mongoose.model('post', PostSchema)

// export default mongoose.model('video', VideoSchema)

