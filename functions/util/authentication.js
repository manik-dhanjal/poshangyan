const { admin ,db } = require('./admin');

module.exports = (req,res,next) => {
    let idtoken;
    // console.log()
    if(req.headers.authorization && req.headers.authorization.startsWith('Bearer ')){
        idtoken = req.headers.authorization.split('Bearer ')[1];
    }else{
        // console.log('here... Unauthorized');
        return res.status(403).json({err: "Unauthorized"});
    }
    return admin.auth().verifyIdToken(idtoken)
    .then(decodeToken => {
        // console.log(decodeToken);
        req.user = decodeToken;
        // console.log(decodeToken);
        
        return db.ref(`/users`).once('value');
    })
    .then((data) => {
        if(data.exists()){
            // data.val
            let a=false;
            let currUser;
            data.forEach((singleUser)=>{
                if(singleUser.val().userId === req.user.uid ){
                    a=true; currUser=singleUser.val();
                }
            })
            if(a){
                req.user.userHandle = currUser.userHandle;
                req.user.imageUrl = currUser.imageUrl;

            }else{
                return res.status(403).json({err: "Something went wrong!!!"});
            }
            
        }else{
            return res.status(403).json({err: "Something went wrong!!!"});
        }
        return next();
    })
    .catch(err=>{
        console.error(err);
       return res.status(403).json(err);
    })
}