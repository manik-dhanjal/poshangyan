const schedule = require('node-schedule');
const { parse } = require('json2csv');
const nodemailer = require("nodemailer");
const Post = require('../schema/postSchema');

const startMailSheduler = (sendOnInterval) =>{
    schedule.scheduleJob(sendOnInterval, () => {
        Post.find()
            .then(res => {
                let data = [];
                res.forEach((doc) => {
                    let temp = {
                        label: doc.label,
                        postId: doc.postId,
                        languages: doc.languages,
                        themes: doc.themes,
                        Location: doc.Location,
                        source: doc.source,
                        targetAudience: doc.targetAudience,
                        createdAt:doc.createdAt,
                        mediaType:doc.files.map(file => file.mimetype).join(', '),
                        files:doc.files.map(file => file.location).join(', '),
                        downloads: doc.files.reduce((count,file)=>count+file.downloadsCount,0)
                    }
                    data.push(temp);
                });
                const csv = parse(data);
                var transporter = nodemailer.createTransport({
                    service: 'gmail',
                    auth: {
                        type: 'OAuth2',
                        user: process.env.PG_EMAIL_USERNAME,
                        pass: process.env.PG_EMAIL_PASSWORD,
                        clientId: process.env.PG_EMAIL_CLIENT_ID,
                        clientSecret: process.env.PG_EMAIL_CLIENT_SECRET,
                        refreshToken: process.env.PG_EMAIL_REFRESH_TOKEN
                    }
                });
    
                var message = {
                    from: process.env.PG_EMAIL_USERNAME,
                    to: "manikdhanjal217@gmail.com",
                    subject: "Database Update",
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
}

module.exports= startMailSheduler;