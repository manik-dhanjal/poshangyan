require("dotenv").config();
var AWS = require("aws-sdk");
const Post = require('../schema/postSchema')
const uuidv4 = require('uuid').v4;

let s3bucket = new AWS.S3({
  accessKeyId: process.env.PG_AWS_ACCESS_KEY_ID,
  secretAccessKey: process.env.PG_AWS_SECRET_ACCESS_KEY,
  region: process.env.PG_AWS_REGION
});

const mimetype = (key) => {
  const extention = key.substr(key.lastIndexOf('.')+1,key.length)
  const formats ={
    video:[ 'WEBM','MPG','MP2','MPEG','MPE','MPV','OGG','MP4','M4P','M4V','AVI','WMV','MOV','QT','FLV','SWF','AVCHD','x-icon' ],
    image: ['jpg', 'jpeg', 'jpe', 'jif', 'jfif', 'jfi','png', 'webp', 'tiff', 'tif', 'psd', 'raw','arw','cr2', 'nrw', 'k25','bmp', 'dib','heif', 'heic','ind', 'indd', 'indt','jp2', 'j2k', 'jpf', 'jpx', 'jpm', 'mj2','svg', 'svgz','ai','eps'],
    pdf: ['pdf','pptx'],
    gif: ['gif'],
    audio: ['WAV','AIFF','MP3','AAC','OGG','WMA','FLAC','ALAC','3gp','aa','dvf','m4a','m4p','mpc','msv','webm']
  }
  
  const videoFormat = Object.keys(formats).reduce((objResult,formatKey)=>{
    return objResult==='others'?formats[formatKey].reduce((result,item) =>{ return (item.toLowerCase() === extention.toLowerCase()&&result==='others')?formatKey:result },'others'):objResult;
  },'others')
  return videoFormat;
}

exports.uploadFile = async (req, res) => { 
  const file = req.file;
  const uuid = uuidv4();
  const fileType = file.originalname.substr(file.originalname.lastIndexOf('.'),file.originalname.length)
  var params = {
    Bucket: process.env.PG_AWS_BUCKET_NAME,
    Key: `${uuid+fileType}`,
    Body: file.buffer,
    ContentType: file.mimetype,
    ACL: "public-read"
  };
  s3bucket.upload(params, function(err, data) {
    if (err) {
      res.status(500).json({ error: true, Message: err });
    } else {
      console.log(data)
      const fileName = data.Key.substr(0,data.Key.lastIndexOf('.')) 
                          
      res.status(200).json({
        key: data.Key,
        location:data.Location,
        name:fileName,
        mimetype:mimetype(data.Key)
     });
    }
  });
  }

  exports.deleteFile = async (req,res) => {
    const key = req.params.key;
    var params = {
      Bucket: process.env.PG_AWS_BUCKET_NAME,
      Key: key
      };
    s3bucket.deleteObject(params, function (err, data) {
      if (!err) {
        res.status(200).send(data)
      }
      else {
        res.statue(500).send({
          error:err.message,
        })
        console.log("Check if you have sufficient permissions : "+err);
      }
      });
  }

  
exports.addDownloadCount = async (req, res) => {
  const {_id,key} = req.body
  // console.log(req.body)
  try{
    const s3 = new AWS.S3({
      accessKeyId: process.env.PG_AWS_ACCESS_KEY_ID,
      secretAccessKey: process.env.PG_AWS_SECRET_ACCESS_KEY,
      region: process.env.PG_AWS_REGION,
      signatureVersion: 'v4',
    });
    let url = await s3.getSignedUrl('getObject', {
      Bucket: process.env.PG_AWS_BUCKET_NAME , 
      Key: key,
      Expires: 300,
      ResponseContentDisposition :  `attachment; filename=${key}`
    })
    const post =await Post.findById(_id);
    post.totalDownloads = post.totalDownloads+1
    post.files = post.files.map((file)=>{
          if(file.key===key)
              file.downloadsCount=file.downloadsCount+1;
          return file
        })
    await post.save();
    res.status(200).send(url);
  }
  catch(error){
    console.error(error)
    res.send({error:'Something Went Wrong!!'})
  }
}