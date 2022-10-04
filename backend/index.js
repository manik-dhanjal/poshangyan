const express = require('express');
const mongoose = require('mongoose');
var bodyParser = require('body-parser');
const cors = require('cors');
const multer = require("multer");
var storage = multer.memoryStorage();
var upload = multer({ storage: storage });
const connectDB = require("./config/db.config")();
const auth =  require('./middleware/auth')
const startMailSheduler = require('./utils/mail-sheduler');

const app = express();
mongoose.set('useNewUrlParser', true);
mongoose.set('useFindAndModify', false);
mongoose.set('useCreateIndex', true);
app.use(cors())
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.static(__dirname + '/public'));
app.use((req, res, next) => {
    res.setHeader('Access-Control-Allow-Origin', '*')
    res.setHeader('Access-Control-Allow-Methods', 'GET,POST,PUT,PATCH,DELETE')
    res.setHeader('Access-Control-Allow-Headers', 'Content-Type, Authorization')
    next()
})

// sends CSV containg info about files in database to manikdhanjal217@gmail.com weekly
startMailSheduler('07 19 * * 4')

app.get('/', (req, res) => {
    return res.status(200).send({
        message: "All Ok"
    })
})

const { getThemeoftheMonth, getMostDownloaded,setThemeOfTheMonth,getVisitorAnalytics,getFilteredInfoV2 }= require('./handlers/info');
const { uploadFile,deleteFile,addDownloadCount } = require('./handlers/s3.CRUD')

app.post('/upload-file', [auth,upload.single('file')],uploadFile)
app.delete('/file/:key',[auth,upload.single('file')],deleteFile)
app.post('/download-file', addDownloadCount)
app.post('/getFilteredInfo', getFilteredInfoV2)
app.get('/most-downloaded', getMostDownloaded)
app.get('/getThemesOfTheMonth', getThemeoftheMonth)
app.post('/set-theme-of-the-month',auth,setThemeOfTheMonth)
app.post('/visitors-analytics',getVisitorAnalytics)

const { getPostInfo, deletePost, updatePostInfo, addPost } = require('./handlers/Posts')

app.get('/posts/:postID', getPostInfo)
app.delete('/posts/:postID', auth, deletePost)
app.put('/posts/:postID', auth, updatePostInfo)
app.post('/post',auth,addPost)

const { addSortingData, getSortingData, modifySortingData, delFromSortingData } = require('./handlers/sortingDataRoutes')

app.post('/addSortingData',auth,addSortingData)
app.get('/getSortingData', getSortingData)
app.post('/modifySortingData', auth, modifySortingData)   
app.post('/deleteFromSortingData', auth, delFromSortingData) 


const {contactFormHandler} = require("./handlers/smtp");
app.post('/contactUsFormSubmission', contactFormHandler)

const {createZip, downloadZip, checkZipFiles} = require('./utils/zipAndDownload')
app.get('/download-zip/:name',downloadZip)
app.post('/create-zip',createZip);
app.get('/fetch-all-zips',checkZipFiles)

app.use("/2626/", require("./handlers/admin"));

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


const PORT = process.env.PORT || 8000;
app.listen(PORT,()=>{
    console.log(`${process.env.NODE_ENV || "Production"} server is listening on PORT ${PORT}`)
})

