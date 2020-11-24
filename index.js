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
const { getFilteredInfo,getThemeoftheMonth,getPolularVideos,addDownloadCount } = require('./postHandlers/info');
const {uploadFile} = require('./postHandlers/upload')
app.post('/upload', uploadFile)
app.post('/getFilteredInfo', getFilteredInfo)
app.get('/getPopolarVideos',upload.single('file'), getPolularVideos)
app.get('/getThemesOfTheMonth', getThemeoftheMonth)
app.post('/addDownload',addDownloadCount)




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
    { useNewUrlParser: true, useUnifiedTopology: true }
)
.then(result =>{
    app.listen(process.env.PORT || 8080, ()=>{
        console.log('Server Started at port 8080')
    })
}).catch(err => {
    console.log(err);
    next(err);
})