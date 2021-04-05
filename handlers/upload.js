const {
  BUCKET_NAME,
  IAM_USER_KEY,
  IAM_USER_SECRET
} = require('../Private/keys');
// const AWS = require('aws-sdk');
// const uuid = require('uuid')
// const s3 = new AWS.S3({
//   accessKeyId: IAM_USER_KEY,
//   secretAccessKey: IAM_USER_SECRET,
//   Bucket: BUCKET_NAME
// })

// function streamToString(stream, cb) {
//   const chunks = [];
//   stream.on('data', (chunk) => {
//     chunks.push(chunk.toString());
//   });
//   stream.on('end', () => {
//     cb(chunks.join(''));
//   });
// }
const Post = require('../schema/postSchema')
exports.uploadFile = (req, res) => { 

  console.log(req.body)

  // res.send({received:req.body})

  const post = new Post(req.body)
    post.save().then(pos=>{
      console.log(pos)
      res.status(200).send({received:pos})
    })
    .catch(err => {
      console.log(err)
      res.status(503).send({error:'Something went wrong!!'})
  })

  }

  // function upload(newPosts, res) {
  //   db.doc(`uploads/${uuid.v4()}`).set(newPosts)
  //     .then(doc => {
  //       return res.status(200).send(newPosts)
  //     })
  //     .catch(err => {
  //       console.log(err)
  //       return res.status(500).send({
  //         message: "Failed to update firebase"
  //       });
  //     })
  // }