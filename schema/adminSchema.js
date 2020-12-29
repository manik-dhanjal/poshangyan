const mongoose = require('mongoose')
const Schema = mongoose.Schema
const AdminSchema = new Schema({
    username:{
        type:String,
        required:'username is required',
        unique:true
    },
    password:{
        type:String,
        required:'password is required'
    },
    uuid:{
        type:String
    }
  },
{timestamps: true}
)

module.exports = mongoose.model('adminschema', AdminSchema)

