const express = require('express'),
    app = express(),
    mongoose = require('mongoose');

const MONGODB_URI = "mongodb+srv://Anshaj:Anshaj123@poshangyan.w52ln.mongodb.net/poshangyan?retryWrites=true&w=majority"

var bodyParser = require('body-parser');
var multer = require('multer');
var upload = multer();

// for parsing application/json
app.use(bodyParser.json()); 

// for parsing application/xwww-
app.use(bodyParser.urlencoded({ extended: true })); 
//form-urlencoded

// for parsing multipart/form-data
// app.use(upload.array()); 
// app.use(express.static('public'));

app.use((req, res, next) => {
    res.setHeader('Access-Control-Allow-Origin', '*')
    res.setHeader('Access-Control-Allow-Methods', 'GET,POST,PUT,PATCH,DELETE')
    res.setHeader('Access-Control-Allow-Headers', 'Content-Type, Authorization')
    next()
}) 

// Way to use multer for "file" field in formdata
app.get('/', upload.single('file'), (req, res) => {
    console.log(req.body)
    console.log(req.params)
    console.log(req.file)
    return res.status(200).send({
        message: "All Ok"
    })
})
const { 
    getFilteredInfo,getThemeoftheMonth,getPolularVideos,addDownloadCount ,
    //  update 
    getPostInfo
    } 
     = require('./postHandlers/info');
const {uploadFile} = require('./postHandlers/upload')
app.post('/upload', uploadFile)
app.post('/getFilteredInfo', getFilteredInfo)
// app.post('/getFilteredInfo', getFilteredInfo)
app.get('/posts/:postID', getPostInfo)
app.get('/getPopolarVideos', getPolularVideos)
app.get('/getThemesOfTheMonth', getThemeoftheMonth)
app.post('/addDownload',addDownloadCount)
// app.post('/update',update)

var a = require('./opt2.json')
const Post = require('./schema/postSchema')
console.log(a[1].label)

// for(var i=0;i<a.length;i++)
// {
//     var no = 0;
    // Post.findById("5fc555b4c8a84c0004c85c07")
    // .then((pos)=>{
    //   currpos = pos;
    // //   console.log(pos)
    // // if(pos&&a[i]){
    //     // pos.label = a[i].label;
    // //   pos.targetAudience = a[i].targetAudience;
    // //   pos.mediaType = a[i].mediaType;
    // //   pos.themes = a[i].themes;
    // //   console.log(a[i])
    //   console.log(pos)
    // //   return pos.save();
    // // }
      
    // })
    // // .then(()=>{
    // // //   res.status(200).send({message:'Success'})
    // //     no++;
    // //     console.log({successful:no})
    // // })
    // .catch((err)=>{
    //   console.error(err)
    // //   res.send({err:'Something Went Wrong!!'})
    // })
// }

//  Post.find()
//     .then(dat=>{
//         dat.forEach((doc)=>{
//             if(doc.label.includes("Creatrive")){
//                 console.log(doc.label)
//                 doc.label = "Poshan Maah Social Media Creative: Poster"
//                 doc.save();
//             }
//         })
//     })


// var i = -1;
//  for(var j=0;j<a.length;j++) {
//     setTimeout(function() {
//         update()
//     },(j+j+1)*1000);
// }

// function update()
// {
//   //alert(topicId);
//   i++;
//   Post.findById(a[i]._id)
//   .then((pos)=>{
//     currpos = pos;
//     console.log(pos)
//   if(pos&&a[i]){
//     pos.label = a[i].label;
//     pos.targetAudience = a[i].targetAudience;
//     pos.mediaType = a[i].mediaType;
//     pos.themes = a[i].themes;
//     console.log(a[i])
//     console.log(pos)
//     return pos.save();
//   }
    
//   })
//   .then(()=>{
//   // //   res.status(200).send({message:'Success'})
//       // no++;
//       console.log({successful:i})
//   })
//   .catch((err)=>{
//     console.error(err)
//   //   res.send({err:'Something Went Wrong!!'})
//   })
// }


app.use((error, req, res, next) => {
    console.log(error)
    const status = error.statusCode || 500
    const message = error.message
    const data = error.data
    res.status(status).json({
        message: message,
        data: data
    })
})



mongoose.connect(
    MONGODB_URI,
    {
        useNewUrlParser: true,
        useUnifiedTopology: true,
        useFindAndModify: false,
        useCreateIndex: true
    }
)
.then(result =>{
    app.listen(process.env.PORT || 8080, ()=>{
        console.log('Server Started at port 8080')
    })
}).catch(err => {
    console.log(err);
    // next(err);
})