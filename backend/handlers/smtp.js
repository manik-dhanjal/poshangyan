const contactFormHandler = async (req, res) => {
    let data = req.body;
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
        to: "manikdhanjal21@gmail.com",
        subject: "Message from Contact Form",
        html: `<p>Hello ,</p>
        <p>Received a message fom <strong>${data.name}.</strong></p>
        <p>Message: ${data.message}</p> 
        <p> PhoneNo: ${data.phoneNo}</p>
        <p> Email: ${data.email} </p>
        <p>It is autogenerated email feel free to contact in case of any issue.</p>
        <p>Thanks,</p>
        <p>Poshan Gyan</p>`,
    };

    transporter.sendMail(message, (error, info) => {
        if (error) {
            console.log(error);
            res.status(403).send({ err: "Error in sending email...." });
        } else {
            res.status(200).send({ message: "Email sucessfully sent.." });
        }
    });
}

module.exports ={
     contactFormHandler
};