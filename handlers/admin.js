const Admin = require('../schema/adminSchema')
const uuid = require('uuid')

// let admin = {
//     username: 'admin',
//     password: '2626admin'
// }

// const a = new Admin(admin);

// a.save().then((s)=>{
//     console.log(s);
// }).catch(e=>{
//     console.log(e);
// })

exports.addAdmin = (req,res) => {
    let newAdmin = {
        username: req.body.username,
        password: req.body.password
    }
    if(req.body.username && req.body.password && req.body.verified){
                new Admin(newAdmin).save().then((s)=>{
                    // console.log(s);
                    res.status(200).send({message:'successfully added'})
                }).catch(e=>{
                    res.status(500).send({err:'something went wrong!!'})
                    console.log(e);
                })

    }else{
        res.status(500).send({err:'something went wrong!!'})
    }
}

exports.login = (req,res) =>{
    let admin = {
        username: req.body.username,
        password: req.body.password
    }
    let sent = false;
    if(req.body.username && req.body.password){
        Admin.find()
        .then(doc=>{
            doc.forEach(dat=>{
                if(dat.username===admin.username){
                    if(dat.password===admin.password){
                        let passKEY = uuid.v4();
                        dat.uuid = passKEY;
                        sent=true;
                        res.send({passkey:passKEY})
                        return dat.save();
                    }else{
                        sent=true;
                        res.status(401).send({message:'Wrong password!!'})
                        return '';
                    }
                }
            })
            if(!sent)
            res.status(401).send({message:'Please check username and password!!'})
            return '';
        }).then(()=>{
            return '';
        })
    }else{
        res.status(500).send({err:'something went wrong!!'})
    }
}

exports.validAdmin = (req,res) => {
    res.status(200).send({msg:true});
}
