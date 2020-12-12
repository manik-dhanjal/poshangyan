
// downloadsCount 
// viewsCount
const { update } = require('../schema/postSchema');
const Post = require('../schema/postSchema')
exports.getFilteredInfo = (req, res) => {

  // var arr = [1, 2, 3, 4, 5, 6, 7, 8, 9, 0];
  // var removed = arr.splice(2,1); //removes one element starting from 2
  // themes: this.state.themes.toString(),
  // languages: this.state.languages.toString(),
  // label: this.state.label.toString(),
  // source: this.state.source.toString(),
  // mediaType: this.state.mediaType.toString(),
  // dataAddedBy: this.state.name.toString(),
  // targetAudience: this.state.targetAudience.toString(),

  console.log(req.body)
  let filter = {};
  if(req.body.themes && !(req.body.themes.toLowerCase().includes('any')||(req.body.themes.toLowerCase().includes('all')&&!req.body.themes.toLowerCase().includes('overall'))||req.body.themes=='')){
    filter.themes = req.body.themes;
  }
  if(req.body.languages && !(req.body.languages.toLowerCase().includes('any')||req.body.languages.toLowerCase().includes('all')||req.body.languages=='')){
    filter.languages = req.body.languages;
  }
  if(req.body.targetAudience && !(req.body.targetAudience.toLowerCase().includes('any')||req.body.targetAudience.toLowerCase().includes('all')||req.body.targetAudience=='')){
    filter.targetAudience = req.body.targetAudience;
  }
  if(req.body.source && !(req.body.source.toLowerCase().includes('any')||req.body.source.toLowerCase().includes('all')||req.body.source=='')){
    filter.source = req.body.source;
  }
  if(req.body.mediaType && !(req.body.mediaType.toLowerCase().includes('any')||req.body.mediaType.toLowerCase().includes('all')||req.body.mediaType=='')){
    filter.mediaType = req.body.mediaType;
  }
  // console.log(req.body)
  // res.send({Yup:'Yup'})
  Post.find()
    .sort({ downloadsCount: -1 })
    // .orderBy('viewsCount','desc')
    .then(dat=>{
      let posts=[];
      dat.forEach((doc)=> { 
        // posts.push(doc); 
        let currPost = doc;
        var f=1;

        if(filter.themes){
          let filt = filter.themes.split(',');
          var c=0;
          for(var i=0;i<filt.length;i++)
          {
            if(currPost.themes.toLowerCase().includes(filt[i].toLowerCase())) c=1;
          }
          if(c==1) ;
          else f=0;
        }
        if(filter.source){
          let filt = filter.source.split(',');
          var c=0;
          for(var i=0;i<filt.length;i++)
          {
            if(currPost.source.toLowerCase().includes(filt[i].toLowerCase())) c=1;
          }
          if(c==1) ;
          else f=0;
        }
        if(filter.mediaType){
          let filt = filter.mediaType.split(',');
          var c=0;
          for(var i=0;i<filt.length;i++)
          {
            if(currPost.mediaType.toLowerCase().includes(filt[i].toLowerCase())) c=1;
          }
          if(c==1) ;
          else f=0;
        }
        if(filter.languages){
          let filt = filter.languages.split(',');
          var c=0;
          for(var i=0;i<filt.length;i++)
          {
            if(currPost.languages.toLowerCase().includes(filt[i].toLowerCase())) c=1;
          }
          if(c==1) ;
          else f=0;
        }
        if(filter.targetAudience){
          let filt = filter.targetAudience.split(',');
          var c=0;
          for(var i=0;i<filt.length;i++)
          {
            if(currPost.targetAudience.toLowerCase().includes(filt[i].toLowerCase())) c=1;
          }
          if(c==1) ;
          else f=0;
        }

        if(f==1) posts.push(currPost)

      });
      return res.json(posts);
    })
    .catch(err => {
      console.error(err)
      res.send({err:'Something Went Wrong!!'})
    });

}
exports.getThemeoftheMonth = (req, res) => {
  Post.find()
    .sort({ downloadsCount: -1 })
    // .orderBy('viewsCount','desc')
    .then(dat=>{
      let posts=[];
      dat.forEach(function(doc) { 
        if(doc.mimetype.includes('image')) posts.push(doc); 
      });
      return res.json(posts);
    })
    .catch(err => {
      console.error(err)
      res.send({err:'Something Went Wrong!!'})
    });
}
exports.getPolularVideos = (req, res) => {
  Post.find()
    .sort({ downloadsCount: -1 })
    .then(dat=>{
      let posts=[];
      dat.forEach((doc)=> { 
        if(doc.mimetype.includes('video'))  posts.push(doc); 
      });
      return res.json(posts);
    })
    .catch(err => {
      console.error(err)
      res.send({err:'Something Went Wrong!!'})
    });
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

exports.addDownloadCount = (req, res) => {
  let currpost=[];
  console.log(req.body)
   Post.findById(req.body._id)
    .then((pos)=>{
      pos.downloadsCount = pos.downloadsCount + 1;
      currpos = pos;
      console.log(pos)
      return pos.save();
    })
    .then(()=>{
      res.status(200).send({message:'Success'})
    })
    .catch((err)=>{
      console.error(err)
      res.send({err:'Something Went Wrong!!'})
    })
}

exports.addDownloadCount = (req, res) => {
  let currpost=[];
  console.log(req.body)
   Post.findById(req.body._id)
    .then((pos)=>{
      pos.downloadsCount = pos.downloadsCount + 1;
      currpos = pos;
      console.log(pos)
      return pos.save();
    })
    .then(()=>{
      res.status(200).send({message:'Success'})
    })
    .catch((err)=>{
      console.error(err)
      res.send({err:'Something Went Wrong!!'})
    })
}
exports.addDownl = (req, res) => {
  let currpost=[];
  console.log(req.body)
   Post.findById("5fbd3f1f5296ae2e50fdaaf2")
    .then((pos)=>{
      pos.themes = "Complementary Feeding";
      currpos = pos;
      console.log(pos)
      return pos.save();
    })
    .then(()=>{
      res.status(200).send({message:'Success'})
    })
    .catch((err)=>{
      console.error(err)
      res.send({err:'Something Went Wrong!!'})
    })
}
// exports.update = (req, res) => {
//   Post.find()
//     .sort({ downloadsCount: -1 })
//     // .orderBy('viewsCount','desc')
//     .limit(100)
//     .then(dat=>{
//       let posts=[];
//       dat.forEach(function(doc) { 
//         // if(doc.mimetype.includes('image')) posts.push(doc); 
//         let ID=  doc.showFileName.toLowerCase().split(' ').join("-");
//         posts.push(ID);
//         upda(doc,ID);
//       });
//       return res.send(posts);
//     })
//     .catch(err => {
//       console.error(err)
//       res.send({err:'Something Went Wrong!!'})
//     });
// }

// function upda(doc,ID)  {
//   Post.findById(doc._id)
//   .then((pos)=>{
//     pos.postId = ID;
//     console.log(pos)
//     pos.save();
//   })
// }