
const { update } = require('../schema/postSchema');
const Post = require('../schema/postSchema')
const userAnalyticsModel = require('../schema/userAnalytics.schema')
exports.getFilteredInfo = (req, res) => {

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
  if(req.body.mimetype && !(req.body.mimetype.toLowerCase().includes('any')||req.body.mimetype.toLowerCase().includes('all')||req.body.mimetype=='')){
    filter.mimetype = req.body.mimetype;
  }

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
        if(filter.mimetype){
          let filt = filter.mimetype.split(',');
          var c=0;
          for(var i=0;i<filt.length;i++)
          { 
          
            currPost.files.forEach((file)=>{
              if(file._doc.mimetype === filt[i].toLowerCase()) c=1;
            })
            if(filt[i].toLowerCase().includes('other')&&currPost.link) c=1;
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
exports.setThemeOfTheMonth = (req,res) =>{
  if(req.body.theme) process.env.themeofmonth = req.body.theme;
  if(req.body.quote) process.env.quote = req.body.quote;

  res.send( {
      theme:process.env.themeofmonth,
      quote:process.env.quote})
 }
exports.getThemeoftheMonth = async (req, res) => {
  try{
    const data = await Post.find({ themes: new RegExp(process.env.themeofmonth) });
    res.send({
      post:data,
      theme:process.env.themeofmonth,
      quote:process.env.quote
    })
  }
  catch(e){
    console.log(e)
    res.send({
      post:[],
      theme:process.env.themeofmonth,
      quote:process.env.quote
    })
  }
}
exports.getMostDownloaded =async (req, res) => {
  try{
    const posts =await Post.find({link: { $ne: '' }})
    const countOf = (item) => item.files.length?item.files.reduce((total,file) => {return total+file.downloadsCount},0):0;
    const sortedPost = posts.sort((a,b)=> {
          return countOf(b)-countOf(a)
      } ).slice(0,12)
    res.json(sortedPost)
  }
  catch(errir){
          console.error(err)
        res.send({err:'Something Went Wrong!!'})
  }
}

exports.getVisitorAnalytics = async (req,res) => {
  try{
      var uniqueId = req.body.userID;
      const existingUser = await userAnalyticsModel.findById(uniqueId)
      if(existingUser||uniqueId){
        existingUser.visits = existingUser.visits+1;
        await existingUser.save();
      }
      else{
        const userAnalytics = new userAnalyticsModel({
          visits:1
        })
        await userAnalytics.save();
        uniqueId = userAnalytics._id;
      }
      const uniqueUsersNum = await userAnalyticsModel.find();

      res.send({
        userID:uniqueId,
        uniquieVisits:uniqueUsersNum.length+3503
      })
  }
  catch(err){
    console.log(err,'while adding user analytics');
    res.status(500).send(err)
  }
}



