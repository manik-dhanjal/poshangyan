const mongoose = require('mongoose')
const Schema = mongoose.Schema
const SortingDataSchema = new Schema({
    themes:{
        type: Array,
        required: 'themes is required'
    },
    languages:{
        type: Array,
        required: 'languages is required'
    },
    mediaType:{
        type: Array,
        required: 'mediaType is required'
    },
    mimetype:{
        type: Array,
        required: 'mimetype is required'
    },
    targetAudience:{
        type: Array,
        required: 'targetAudience is required'
    },
    sources:{
        type: Array,
        required: 'targetAudience is required'
    },
  },
{timestamps: true}
)

module.exports = mongoose.model('sortingdata', SortingDataSchema)

