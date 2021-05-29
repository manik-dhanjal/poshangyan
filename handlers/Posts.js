const { CompositionSettingsList } = require('twilio/lib/rest/video/v1/compositionSettings');
const Post = require('../schema/postSchema')

function string_to_slug (str) {
  str = str.replace(/^\s+|\s+$/g, ''); // trim
  str = str.toLowerCase();

  // remove accents, swap ñ for n, etc
  var from = "àáäâèéëêìíïîòóöôùúüûñç·/_,:;";
  var to   = "aaaaeeeeiiiioooouuuunc------";
  for (var i=0, l=from.length ; i<l ; i++) {
      str = str.replace(new RegExp(from.charAt(i), 'g'), to.charAt(i));
  }

  str = str.replace(/[^a-z0-9 -]/g, '') // remove invalid chars
      .replace(/\s+/g, '-') // collapse whitespace and replace by -
      .replace(/-+/g, '-'); // collapse dashes

  return str;
}

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
  // console.log(post)
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

  exports.addPost = async (req,res) => {
    console.log(req.body)
      const {postData} = req.body
      const newPostData = {
        ...postData,
        postId:string_to_slug(postData.label),
        downloadCount:0,
        dataAddedBy:'Admin'
      };
      console.log(newPostData)
      const post = new Post(newPostData)
      try{
        await post.save();
        res.status(200).send(newPostData)
      }
      catch(error){
        console.log(error)
        res.status(500).json({message:error.message})
      }

  }
  const mimetypeFinder = (key) => {
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

const ObjCreator = (key,location,item) =>{
  console.log(item,'item=====')
  return  [{
    name:key.substr(0,key.lastIndexOf('.')),
    key: key,
    location:location,
    fileType:location.substr(location.lastIndexOf('.')+1,location.length), 
    mimetype:mimetypeFinder(key),
    downloadsCount:item.downloadsCount
}]
}

  exports.script = async (req,res)=>{
    try{
      const allOldPost = await Post.find();

      await allOldPost.map(data => {
        const item = data._doc;
        const  images = (!item.images.length?(item.thumbKey? ObjCreator(item.thumbKey,item.thumbLocation,'image/jpg'):ObjCreator(item.Key,item.Location,item.mimetype)):item.images)
        data._doc={
          ...data,
          _id:data._id,
          _doc:{
            _id:data._id,
            label:item.label,
            themes:item.themes,
            languages:item.languages,
            dataAddedBy:item.dataAddedBy,
            createdAt:item.createdAt,
            source:item.source,
            targetAudience:item.targetAudience,
            link:'',
            postId:string_to_slug(item.label),
            images:images,
            files:!item.link?(item.Key?ObjCreator(item.Key,item.Location,item):item.files):[]
        }
      }
        data.save()
    })
    res.send(allOldPost);
    }
   catch(e){
     console.log(e)
     res.send(e.message)
   }
    // await allUpldatedPost.save()

}