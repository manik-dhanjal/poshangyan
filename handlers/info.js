
const { update } = require('../schema/postSchema');
const Post = require('../schema/postSchema')
const userAnalyticsModel = require('../schema/userAnalytics.schema')


exports.getFilteredInfoV2 = async (req,res) => {

  let filter = {};
  if(req.body.filter){
    if(req.body.filter.themes && !(req.body.filter.themes.toLowerCase().includes('any')||(req.body.filter.themes.toLowerCase().includes('all')&&!req.body.filter.themes.toLowerCase().includes('overall'))||req.body.filter.themes=='')){
      let themeRegex = new RegExp(req.body.filter.themes.split(",").join('|'));
      filter.themes = {
        "$regex": themeRegex,
        "$options":"i"
      }
    }
    if(req.body.filter.languages && !(req.body.filter.languages.toLowerCase().includes('any')||req.body.filter.languages.toLowerCase().includes('all')||req.body.filter.languages=='')){
      let languageRegex = new RegExp(req.body.filter.languages.split(",").join('|'));
      filter.languages = {
        "$regex": languageRegex,
        "$options":"i"
      }
    }
    if(req.body.filter.targetAudience && !(req.body.filter.targetAudience.toLowerCase().includes('any')||req.body.filter.targetAudience.toLowerCase().includes('all')||req.body.filter.targetAudience=='')){
      let targetAudienceRegex = new RegExp(req.body.filter.targetAudience.split(",").join('|'));
      filter.targetAudience = {
        "$regex": targetAudienceRegex,
        "$options":"i"
      }
    }
    if(req.body.filter.source && !(req.body.filter.source.toLowerCase().includes('any')||req.body.filter.source.toLowerCase().includes('all')||req.body.filter.source=='')){
      let sourceRegex = new RegExp(req.body.filter.source.split(",").join('|'));
      filter.source = {
        "$regex": sourceRegex,
        "$options":"i"
      }
    }
    if(req.body.filter.mediaType && !(req.body.filter.mediaType.toLowerCase().includes('any')||req.body.filter.mediaType.toLowerCase().includes('all')||req.body.filter.mediaType=='')){
      let mediaTypeRegex = new RegExp(req.body.filter.mediaType.split(",").join('|'));
      filter.mediaType = {
        "$regex": mediaTypeRegex,
        "$options":"i"
      }
    }
    if(req.body.filter.mimetype && !(req.body.filter.mimetype.toLowerCase().includes('any')||req.body.filter.mimetype.toLowerCase().includes('all')||req.body.filter.mimetype=='')){
      let mimetypeRegex = new RegExp(req.body.filter.mimetype.split(",").join('|'));
      filter["files"] = {
        $elemMatch:{
          mimetype:{
            $regex: mimetypeRegex,
            $options:"i"
          }
        }
      }
    }
  }
  
  let sort = {'totalDownloads':-1}
  if(req.body.sort==="date"){
    sort = {'createdAt':-1}
  }
  let currentPage = 1;
  if(req.body.page) currentPage = req.body.page;

  let postCount = 12;
  // if(req.body.postCount) postCount = req.body.postCount;
  try{
    const numberOfPost = await Post.find(filter).countDocuments();

    const totalPages =  Math.floor(numberOfPost/postCount)+(numberOfPost%postCount?1:0);
    if(totalPages<currentPage) throw new Error("Page Not Found");

    const response = await Post.find(filter).sort(sort).skip((currentPage-1)*postCount).limit(postCount);

    res.send({
      totalPost:numberOfPost,
      currentPage:currentPage,
      totalPage:totalPages,
      post:response,
    })
    
  }
  catch(error){
    res.status(500).json({
      message:error.message
    })
  }


}
// exports.getFilteredInfo = (req, res) => {

//   let filter = {};

//   if(req.body.themes && !(req.body.themes.toLowerCase().includes('any')||(req.body.themes.toLowerCase().includes('all')&&!req.body.themes.toLowerCase().includes('overall'))||req.body.themes=='')){
//     filter.themes = req.body.themes;
//   }
//   if(req.body.languages && !(req.body.languages.toLowerCase().includes('any')||req.body.languages.toLowerCase().includes('all')||req.body.languages=='')){
//     filter.languages = req.body.languages;
//   }
//   if(req.body.targetAudience && !(req.body.targetAudience.toLowerCase().includes('any')||req.body.targetAudience.toLowerCase().includes('all')||req.body.targetAudience=='')){
//     filter.targetAudience = req.body.targetAudience;
//   }
//   if(req.body.source && !(req.body.source.toLowerCase().includes('any')||req.body.source.toLowerCase().includes('all')||req.body.source=='')){
//     filter.source = req.body.source;
//   }
//   if(req.body.mediaType && !(req.body.mediaType.toLowerCase().includes('any')||req.body.mediaType.toLowerCase().includes('all')||req.body.mediaType=='')){
//     filter.mediaType = req.body.mediaType;
//   }
//   if(req.body.mimetype && !(req.body.mimetype.toLowerCase().includes('any')||req.body.mimetype.toLowerCase().includes('all')||req.body.mimetype=='')){
//     filter.mimetype = req.body.mimetype;
//   }

//   Post.find({languages:"Hindi"}).sort('createdAt').limit(12)
  
//     // .sort({ downloadsCount: -1 })
//     // .limit(1000)
//     // .orderBy('viewsCount','desc')
//     .then(dat=>{
//     //   let posts=[];
//     //   console.time("answer time");
//     //   dat.forEach((doc)=> { 
//     //     // posts.push(doc); 
       
//     //     let currPost = doc;
//     //     var f=1;

//     //     if(filter.themes){
//     //       let filt = filter.themes.split(',');
//     //       var c=0;
//     //       for(var i=0;i<filt.length;i++)
//     //       {
//     //         if(currPost.themes.toLowerCase().includes(filt[i].toLowerCase())) c=1;
//     //       }
//     //       if(c==1) ;
//     //       else f=0;
//     //     }
//     //     if(filter.source){
//     //       let filt = filter.source.split(',');
//     //       var c=0;
//     //       for(var i=0;i<filt.length;i++)
//     //       {
//     //         if(currPost.source.toLowerCase().includes(filt[i].toLowerCase())) c=1;
//     //       }
//     //       if(c==1) ;
//     //       else f=0;
//     //     }
//     //     if(filter.mediaType){
//     //       let filt = filter.mediaType.split(',');
//     //       var c=0;
//     //       for(var i=0;i<filt.length;i++)
//     //       {
//     //         if(currPost.mediaType.toLowerCase().includes(filt[i].toLowerCase())) c=1;
//     //       }
//     //       if(c==1) ;
//     //       else f=0;
//     //     }
//     //     if(filter.languages){
//     //       let filt = filter.languages.split(',');
//     //       var c=0;
//     //       for(var i=0;i<filt.length;i++)
//     //       {
//     //         if(currPost.languages.toLowerCase().includes(filt[i].toLowerCase())) c=1;
//     //       }
//     //       if(c==1) ;
//     //       else f=0;
//     //     }
//     //     if(filter.targetAudience){
//     //       let filt = filter.targetAudience.split(',');
//     //       var c=0;
//     //       for(var i=0;i<filt.length;i++)
//     //       {
//     //         if(currPost.targetAudience.toLowerCase().includes(filt[i].toLowerCase())) c=1;
//     //       }
//     //       if(c==1) ;
//     //       else f=0;
//     //     }
//     //     if(filter.mimetype){
//     //       let filt = filter.mimetype.split(',');
//     //       var c=0;
//     //       for(var i=0;i<filt.length;i++)
//     //       { 
          
//     //         currPost.files.forEach((file)=>{
//     //           if(file._doc.mimetype === filt[i].toLowerCase()) c=1;
//     //         })
//     //         if(filt[i].toLowerCase().includes('other')&&currPost.link) c=1;
//     //       }
  
//     //       if(c==1) ;
//     //       else f=0;
//     //     }

//     //     if(f==1) posts.push(currPost)

//     //   });
//     //   console.timeEnd("answer time");
//       return res.json(dat);
//     })
//     .catch(err => {
//       console.error(err)
//       res.send({err:'Something Went Wrong!!'})
//     });

// }
exports.setThemeOfTheMonth = (req,res) =>{
  if(req.body.theme) process.env.themeofmonth = req.body.theme;
  if(req.body.quote) process.env.quote = req.body.quote;

  res.send( {
      theme:process.env.themeofmonth,
      quote:process.env.quote})
 }
exports.getThemeoftheMonth = async (req, res) => {
  try{
    const data = await Post.find({ themes: new RegExp(process.env.themeofmonth) }).limit(4);
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
    const posts =await Post.find({link: { $ne: '' }}).sort({totalDownloads:-1}).limit(12)
    // const countOf = (item) => item.files.length?item.files.reduce((total,file) => {return total+file.downloadsCount},0):0;
    // const sortedPost = posts.sort((a,b)=> {
    //       return countOf(b)-countOf(a)
    //   } ).slice(0,12)
    res.json(posts)
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



