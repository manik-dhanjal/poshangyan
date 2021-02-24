const Post = require('../schema/postSchema')

exports.getPostInfo = (req,res) =>{
    Post.find()
      .sort({ downloadsCount: -1 })
      .then(dat=>{
        let posts=[];
        dat.forEach((doc)=> { 
          if(doc.postId.includes(req.params.postID))  posts.push(doc); 
        });
        return res.json(posts);
      })
      .catch(err => {
        console.error(err)
        res.send({err:'Something Went Wrong!!'})
      });
  }

  exports.deletePost = (req,res) =>{
    Post.findByIdAndRemove(req.params.postID)
        .then(()=>{
            res.status(200).send({message:"Successful"})
        })
        .catch(err=>{
            res.status(500).send({message:"Something went wrong!!"})
        })
  }

  exports.updatePostInfo = (req,res) =>{
  let post=req.body;
  console.log(post)
  res.send('send');
    Post.findByIdAndUpdate(post.id, {
      label:post.label
    }, 
                              function (err, docs) { 
      if (err){ 
          console.log(err) 
      } 
      else{ 
          console.log("Updated User : ", docs); 
      } 
    }); 
    Post.findById(req.params.postID)
      .then(dat=>{
        console.log(dat)
        if(dat){
            if(req.body.themes) dat.themes = req.body.themes;
            if(req.body.languages) dat.languages = req.body.languages;
            if(req.body.source) dat.source = req.body.source;
            if(req.body.mediaType) dat.mediaType = req.body.mediaType;
            if(req.body.targetAudience) dat.targetAudience = req.body.targetAudience;
            if(req.body.label) dat.label = req.body.label;
            if(req.body.mimetype) dat.mimetype = req.body.mimetype;
            post = dat;
        }
         return dat.save()
      })
      .then(()=>{
        res.send(post) 
      })
      .catch(err => {
        console.error(err)
        res.send({err:'Something Went Wrong!!'})
      });
  }