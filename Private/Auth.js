const Admin = require('../schema/adminSchema')
module.exports = (req,res,next) => {
    if(req.body.passkey){
        Admin.find()
        .then((doc)=>{
            let f=0;
            doc.forEach(dat=>{
                if(dat.uuid===req.body.passkey){
                    f=1;
                }
            })
            if(f){
                req.body.verified = true;
                return next();
            }else{
                res.send({message:'not authorised!!'});
            }
        })
    }else{
        return res.send({message:'not authorised!!'});
    }
}