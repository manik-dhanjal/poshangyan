const express = require('express'),
    app = express(),
    mongoose = require('mongoose');

const MONGODB_URI = "mongodb+srv://Anshaj:Anshaj123@poshangyan.w52ln.mongodb.net/poshangyan?retryWrites=true&w=majority"

var bodyParser = require('body-parser');
var multer = require('multer');
var upload = multer();

const Post = require('./schema/postSchema')

const nodemailer = require("nodemailer");
const cors = require('cors')

app.use(cors())
// for parsing application/json
app.use(bodyParser.json());

// for parsing application/xwww-
app.use(bodyParser.urlencoded({ extended: true }));
//form-urlencoded
app.use(express.static(__dirname + '/public'));

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
    getFilteredInfo, getThemeoftheMonth, getPolularVideos, addDownloadCount,setThemeOfTheMonth
    //  update 

}
    = require('./handlers/info');
const Auth = require('./Private/Auth')

const { uploadFile } = require('./handlers/upload')
app.post('/upload', uploadFile)
app.post('/getFilteredInfo', getFilteredInfo)
app.get('/getPopolarVideos', getPolularVideos)
app.get('/getThemesOfTheMonth', getThemeoftheMonth)
app.post('/addDownload', addDownloadCount)
app.post('/set-theme-of-the-month',setThemeOfTheMonth)
// app.post('/update',update)

const { getPostInfo, deletePost, updatePostInfo } = require('./handlers/Posts')
app.get('/posts/:postID', getPostInfo)
app.post('/posts/:postID', Auth, deletePost)
app.put('/posts/:postID', Auth, updatePostInfo)

const { addSortingData, getSortingData, modifySortingData, delFromSortingData } = require('./handlers/sortingDataRoutes')
// app.post('/addSortingData',Auth,addSortingData)
app.get('/getSortingData', getSortingData)
app.post('/modifySortingData', Auth, modifySortingData)      //TODO: Add Auth  // ADD + EDIT things
app.post('/deleteFromSortingData', Auth, delFromSortingData) //TODO: Add Auth  // REMOVE things


const { addAdmin, login } = require('./handlers/admin')

app.post('/login', login)

app.post('/contactUsFormSubmission', (req, res) => {
    console.log(req.body)
    let data = req.body;
    // const { parse } = require('json2csv');
    // create reusable transporter object using the default SMTP transport
    var transporter = nodemailer.createTransport({
        service: 'gmail',
        auth: {
            user: 'poshangyan@gmail.com',
            pass: 'Anshaj@123'
        }
    });

    var message = {
        from: "sender@server.com",
        to: "anshajkumarsharma@gmail.com,poshangyan-niti@gov.in,meetridhi@2626.today",
        subject: "Message from Contact Form",
        html: `<p>Hello ,</p>
        <p>Received a message fom <strong>${data.name}.</strong></p>
        <p>Message: ${data.message}</p> 
        <p> PhoneNo: ${data.phoneNo}</p>
        <p> Email: ${data.email} </p>
        <p>It is autogenerated email feel free to contact in case of any issue.</p>
        <p>Thanks,</p>
        <p>Poshan Gyan Team</p>`,
    };

    transporter.sendMail(message, (error, info) => {
        if (error) {
            console.log(error);
            res.status(403).send({ err: "Error in sending email...." });
        } else {
            res.status(200).send({ message: "Email sucessfully sent.." });
        }
    });
})

const {createZip} = require('./utils/zipAndDownload')
const {downloadZip} = require('./utils/zipAndDownload')
app.get('/download-zip/:name',downloadZip)
app.post('/create-zip',createZip);

app.get('/download', function(req, res){
    const file = `${__dirname}/ASD.json`;
    res.download(file); // Set disposition and send it.
});

var schedule = require('node-schedule');

// run every Friday at 6:00 PM
schedule.scheduleJob('07 19 * * 4', () => {
    const { parse } = require('json2csv');


    Post.find()
        .then(res => {
            // console.log(csv)
            // console.log(res)
            let data = [];
            res.forEach((doc) => {
                let temp = {
                    downloadsCount: doc.downloadsCount,
                    thumbBucket: doc.thumbBucket,
                    mimetype: doc.mimetype,
                    thumbLocation: doc.thumbLocation,
                    label: doc.label,
                    Bucket: doc.Bucket,
                    postId: doc.postId,
                    languages: doc.languages,
                    showFileName: doc.showFileName,
                    mediaType: doc.mediaType,
                    thumbKey: doc.thumbKey,
                    themes: doc.themes,
                    Location: doc.Location,
                    thumbkey: doc.thumbKey,
                    Key: doc.Key,
                    source: doc.source,
                    targetAudience: doc.targetAudience,
                }
                data.push(temp);
            });
            const csv = parse(data, ["source", "Bucket"]);
            var transporter = nodemailer.createTransport({
                service: 'gmail',
                auth: {
                    user: 'poshangyan@gmail.com',
                    pass: 'Anshaj@123'
                }
            });

            var message = {
                from: "sender@server.com",
                to: "anshajkumarsharma@gmail.com,poshangyan-niti@gov.in,meetridhi@2626.today,meetmanik@2626.today,meetkanika@2626.today,\
                diksha.radhakrishnan@ashoka.edu.in,sailee.adhao@ashoka.edu.in",
                subject: "Database Weekly Update",
                html: `Updated database`,
                attachments: [
                    {
                        filename: "updated_database.csv",
                        content: csv,
                    },
                ]
            };



            transporter.sendMail(message, (error, info) => {
                if (error) {
                    console.log(error);
                    console.log({ err: "Error in sending email...." });
                } else {
                    console.log({ message: "Email sucessfully sent.." });
                }
            });

        }).catch(e => {
            console.log(e)
        })
})
console.log(new Date().toString())
// schedule.scheduleJob('*/2 * * * 4', () => {
//     console.log(new Date().toString())
// })
schedule.scheduleJob('30 00 19 * * 4', () => {
    const { parse } = require('json2csv');
    console.log(new Date().toString())

    Post.find()
        .then(res => {
            // console.log(csv)
            // console.log(res)
            let data = [];
            res.forEach((doc) => {
                let temp = {
                    downloadsCount: doc.downloadsCount,
                    thumbBucket: doc.thumbBucket,
                    mimetype: doc.mimetype,
                    thumbLocation: doc.thumbLocation,
                    label: doc.label,
                    Bucket: doc.Bucket,
                    postId: doc.postId,
                    languages: doc.languages,
                    showFileName: doc.showFileName,
                    mediaType: doc.mediaType,
                    thumbKey: doc.thumbKey,
                    themes: doc.themes,
                    Location: doc.Location,
                    thumbkey: doc.thumbKey,
                    Key: doc.Key,
                    source: doc.source,
                    targetAudience: doc.targetAudience,
                }
                data.push(temp);
            });
            const csv = parse(data, ["source", "Bucket"]);
            var transporter = nodemailer.createTransport({
                service: 'gmail',
                auth: {
                    user: 'poshangyan@gmail.com',
                    pass: 'Anshaj@123'
                }
            });

            var message = {
                from: "sender@server.com",
                to: "anshajkumarsharma@gmail.com",
                subject: "Database Weekly Update dd",
                html: `Updated database`,
                attachments: [
                    {
                        filename: "updated_database.csv",
                        content: csv,
                    },
                ]
            };



            transporter.sendMail(message, (error, info) => {
                if (error) {
                    console.log(error);
                    console.log({ err: "Error in sending email...." });
                } else {
                    console.log({ message: "Email sucessfully sent.." });
                }
            });

        }).catch(e => {
            console.log({ err: "Error in sending email.... 2" });
        })
})
// var a = require('./ASD.json')
// const Post = require('./schema/postSchema')
// console.log(a[1].label)
// let mp = {};
// var b = [];
// console.log(a[0])
// for(var i=0;i<a.length;i++)
// {
//     console.log(a[i]._id.$oid)
//     update(a[i],a[i]._id.$oid)
// }

// function update(val,id){
//     // console.log(val)
//     Post.findById(id)
//      .then(dat=>{
//          dat.languages = val.languages
//          console.log(dat)
//          dat.save();
//      })
//      .catch(e=>{
//          console.log(e);
//      })
// }


// const accountSid = "AC5a24e2518c95be55417fabc6934ca0a7";
// const authToken = "4bbba64ca48c860ec1412b6a3be0cd68";
// const client = require('twilio')(accountSid, authToken);
// app.post('/xx', async (req,res)=>{
//   let abc=null ;
//    try{
//     abc =  await client.messages
//   .create({
//      body: 'New items has been added on poshangyan. HAve a look at https://www.poshangyan.com/search?Themes=Any&sort=date',
//      from: '+12059531826',
//      to: '+919540820596'
//    })
//   }catch(e){
//     console.log(e);
//   }
//   console.log(abc)
//   res.send(abc)
// })

// async  function  asd(){
//   try{
//     return await client.messages
//   .create({
//      body: 'This is the ship that made the Kessel Run in fourteen parsecs?',
//      from: '+15017122661',
//      to: '+15558675310'
//    })
//   }catch(e){
//     console.log(e);
//   }

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
    .then(result => {
        app.listen(process.env.PORT || 8080, () => {
            console.log('Server Started at port 8080')
        })
    }).catch(err => {
        console.log(err);
        // next(err);
    })
